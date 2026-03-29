$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$panelScript = Join-Path $projectRoot "space_weather_web_panel.py"
$bridgeScript = Join-Path $projectRoot "pushbullet_notification_bridge.py"
$configPath = Join-Path $projectRoot "config.json"
$panelHost = "0.0.0.0"
$preferredPanelPorts = @(8080, 8095, 8096, 8097)
$panelPort = 8080
$panelUrl = "http://127.0.0.1:$panelPort"
$statusUrl = "$panelUrl/api/status"
$bridgeHealthUrl = "http://127.0.0.1:8093/healthz"
$skipBrowser = $env:SPACE_WEATHER_SKIP_BROWSER -eq "1"

$logDir = Join-Path $projectRoot "logs"
$stdoutLog = Join-Path $logDir "panel_stdout.log"
$stderrLog = Join-Path $logDir "panel_stderr.log"
$bridgeStdoutLog = Join-Path $logDir "pushbullet_bridge_stdout.log"
$bridgeStderrLog = Join-Path $logDir "pushbullet_bridge_stderr.log"
$tunnelStdoutLog = Join-Path $logDir "cloudflared_stdout.log"
$tunnelStderrLog = Join-Path $logDir "cloudflared_stderr.log"

$accessDir = Join-Path $projectRoot "output\\access"
$accessStatePath = Join-Path $accessDir "access_state.json"
$tunnelPidPath = Join-Path $accessDir "cloudflared.pid"
$namedTunnelRuntimeConfigPath = Join-Path $accessDir "cloudflared_named_tunnel.yml"

New-Item -ItemType Directory -Path $logDir -Force | Out-Null
New-Item -ItemType Directory -Path $accessDir -Force | Out-Null

function Load-PanelConfig {
    if (-not (Test-Path -LiteralPath $configPath)) {
        return $null
    }

    try {
        return (Get-Content -LiteralPath $configPath -Raw -Encoding UTF8 | ConvertFrom-Json)
    } catch {
        return $null
    }
}

function Resolve-ProjectPath {
    param([string]$PathValue)

    if ([string]::IsNullOrWhiteSpace($PathValue)) {
        return $null
    }

    $expanded = [Environment]::ExpandEnvironmentVariables($PathValue.Trim())
    if ([System.IO.Path]::IsPathRooted($expanded)) {
        return $expanded
    }

    return Join-Path $projectRoot $expanded
}

function Get-NamedTunnelSettings {
    param($Config)

    if ($null -eq $Config -or $null -eq $Config.sharing -or $null -eq $Config.sharing.named_tunnel) {
        return $null
    }

    $named = $Config.sharing.named_tunnel
    $tunnelRef = ""
    if (-not [string]::IsNullOrWhiteSpace([string]$named.tunnel_id)) {
        $tunnelRef = [string]$named.tunnel_id
    } elseif (-not [string]::IsNullOrWhiteSpace([string]$named.tunnel_name)) {
        $tunnelRef = [string]$named.tunnel_name
    }

    return @{
        Enabled = [bool]$named.enabled
        Hostname = [string]$named.hostname
        TunnelRef = $tunnelRef
        CredentialsFile = Resolve-ProjectPath -PathValue ([string]$named.credentials_file)
        Protocol = if ([string]::IsNullOrWhiteSpace([string]$named.protocol)) { "http2" } else { [string]$named.protocol }
    }
}

$panelConfig = Load-PanelConfig

function Set-PanelEndpoint {
    param([int]$Port)

    $script:panelPort = $Port
    $script:panelUrl = "http://127.0.0.1:$Port"
    $script:statusUrl = "$script:panelUrl/api/status"
}

function Write-AccessState {
    param(
        [string]$Mode,
        [string]$Message,
        [string]$PublicUrl = $null,
        [Nullable[int]]$TunnelPid = $null
    )

    $payload = [ordered]@{
        mode = $Mode
        local_url = $panelUrl
        public_url = $PublicUrl
        message = $Message
        updated_at = [DateTime]::UtcNow.ToString("o")
        tunnel_pid = $TunnelPid
    }
    $payload | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $accessStatePath -Encoding UTF8
}

