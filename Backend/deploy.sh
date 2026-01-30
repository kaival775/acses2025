#!/bin/bash
# Production Deployment Script for College GitLab Server
# This script helps set up the backend on a Linux server

echo "=========================================="
echo "ACSES Backend Deployment Script"
echo "=========================================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is not installed"
    exit 1
fi

echo "✓ Python 3 found: $(python3 --version)"

# Create virtual environment
echo ""
echo "Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo ""
echo "Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Check if .env exists
if [ ! -f .env ]; then
    echo ""
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "⚠ IMPORTANT: Edit .env file with your production settings!"
    echo "  - Change SECRET_KEY"
    echo "  - Update MONGO_URI"
    echo "  - Set admin credentials"
fi

# Test setup
echo ""
echo "Testing setup..."
python test_setup.py

if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo "Deployment Complete!"
    echo "=========================================="
    echo ""
    echo "To run the application:"
    echo "  Development: python app.py"
    echo "  Production:  gunicorn -w 4 -b 0.0.0.0:5000 'app:create_app()'"
    echo ""
    echo "To run in background:"
    echo "  nohup gunicorn -w 4 -b 0.0.0.0:5000 'app:create_app()' > app.log 2>&1 &"
    echo ""
    echo "Admin Panel: http://your-server:5000/admin"
    echo "API Docs: See README.md"
else
    echo ""
    echo "⚠ Setup test failed. Please check errors above."
    exit 1
fi
