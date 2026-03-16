#!/bin/bash

# Full-Stack Portfolio Startup Script
echo "🚀 Starting Full-Stack Portfolio Application..."
echo "📦 Frontend: React with Vite"
echo "🔧 Backend: .NET Web API"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if .NET is installed
if ! command -v dotnet &> /dev/null; then
    echo "❌ .NET SDK is not installed. Please install .NET SDK first."
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing client dependencies..."
    cd client && pnpm install && cd ..
fi

# Start both applications
echo "🌟 Starting both frontend and backend..."
npm start