function Read-AccessState {
    if (-not (Test-Path -LiteralPath $accessStatePath)) {
        return $null
    }

    try {
        return Get-Content -LiteralPath $accessStatePath -Raw | ConvertFrom-Json
    } catch {
        return $null
    }
}

function Test-ProcessAlive {
    param([Nullable[int]]$ProcessId)

    if ($null -eq $ProcessId) {
        return $false
    }

    try {
        $null = Get-Process -Id $ProcessId -ErrorAction Stop
        return $true
    } catch {
        return $false
    }
}

function Get-PanelStatusPayload {
    param([string]$Url)
    try {
        $response = Invoke-WebRequest -UseBasicParsing -Uri $Url -TimeoutSec 2
        if (-not $response.Content) {
            return $null
        }
        return ($response.Content | ConvertFrom-Json)
    } catch {
        return $null
    }
}

function Test-PanelReady {
    param([string]$Url)
    return $null -ne (Get-PanelStatusPayload -Url $Url)
}

function Test-BridgeReady {
    param([string]$Url)
    try {
        $response = Invoke-WebRequest -UseBasicParsing -Uri $Url -TimeoutSec 2
        return ($response.Content -match '"ok"\s*:\s*true')
    } catch {
        return $false
    }
}

function Get-LanIPv4 {
    try {
        $content = (ipconfig) -join [Environment]::NewLine
        $matches = [regex]::Matches($content, 'IPv4 Address[^\:]*:\s*(\d{1,3}(?:\.\d{1,3}){3})')
        foreach ($match in $matches) {
            $ipAddress = $match.Groups[1].Value
            if (
                $ipAddress -and
                $ipAddress -notlike '127.*' -and
                $ipAddress -notlike '169.254*'
            ) {
                return $ipAddress
            }
        }
    } catch {
    }
    return $null
}

function Get-LanShareUrl {
    $lanIp = Get-LanIPv4
    if (-not $lanIp) {
        return $null
    }
    return "http://{0}:{1}" -f $lanIp, $script:panelPort
}

function Test-PanelCompatible {
    param($Payload)
    if ($null -eq $Payload) {
        return $false
    }

    $latest = $Payload.latest
    $charts = $Payload.charts
    if ($null -eq $latest -or $null -eq $charts) {
        return $false
    }

    $noaa = $latest.evaluation.noaa
    if ($null -eq $noaa) {
        return $false
    }

    return (
        ($null -ne $noaa.kp_estimated) -and
        ($null -ne $latest.evaluation.risk_percent) -and
        ($null -ne $latest.evaluation.confidence_percent) -and
        ($null -ne $latest.evaluation.sector_impacts) -and
        ($null -ne $Payload.notifications) -and
        ($null -ne $Payload.access) -and
        ($null -ne $Payload.insights.cme_window) -and
        ($null -ne $Payload.insights.similar_events) -and
        ($null -ne $charts.kp_estimated) -and
        ($null -ne $charts.window_days) -and
        ($null -ne $latest.web_nasa_images)
    )
}

function Get-ListeningProcessIds {
    param([int]$Port)

    $processIds = New-Object System.Collections.Generic.List[int]
    $netstatLines = netstat -ano -p tcp | Select-String -Pattern "LISTENING"
    foreach ($line in $netstatLines) {
        $text = ($line.ToString() -replace "\s+", " ").Trim()
        $parts = $text.Split(" ")
        if ($parts.Length -lt 5) {
            continue
        }

        $localAddress = $parts[1]
        $state = $parts[3]
        $pidText = $parts[4]
        if ($state -ne "LISTENING") {
            continue
        }

        if ($localAddress -match ":(\d+)$" -and [int]$Matches[1] -eq $Port) {
            $processIds.Add([int]$pidText)
        }
    }

    return $processIds.ToArray() | Sort-Object -Unique
}

