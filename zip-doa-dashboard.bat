@echo off
cd /d "%~dp0"
powershell Compress-Archive -Path .\frontend -DestinationPath frontend.zip
echo ZIP selesai: frontend.zip
pause