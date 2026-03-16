@echo off
echo 🚀 Starting Full-Stack Portfolio Application...
echo 📦 Frontend: React with Vite
echo 🔧 Backend: .NET Web API
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

REM Check if .NET is installed
where dotnet >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ .NET SDK is not installed. Please install .NET SDK first.
    pause
    exit /b 1
)

REM Install dependencies if needed
if not exist "node_modules" (
    echo 📦 Installing root dependencies...
    npm install
)

if not exist "client\node_modules" (
    echo 📦 Installing client dependencies...
    cd client
    pnpm install
    cd ..
)

REM Start both applications
echo 🌟 Starting both frontend and backend...
npm start