function Stop-ExistingPanelServer {
    param([int]$Port)

    $processIds = @(Get-ListeningProcessIds -Port $Port)
    if (-not $processIds.Count) {
        return
    }

    foreach ($processId in $processIds) {
        try {
            Stop-Process -Id $processId -Force -ErrorAction Stop
        } catch {
            taskkill /PID $processId /F | Out-Null
        }
    }
}

function Get-AvailablePanelPort {
    param([int[]]$Candidates)

    foreach ($candidate in $Candidates) {
        $processIds = @(Get-ListeningProcessIds -Port $candidate)
        if (-not $processIds.Count) {
            return $candidate
        }
    }

    return $null
}

function Resolve-PythonCommand {
    $candidates = @(
        @{
            Label = "Embedded Python"
            Command = "C:\Program Files\SOLIDWORKS Corp\SOLIDWORKS\Simulation\Topology\tools\smapy\python\python.exe"
            IsPath = $true
        },
        @{
            Label = "python"
            Command = "python"
            IsPath = $false
        },
        @{
            Label = "py -3"
            Command = "py -3"
            IsPath = $false
        }
    )

    foreach ($candidate in $candidates) {
        if ($candidate.IsPath) {
            if (Test-Path $candidate.Command) {
                return $candidate
            }
            continue
        }

        try {
            if ($candidate.Command -eq "py -3") {
                $null = & py -3 --version 2>$null
            } else {
                $null = & python --version 2>$null
            }
            return $candidate
        } catch {
            continue
        }
    }

    throw "Python bulunamadÄ±. 'python' veya 'py' kurulu olmalÄ±."
}

function Start-BackgroundPythonProcess {
    param(
        [string]$FilePath,
        [string[]]$Arguments,
        [string]$WorkingDirectory
    )

    $startInfo = New-Object System.Diagnostics.ProcessStartInfo
    $argumentText = ($Arguments -join " ")
    $startInfo.FileName = "cmd.exe"
    $startInfo.Arguments = ('/c start "" /min "{0}" {1}' -f $FilePath, $argumentText)
    $startInfo.WorkingDirectory = $WorkingDirectory
    $startInfo.UseShellExecute = $false
    $startInfo.CreateNoWindow = $true

    $process = New-Object System.Diagnostics.Process
    $process.StartInfo = $startInfo
    if (-not $process.Start()) {
        throw "Arka plan sÃ¼reci baÅŸlatÄ±lamadÄ±: $FilePath"
    }
    return $process
}

function Start-PanelServer {
    param(
        [hashtable]$PythonSpec,
        [string]$ScriptPath,
        [string]$ConfigPath,
        [string]$WorkingDirectory,
        [int]$Port
    )

    if ($PythonSpec.Command -eq "py -3") {
        $arguments = @(
            "-3",
            ('"{0}"' -f $ScriptPath),
            "--config",
            ('"{0}"' -f $ConfigPath),
            "--host",
            $panelHost,
            "--port",
            [string]$Port
        )
        return Start-BackgroundPythonProcess -FilePath "py" -Arguments $arguments -WorkingDirectory $WorkingDirectory
    }

    $arguments = @(
        ('"{0}"' -f $ScriptPath),
        "--config",
        ('"{0}"' -f $ConfigPath),
        "--host",
        $panelHost,
        "--port",
        [string]$Port
    )
    return Start-BackgroundPythonProcess -FilePath $PythonSpec.Command -Arguments $arguments -WorkingDirectory $WorkingDirectory
}

function Start-PushbulletBridge {
    param(
        [hashtable]$PythonSpec,
        [string]$ScriptPath,
        [string]$WorkingDirectory
    )

    Stop-ExistingPanelServer -Port 8093
    Start-Sleep -Milliseconds 500

    if ($PythonSpec.Command -eq "py -3") {
        $arguments = @(
            "-3",
            ('"{0}"' -f $ScriptPath),
            "--host",
            "127.0.0.1",
            "--port",
            "8093"
        )
        return Start-BackgroundPythonProcess -FilePath "py" -Arguments $arguments -WorkingDirectory $WorkingDirectory
    }

    $arguments = @(
        ('"{0}"' -f $ScriptPath),
        "--host",
        "127.0.0.1",
        "--port",
        "8093"
    )
    return Start-BackgroundPythonProcess -FilePath $PythonSpec.Command -Arguments $arguments -WorkingDirectory $WorkingDirectory
}

