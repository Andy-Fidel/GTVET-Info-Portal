# cPanel Hosting Setup Guide

## Prerequisites
- cPanel/WHM account
- SSH access enabled
- PHP 8.1+ with Composer
- Node.js 16+ (for frontend build)
- MySQL database

## Step-by-Step Deployment

### 1. Frontend Deployment

The React/Vite frontend should be deployed to `public_html`:

```bash
# Build the frontend
cd frontend
npm install
npm run build

# Upload dist folder contents to public_html via cPanel File Manager or SCP
scp -r dist/* username@domain.com:~/public_html/
```

### 2. Backend API Deployment

Deploy Laravel backend to a subdirectory (e.g., `api/`):

```bash
# Setup on cPanel
mkdir -p ~/api
cd ~/api

# Upload backend files via SCP
scp -r backend/* username@domain.com:~/api/

# SSH into your cPanel account
ssh username@domain.com

# Navigate to api directory
cd ~/api

# Copy environment file
cp .env.production .env

# Install dependencies
composer install --no-dev --optimize-autoloader

# Run migrations
php artisan migrate --force

# Cache configuration
php artisan config:cache
php artisan route:cache

# Set correct permissions
chmod -R 755 storage
chmod -R 755 bootstrap/cache
```

### 3. cPanel Configuration

#### Create Addon Domain/Subdomain for API

1. Log into cPanel
2. Go to **Addon Domains** or **Subdomains**
3. Create subdomain: `api.yourdomain.com`
4. Set document root to `/home/username/api/public`

#### Configure PHP Version

1. Go to **PHP Configuration** or **MultiPHP Manager**
2. Set PHP version to 8.1+ for both domains

#### Database Setup

1. Go to **MySQL Databases**
2. Create new database: `gtvet_portal`
3. Create user with full privileges
4. Update `.env` file with credentials:

```bash
DB_HOST=localhost
DB_DATABASE=gtvet_portal
DB_USERNAME=gtvet_user
DB_PASSWORD=your_secure_password
```

### 4. SSL/TLS Certificate

1. Go to **AutoSSL** or **Let's Encrypt for cPanel**
2. Enable SSL for both domains
3. Reissue certificates for all domains

### 5. Environment Configuration

#### Frontend (.env)
```
VITE_API_URL=https://api.yourdomain.com/api
VITE_APP_NAME=Ghana TVET Info Portal
VITE_ENVIRONMENT=production
```

#### Backend (.env)
```
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.yourdomain.com

DB_HOST=localhost
DB_DATABASE=gtvet_portal
DB_USERNAME=gtvet_user
DB_PASSWORD=secure_password

MAIL_FROM_ADDRESS=noreply@yourdomain.com
SANCTUM_STATEFUL_DOMAINS=yourdomain.com,api.yourdomain.com
```

### 6. Security Setup

#### .htaccess Rules
Copy the provided `.htaccess` file to both:
- `public_html/.htaccess` (for frontend)
- `api/public/.htaccess` (for Laravel)

#### File Permissions
```bash
# Set correct ownership (replace username)
chown -R username:username ~/public_html
chown -R username:username ~/api

# Set correct permissions
chmod 755 ~/public_html
chmod 755 ~/api
chmod 644 ~/public_html/*
chmod 644 ~/api/*
```

### 7. Automated Backups

Set up automated backups via cPanel:
1. Go to **Backup Wizard**
2. Configure daily backups
3. Upload to remote storage (AWS S3, Google Drive, etc.)

### 8. Monitoring and Logging

#### Access Logs
```bash
# Frontend logs
tail -f ~/logs/access_log

# Backend logs
tail -f ~/api/storage/logs/laravel.log
```

#### Error Monitoring
Configure error tracking in `.env`:
```
LOG_CHANNEL=stack
LOG_LEVEL=error
```

## Troubleshooting

### 500 Internal Server Error
1. Check Laravel logs: `storage/logs/laravel.log`
2. Verify database connection
3. Check file permissions on storage and bootstrap/cache

### API Not Accessible
1. Verify subdomain is properly created
2. Check .htaccess in `api/public/`
3. Verify PHP version compatibility

### CORS Errors
Update Laravel's `config/cors.php`:
```php
'allowed_origins' => [
    'https://yourdomain.com',
    'https://www.yourdomain.com',
],
```

### Database Connection Issues
1. Verify credentials in `.env`
2. Check MySQL user privileges
3. Ensure database exists

## Maintenance

### Regular Updates
```bash
# SSH into server
ssh username@domain.com

# Navigate to backend
cd ~/api

# Update dependencies
composer update --no-dev --optimize-autoloader

# Clear cache
php artisan cache:clear
php artisan config:clear
```

### Database Backups
```bash
# Backup database
mysqldump -u gtvet_user -p gtvet_portal > backup.sql

# Download via SCP
scp username@domain.com:~/backup.sql ./
```

## Support Resources

- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [cPanel Documentation](https://docs.cpanel.net)
