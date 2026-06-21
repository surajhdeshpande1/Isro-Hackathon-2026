@echo off
echo ===================================================
echo   TAPAS SURYA DRISHTI - Auto Git Uploader
echo ===================================================
echo.

echo [+] Staging all workspace changes...
git add -A

echo.
set /p commit_msg="[?] Enter commit message (press Enter for default 'updates'): "
if "%commit_msg%"=="" (
    set commit_msg="updates"
)

echo.
echo [+] Committing changes...
git commit -m "%commit_msg%"

echo.
echo [+] Pushing to remote main branch...
git push origin main

echo.
echo ===================================================
echo   Upload sequence finished!
echo ===================================================
pause