function Resolve-CloudflaredCommand {
    $bundled = @(
        (Join-Path $projectRoot "tools\\cloudflared.exe"),
        (Join-Path $projectRoot "cloudflared.exe")
    )

    foreach ($candidate in $bundled) {
        if (Test-Path -LiteralPath $candidate) {
            return @{
                Label = "Bundled cloudflared"
                Command = $candidate
            }
        }
    }

    try {
        $resolved = (where.exe cloudflared 2>$null | Select-Object -First 1)
        if ($resolved) {
            return @{
                Label = "cloudflared"
                Command = $resolved
            }
        }
    } catch {
    }

    return $null
}

function Stop-ExistingShareTunnel {
    $state = Read-AccessState
    $tunnelProcessId = $null

    if ($state -and $state.tunnel_pid) {
        try {
            $tunnelProcessId = [int]$state.tunnel_pid
        } catch {
            $tunnelProcessId = $null
        }
    } elseif (Test-Path -LiteralPath $tunnelPidPath) {
        try {
            $tunnelProcessId = [int](Get-Content -LiteralPath $tunnelPidPath -Raw)
        } catch {
            $tunnelProcessId = $null
        }
    }

    if ($null -ne $tunnelProcessId -and (Test-ProcessAlive -ProcessId $tunnelProcessId)) {
        try {
            Stop-Process -Id $tunnelProcessId -Force -ErrorAction Stop
        } catch {
        }
    }

    Remove-Item -LiteralPath $tunnelPidPath -ErrorAction SilentlyContinue
}

function Get-TunnelPublicUrl {
    foreach ($path in @($tunnelStdoutLog, $tunnelStderrLog)) {
        if (-not (Test-Path -LiteralPath $path)) {
            continue
        }

        try {
            $content = Get-Content -LiteralPath $path -Raw
        } catch {
            continue
        }

        $match = [regex]::Match($content, 'https://[-a-z0-9]+\.trycloudflare\.com')
        if ($match.Success) {
            return $match.Value
        }
    }

    return $null
}

