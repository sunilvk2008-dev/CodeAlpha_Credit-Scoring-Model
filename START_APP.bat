@echo off
title CrediPulse AI Launcher
echo ===================================================
echo   Starting CrediPulse AI Web Application...
echo ===================================================

echo [1/2] Launching FastAPI ML Server (Port 8000)...
start "CrediPulse FastAPI Backend" cmd /k "cd /d "%~dp0" && python -m uvicorn app.main:app --reload --port 8000"

echo [2/2] Launching React Vite Frontend (Port 5173)...
start "CrediPulse React Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo Waiting for servers to initialize...
timeout /t 3 >nul

echo Opening browser at http://localhost:5173/
start http://localhost:5173/
echo Done! Keep the terminal windows open while using the application.
