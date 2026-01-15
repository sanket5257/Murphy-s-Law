@echo off
echo Cleaning Next.js build cache...
echo.

REM Stop any running Next.js processes
taskkill /F /IM node.exe 2>nul

REM Wait a moment for processes to close
timeout /t 2 /nobreak >nul

REM Remove .next folder
if exist .next (
    echo Removing .next folder...
    rmdir /s /q .next 2>nul
    if exist .next (
        echo Warning: Could not remove .next folder completely
        echo Please close any applications using these files and try again
    ) else (
        echo .next folder removed successfully!
    )
) else (
    echo .next folder does not exist
)

echo.
echo Done! You can now run: npm run dev
pause