function Ensure-PublicShareTunnel {
    param([string]$OriginUrl)

    $existingState = Read-AccessState
    if (
        $existingState -and
        $existingState.mode -eq "public_tunnel" -and
        $existingState.public_url -and
        (Test-ProcessAlive -ProcessId ([int]$existingState.tunnel_pid))
    ) {
        return [string]$existingState.public_url
    }

    Stop-ExistingShareTunnel
    Remove-Item -LiteralPath $tunnelStdoutLog -ErrorAction SilentlyContinue
    Remove-Item -LiteralPath $tunnelStderrLog -ErrorAction SilentlyContinue

    $cloudflared = Resolve-CloudflaredCommand
    if ($null -eq $cloudflared) {
        Write-AccessState -Mode "local_only" -Message "cloudflared bulunamadÄ±. DÄ±ÅŸ aÄŸ paylaÅŸÄ±mÄ± iÃ§in tools\\cloudflared.exe eklenmelidir."
        return $null
    }

    Write-AccessState -Mode "public_tunnel_pending" -Message "DÄ±ÅŸ aÄŸ baÄŸlantÄ±sÄ± hazÄ±rlanÄ±yor."
    $argumentString = 'tunnel --url "{0}" --no-autoupdate --loglevel info --logfile "{1}"' -f $OriginUrl, $tunnelStdoutLog
    $startInfo = New-Object System.Diagnostics.ProcessStartInfo
    $startInfo.FileName = $cloudflared.Command
    $startInfo.Arguments = $argumentString
    $startInfo.WorkingDirectory = $projectRoot
    $startInfo.UseShellExecute = $false
    $startInfo.CreateNoWindow = $true
    $process = [System.Diagnostics.Process]::Start($startInfo)
    if ($null -eq $process) {
        Write-AccessState -Mode "public_tunnel_error" -Message "cloudflared sÃ¼reci baÅŸlatÄ±lamadÄ±."
        return $null
    }
    Set-Content -LiteralPath $tunnelPidPath -Value $process.Id -Encoding ASCII

    $publicUrl = $null
    for ($i = 0; $i -lt 28; $i++) {
        Start-Sleep -Milliseconds 750
        $publicUrl = Get-TunnelPublicUrl
        if ($publicUrl) {
            break
        }
        if ($process.HasExited) {
            break
        }
    }

    if ($publicUrl) {
        Write-AccessState -Mode "public_tunnel" -Message "DÄ±ÅŸ aÄŸ paylaÅŸÄ±mÄ± hazÄ±r. Bu adresi farklÄ± aÄŸlardaki cihazlarla paylaÅŸabilirsiniz." -PublicUrl $publicUrl -TunnelPid $process.Id
        try {
            Set-Clipboard -Value $publicUrl
        } catch {
        }
        return $publicUrl
    }

    $errorMessage = "DÄ±ÅŸ aÄŸ tÃ¼neli baÅŸlatÄ±lamadÄ±."
    if (Test-Path -LiteralPath $tunnelStderrLog) {
        try {
            $stderrText = (Get-Content -LiteralPath $tunnelStderrLog -Raw).Trim()
            if ($stderrText) {
                $errorMessage = $stderrText.Split([Environment]::NewLine)[0]
            }
        } catch {
        }
    }

    Write-AccessState -Mode "public_tunnel_error" -Message $errorMessage
    return $null
}

