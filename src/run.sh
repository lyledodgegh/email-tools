#!/bin/bash

# Email Formatter - Build and Run Script

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "📦 Installing dependencies..."
npm install --silent

echo "🔨 Compiling TypeScript..."
npx tsc

if [ $? -eq 0 ]; then
    echo "✅ Compilation successful!"
    echo ""
    echo "🌐 Starting local server on http://localhost:8080"
    echo "   Press Ctrl+C to stop the server"
    echo ""
    
    # Use Python's built-in HTTP server (available on most systems)
    if command -v python3 &> /dev/null; then
        python3 -m http.server 8080
    elif command -v python &> /dev/null; then
        python -m SimpleHTTPServer 8080
    else
        echo "❌ Python not found. Please open index.html manually in your browser."
        exit 1
    fi
else
    echo "❌ Compilation failed!"
    exit 1
fi
