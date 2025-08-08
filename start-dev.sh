#!/bin/bash

# Dylan & Katelyn's Law Study Tool - Development Server Starter
# This script provides an easy way to start the development environment

set -e

PORT=3030
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🎓 Dylan & Katelyn's Law Study Tool - Development Server"
echo "=================================================="
echo ""

# Check if port is already in use
if lsof -i :$PORT >/dev/null 2>&1; then
    echo "⚠️  Port $PORT is already in use. Checking what's running..."
    lsof -i :$PORT
    echo ""
    
    read -p "Stop existing server and start fresh? [y/N]: " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🛑 Stopping existing server..."
        lsof -ti:$PORT | xargs kill -9 2>/dev/null || true
        sleep 2
    else
        echo "✅ Server already running at http://localhost:$PORT"
        echo "📂 Project directory: $PROJECT_DIR"
        echo ""
        echo "🌐 Open in browser: http://localhost:$PORT"
        exit 0
    fi
fi

# Start the server
echo "🚀 Starting development server..."
cd "$PROJECT_DIR"

# Start Python HTTP server in background with nohup
nohup python3 -m http.server $PORT > server.log 2>&1 &
SERVER_PID=$!

# Wait a moment for server to start
sleep 2

# Check if server started successfully
if lsof -i :$PORT >/dev/null 2>&1; then
    echo "✅ Server started successfully!"
    echo "📂 Project directory: $PROJECT_DIR"
    echo "🌐 Local URL: http://localhost:$PORT"
    echo "📋 Server PID: $SERVER_PID"
    echo "📄 Logs: tail -f $PROJECT_DIR/server.log"
    echo ""
    echo "💡 Quick commands:"
    echo "   npm run stop     # Stop the server"
    echo "   npm run status   # Check server status"
    echo "   npm run logs     # View server logs"
    echo "   npm run open     # Open in browser"
    echo ""
    
    # Try to open in browser (macOS)
    if command -v open >/dev/null 2>&1; then
        echo "🌐 Opening in browser..."
        open http://localhost:$PORT
    fi
    
    echo "🔄 Server running in background with hot reload monitoring"
    echo "   Edit any .html, .css, or .js file and refresh to see changes"
    echo ""
    echo "🛑 To stop: npm run stop or kill $SERVER_PID"
    
else
    echo "❌ Failed to start server. Check server.log for details:"
    cat server.log
    exit 1
fi