function Ensure-NamedTunnelShare {
    param(
        [string]$OriginUrl,
        [hashtable]$Settings
    )

    if ($null -eq $Settings -or -not $Settings.Enabled) {
        return $null
    }

    if ([string]::IsNullOrWhiteSpace($Settings.Hostname)) {
        Write-Host "Sabit baglanti icin hostname eksik. sharing.named_tunnel.hostname ayarlanmalidir." -ForegroundColor Yellow
        return $null
    }

    if ([string]::IsNullOrWhiteSpace($Settings.TunnelRef)) {
        Write-Host "Sabit baglanti icin tunnel_id veya tunnel_name eksik." -ForegroundColor Yellow
        return $null
    }

    if ([string]::IsNullOrWhiteSpace($Settings.CredentialsFile) -or -not (Test-Path -LiteralPath $Settings.CredentialsFile)) {
        Write-Host "Sabit baglanti icin credentials_file bulunamadi: $($Settings.CredentialsFile)" -ForegroundColor Yellow
        return $null
    }

    $cloudflared = Resolve-CloudflaredCommand
    if ($null -eq $cloudflared) {
        Write-Host "cloudflared bulunamadi. Sabit baglanti kurulamayacak." -ForegroundColor Yellow
        return $null
    }

    Write-AccessState -Mode "public_tunnel_pending" -Message "Sabit alan adi baglantisi hazirlaniyor."
    Remove-Item -LiteralPath $tunnelStdoutLog -ErrorAction SilentlyContinue
    Remove-Item -LiteralPath $tunnelStderrLog -ErrorAction SilentlyContinue

    $credentialPath = ($Settings.CredentialsFile -replace '\\', '/')
    $configYaml = @(
        ('tunnel: "{0}"' -f $Settings.TunnelRef)
        ('credentials-file: "{0}"' -f $credentialPath)
        ('protocol: "{0}"' -f $Settings.Protocol)
        "ingress:"
        ('  - hostname: "{0}"' -f $Settings.Hostname)
        ('    service: "{0}"' -f $OriginUrl)
        '  - service: "http_status:404"'
    ) -join [Environment]::NewLine
    Set-Content -LiteralPath $namedTunnelRuntimeConfigPath -Value $configYaml -Encoding ASCII

    $argumentString = 'tunnel --config "{0}" --no-autoupdate --loglevel info --logfile "{1}" run "{2}"' -f $namedTunnelRuntimeConfigPath, $tunnelStdoutLog, $Settings.TunnelRef
    $startInfo = New-Object System.Diagnostics.ProcessStartInfo
    $startInfo.FileName = $cloudflared.Command
    $startInfo.Arguments = $argumentString
    $startInfo.WorkingDirectory = $projectRoot
    $startInfo.UseShellExecute = $false
    $startInfo.CreateNoWindow = $true
    $process = [System.Diagnostics.Process]::Start($startInfo)
    if ($null -eq $process) {
        Write-Host "cloudflared named tunnel sureci baslatilamadi." -ForegroundColor Yellow
        return $null
    }

    Set-Content -LiteralPath $tunnelPidPath -Value $process.Id -Encoding ASCII

    $publicUrl = 'https://{0}' -f $Settings.Hostname
    $ready = $false
    for ($i = 0; $i -lt 20; $i++) {
        Start-Sleep -Milliseconds 750
        if ($process.HasExited) {
            break
        }

        if (Test-Path -LiteralPath $tunnelStdoutLog) {
            $stdoutText = ""
            try {
                $stdoutText = Get-Content -LiteralPath $tunnelStdoutLog -Raw
            } catch {
            }

            if (
                $stdoutText -match 'Connection .* registered' -or
                $stdoutText -match 'Registered tunnel connection' -or
                $stdoutText -match 'Starting metrics server'
            ) {
                $ready = $true
                break
            }
        }
    }

    if ($ready -or -not $process.HasExited) {
        Write-AccessState -Mode "public_tunnel" -Message "Sabit alan adi baglantisi hazir. Bu adres farkli aglardan degismeden kullanilabilir." -PublicUrl $publicUrl -TunnelPid $process.Id
        try {
            Set-Clipboard -Value $publicUrl
        } catch {
        }
        return $publicUrl
    }

    $errorMessage = "Sabit alan adi tuneli baslatilamadi."
    if (Test-Path -LiteralPath $tunnelStdoutLog) {
        try {
            $stdoutText = (Get-Content -LiteralPath $tunnelStdoutLog -Raw).Trim()
            if ($stdoutText) {
                $errorMessage = $stdoutText.Split([Environment]::NewLine)[-1]
            }
        } catch {
        }
    }

    Write-Host $errorMessage -ForegroundColor Yellow
    return $null
}

Write-AccessState -Mode "local_only" -Message "Yerel panel hazÄ±rlanÄ±yor."
Write-Host "Uzay HavasÄ± Paneli baÅŸlatÄ±lÄ±yor..." -ForegroundColor Cyan

$panelCompatible = $false
$pythonSpec = $null
Set-PanelEndpoint -Port 8080
if ($statusPayload = Get-PanelStatusPayload -Url $statusUrl) {
    if (Test-PanelCompatible -Payload $statusPayload) {
        $panelCompatible = $true
        Write-Host "Panel zaten gÃ¼ncel durumda." -ForegroundColor Yellow
    } else {
        Write-Host "Eski veya uyumsuz panel sÃ¼rÃ¼mÃ¼ bulundu. Yeniden baÅŸlatÄ±lÄ±yor..." -ForegroundColor Yellow
        Stop-ExistingPanelServer -Port 8080
        Start-Sleep -Seconds 1
    }
}

