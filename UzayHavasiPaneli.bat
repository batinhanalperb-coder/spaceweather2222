@echo off
setlocal
cd /d "%~dp0"
powershell -ExecutionPolicy Bypass -File "%~dp0launch_space_weather_panel.ps1"
if errorlevel 1 (
  echo.
  echo Panel baslatilamadi.
  pause
)
endlocal
