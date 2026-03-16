#!/bin/bash

# Local Testing Script - How to Hire an AI Landing Page

echo "🚀 How to Hire an AI - Local Testing"
echo "===================================="
echo ""

# Check if Python 3 is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found. Install it first."
    exit 1
fi

# Get the directory of this script
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "📁 Project directory: $DIR"
echo ""

# Check files exist
echo "✅ Checking project files..."
for file in index.html guide-preview.html README.md form-submissions.json; do
    if [ -f "$DIR/$file" ]; then
        echo "   ✓ $file"
    else
        echo "   ✗ $file (missing)"
    fi
done
echo ""

# Start HTTP server
PORT=8000
echo "🌐 Starting HTTP server on http://localhost:$PORT"
echo "   Open your browser and visit: http://localhost:$PORT"
echo ""
echo "📝 Files served:"
echo "   - Landing page: http://localhost:$PORT/"
echo "   - Guide preview: http://localhost:$PORT/guide-preview.html"
echo ""
echo "💡 Tips:"
echo "   - Open DevTools (F12) to see form submission logs"
echo "   - Test form submission and check console"
echo "   - Try responsive design (Ctrl+Shift+K, then Ctrl+Shift+M)"
echo ""
echo "⏸️  Press Ctrl+C to stop the server"
echo ""

cd "$DIR"
python3 -m http.server $PORT