if (-not $panelCompatible) {
    $active8080 = @(Get-ListeningProcessIds -Port 8080)
    if ($active8080.Count) {
        $fallbackPort = Get-AvailablePanelPort -Candidates ($preferredPanelPorts | Where-Object { $_ -ne 8080 })
        if ($null -eq $fallbackPort) {
            throw "Panel iÃ§in boÅŸ port bulunamadÄ±. 8080 kullanan sÃ¼reci kapatÄ±n veya baÅŸka port aÃ§Ä±n."
        }
        Set-PanelEndpoint -Port $fallbackPort
        Write-Host "8080 kullanimda kaldigi icin panel $fallbackPort portuna aliniyor." -ForegroundColor Yellow
    }

    $pythonSpec = Resolve-PythonCommand
    $process = Start-PanelServer -PythonSpec $pythonSpec -ScriptPath $panelScript -ConfigPath $configPath -WorkingDirectory $projectRoot -Port $panelPort

    $ready = $false
    for ($i = 0; $i -lt 24; $i++) {
        Start-Sleep -Milliseconds 750
        if (Test-PanelReady -Url $statusUrl) {
            $ready = $true
            break
        }
    }

    if (-not $ready) {
        throw "Panel baÅŸlatÄ±lamadÄ±. GÃ¼nlÃ¼kleri kontrol edin: $stderrLog"
    }
}

if ($null -eq $pythonSpec) {
    $pythonSpec = Resolve-PythonCommand
}

if (-not (Test-BridgeReady -Url $bridgeHealthUrl)) {
    $bridgeProcess = Start-PushbulletBridge -PythonSpec $pythonSpec -ScriptPath $bridgeScript -WorkingDirectory $projectRoot
    $bridgeReady = $false
    for ($i = 0; $i -lt 16; $i++) {
        Start-Sleep -Milliseconds 500
        if (Test-BridgeReady -Url $bridgeHealthUrl) {
            $bridgeReady = $true
            break
        }

        if ($bridgeProcess.HasExited) {
            break
        }
    }

    if (-not $bridgeReady) {
        throw "Pushbullet bildirimi baslatilamadi. Gunlukleri kontrol edin: $bridgeStderrLog"
    }
}

Stop-ExistingShareTunnel
$publicUrl = $null
$namedTunnelSettings = Get-NamedTunnelSettings -Config $panelConfig
$namedTunnelEnabled = $false

if ($null -ne $namedTunnelSettings -and $namedTunnelSettings.Enabled) {
    $namedTunnelEnabled = $true
    $publicUrl = Ensure-NamedTunnelShare -OriginUrl $panelUrl -Settings $namedTunnelSettings
}

if (-not $publicUrl) {
    $stableShareUrl = Get-LanShareUrl
    if ($stableShareUrl) {
        $publicUrl = $stableShareUrl
        $shareMessage = if ($namedTunnelEnabled) {
            "Sabit alan adi hazir degil. Ayni Wi-Fi agindaki cihazlarda bu adresi kullanabilirsiniz."
        } else {
            "Sabit baglanti hazir. Ayni Wi-Fi agindaki cihazlarda bu adresi kullanabilirsiniz."
        }
        Write-AccessState -Mode "lan_share" -Message $shareMessage -PublicUrl $stableShareUrl
        try {
            Set-Clipboard -Value $stableShareUrl
        } catch {
        }
    } else {
        $localMessage = if ($namedTunnelEnabled) {
            "Sabit alan adi baglantisi kurulamadi. Yerel paneli bu cihazda kullanabilirsiniz: $panelUrl"
        } else {
            "Yerel panel hazir. Bu cihazdan $panelUrl adresini kullanabilirsiniz."
        }
        Write-AccessState -Mode "local_only" -Message $localMessage
    }
}
if ($publicUrl) {
    Write-Host "DÄ±ÅŸ aÄŸ paylaÅŸÄ±m adresi hazÄ±r: $publicUrl" -ForegroundColor Green
    Write-Host "BaÄŸlantÄ± panoda da gÃ¶rÃ¼necek ve panoya kopyalandÄ±." -ForegroundColor Green
} else {
    Write-Host "DÄ±ÅŸ aÄŸ paylaÅŸÄ±m baÄŸlantÄ±sÄ± henÃ¼z hazÄ±r deÄŸil. Panel yerelden aÃ§Ä±lacak." -ForegroundColor Yellow
}

Write-Host "Panel hazÄ±r. TarayÄ±cÄ± aÃ§Ä±lÄ±yor..." -ForegroundColor Green
if (-not $skipBrowser) {
    Start-Process $panelUrl
}
