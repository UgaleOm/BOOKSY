#!/bin/bash
echo "Setting up Booksy website..."
echo

echo "Installing Python packages..."
pip3 install -r requirements.txt

echo
echo "Setting up database..."
python3 app.py

echo
echo "Setup complete!"
echo "Visit http://localhost:5000 to access your Booksy website"
echo
