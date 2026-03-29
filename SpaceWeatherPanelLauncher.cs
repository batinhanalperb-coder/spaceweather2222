using System;
using System.Diagnostics;
using System.IO;
using System.Text;
using System.Windows.Forms;

internal static class SpaceWeatherPanelLauncher
{
    [STAThread]
    private static void Main()
    {
        try
        {
            string appDir = AppDomain.CurrentDomain.BaseDirectory;
            string scriptPath = Path.Combine(appDir, "launch_space_weather_panel.ps1");

            if (!File.Exists(scriptPath))
            {
                Fail("launch_space_weather_panel.ps1 bulunamadı.");
                return;
            }

            ProcessStartInfo startInfo = new ProcessStartInfo
            {
                FileName = "powershell",
                Arguments = "-ExecutionPolicy Bypass -File \"" + scriptPath + "\"",
                WorkingDirectory = appDir,
                UseShellExecute = false,
                CreateNoWindow = true,
                WindowStyle = ProcessWindowStyle.Hidden,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                StandardOutputEncoding = Encoding.UTF8,
                StandardErrorEncoding = Encoding.UTF8,
            };

            using (Process process = Process.Start(startInfo))
            {
                if (process == null)
                {
                    Fail("Başlatıcı süreci çalıştırılamadı.");
                    return;
                }

                string stdout = process.StandardOutput.ReadToEnd();
                string stderr = process.StandardError.ReadToEnd();
                process.WaitForExit();

                if (process.ExitCode != 0)
                {
                    string message = !string.IsNullOrWhiteSpace(stderr)
                        ? stderr.Trim()
                        : (!string.IsNullOrWhiteSpace(stdout) ? stdout.Trim() : "Başlatıcı tamamlanamadı.");
                    Fail(message);
                }
            }
        }
        catch (Exception ex)
        {
            Fail(ex.Message);
        }
    }

    private static void Fail(string message)
    {
        MessageBox.Show(
            message,
            "Uzay Havası Paneli",
            MessageBoxButtons.OK,
            MessageBoxIcon.Error
        );
    }
}
