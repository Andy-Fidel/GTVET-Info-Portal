#!/bin/bash

# Ghana TVET Portal - cPanel Deployment Script
# This script automates deployment to cPanel hosting

set -e

echo "=== Ghana TVET Portal Deployment Script ==="
echo ""

# Configuration
CPANEL_USER="your_cpanel_username"
DOMAIN="yourdomain.com"
API_SUBDOMAIN="api"
SSH_HOST="$CPANEL_USER@$DOMAIN"
REMOTE_PATH="/home/$CPANEL_USER"

echo "1. Deploying Frontend..."
# Build frontend
cd frontend
npm install
npm run build
cd ..

# Upload frontend to public_html
echo "Uploading frontend build..."
scp -r frontend/dist/* "$SSH_HOST:$REMOTE_PATH/public_html/"

echo "2. Deploying Backend API..."
# Prepare backend
cd backend
composer install --no-dev --optimize-autoloader
cd ..

# Create api directory and upload
echo "Uploading backend files..."
ssh "$SSH_HOST" "mkdir -p $REMOTE_PATH/api"
scp -r backend/* "$SSH_HOST:$REMOTE_PATH/api/"

# Setup backend on remote server
echo "Setting up backend on remote server..."
ssh "$SSH_HOST" << 'REMOTE_COMMANDS'
cd ~/api

# Copy environment file
if [ ! -f .env ]; then
    cp .env.production .env
fi

# Run migrations
php artisan migrate --force

# Cache configuration
php artisan config:cache
php artisan route:cache

# Set permissions
chmod -R 755 storage
chmod -R 755 bootstrap/cache

echo "Backend setup complete!"
REMOTE_COMMANDS

echo ""
echo "=== Deployment Complete ==="
echo "Frontend URL: https://$DOMAIN"
echo "API URL: https://$API_SUBDOMAIN.$DOMAIN"
echo ""
echo "Next Steps:"
echo "1. Update .env file with production values"
echo "2. Configure database credentials via cPanel"
echo "3. Run any additional setup scripts"
