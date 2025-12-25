#!/bin/bash

echo "========================================"
echo "Starting Laravel Backend for Network Access"
echo "========================================"
echo ""
echo "This will start the backend on 0.0.0.0:8000"
echo "Making it accessible from:"
echo "  - http://localhost:8000 (same machine)"
echo "  - http://YOUR_IP:8000 (network devices)"
echo ""
echo "Press Ctrl+C to stop the server"
echo "========================================"
echo ""

cd "$(dirname "$0")"
php artisan serve --host=0.0.0.0 --port=8000
