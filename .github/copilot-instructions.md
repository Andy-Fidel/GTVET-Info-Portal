# GitHub Copilot Custom Instructions

## Project Information

**Project Name**: Ghana TVET Service Information Portal  
**Tech Stack**: React 18 + Vite (Frontend), Laravel 10 (Backend), Tailwind CSS  
**Hosting**: cPanel-optimized  
**Status**: In Development

## Directory Structure

```
/frontend       - React/Vite application
/backend        - Laravel REST API
/deployment     - cPanel deployment scripts & configuration
```

## Development Workflow

### Frontend Development
- **Language**: JavaScript/JSX
- **Framework**: React 18 + Vite
- **UI Library**: shadcn/ui (headless accessible components)
- **Styling**: Tailwind CSS
- **State**: Zustand
- **API Client**: Axios
- **Router**: React Router v6
- **Icons**: Lucide React

### Backend Development  
- **Language**: PHP 8.1+
- **Framework**: Laravel 10
- **API Style**: RESTful with JSON responses
- **Authentication**: Sanctum (when needed)
- **Database**: MySQL 8.0

## Key Files to Remember

- [frontend/src/App.jsx](frontend/src/App.jsx) - Main app component
- [frontend/src/components/ui/](frontend/src/components/ui/) - shadcn UI components
- [backend/routes/api.php](backend/routes/api.php) - API routes
- [frontend/src/services/api.js](frontend/src/services/api.js) - API service layer
- [frontend/src/lib/utils.js](frontend/src/lib/utils.js) - Utility functions (cn class merger)
- [deployment/CPANEL_SETUP.md](deployment/CPANEL_SETUP.md) - cPanel deployment guide

## Running Commands

### Frontend
```bash
cd frontend
npm install    # Install dependencies
npm run dev    # Start dev server (port 3000)
npm run build  # Build for production
```

### Backend
```bash
cd backend
composer install       # Install dependencies
php artisan serve      # Start dev server (port 8000)
php artisan migrate    # Run migrations
```

## Database Models

- **Institution** - TVET institutions/colleges
- **Program** - Training programs offered
- **Announcement** - News and announcements
- **ContactMessage** - Contact form submissions

## Important Notes

1. Frontend CORS is configured for `localhost:8000` in dev
2. Backend expects frontend at `localhost:3000` in dev
3. cPanel deployment uses `.htaccess` for routing
4. API endpoints are RESTful and return JSON
5. All user-facing content should be responsive

## Common Tasks

### Adding a new shadcn component
1. Add component from shadcn/ui: `npm run add button`
2. Use in your component: `import { Button } from '@/components/ui/Button'`
3. Reference the cn() utility for merging Tailwind classes

### Adding a new API endpoint
1. Create model in `backend/app/Models/`
2. Create controller in `backend/app/Http/Controllers/Api/`
3. Create resource in `backend/app/Http/Resources/`
4. Add route in `backend/routes/api.php`

### Adding a new page
1. Create component in `frontend/src/pages/`
2. Add route in `frontend/src/App.jsx`
3. Add navigation link in `frontend/src/components/Header.jsx`
4. Use shadcn components for UI elements

## Deployment Checklist

- [ ] Update environment files (.env)
- [ ] Build frontend: `npm run build`
- [ ] Upload to cPanel public_html
- [ ] Setup Laravel in api subdirectory
- [ ] Run migrations: `php artisan migrate --force`
- [ ] Set correct permissions (755 for dirs, 644 for files)
- [ ] Enable SSL/TLS certificates
- [ ] Configure database via cPanel
- [ ] Test all endpoints

## Support Resources

- [React Docs](https://react.dev)
- [Laravel Docs](https://laravel.com/docs)
- [Tailwind Docs](https://tailwindcss.com)
- [cPanel Docs](https://docs.cpanel.net)
