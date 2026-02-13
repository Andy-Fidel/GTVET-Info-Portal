# Ghana TVET Service Information Portal

A comprehensive web application for Ghana's Technical and Vocational Education and Training (TVET) sector. This portal serves as a central hub for TVET institutions, programs, and information.

## 🎯 Project Overview

The Ghana TVET Service Information Portal is built with:
- **Frontend**: React 18 with Vite + shadcn/ui for modern component architecture
- **Backend**: Laravel 10 REST API
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Zustand for lightweight state management
- **Hosting**: Optimized for cPanel shared hosting environments

## 📋 Features

### For Students & Job Seekers
- Browse accredited TVET institutions
- Search and filter training programs by category and duration
- View institution details and contact information
- Read latest announcements and news
- Contact institutions directly through the portal

### For Administrators
- Manage institutions and programs
- Post announcements and updates
- Manage contact form submissions
- User management system

### Core Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Search and filtering functionality
- ✅ Institution and program directories
- ✅ News/Announcements section
- ✅ Contact form with email notifications
- ✅ API-driven architecture
- ✅ Security headers and CORS configuration
- ✅ Performance optimized

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ and npm
- **PHP** 8.1+
- **Composer**
- **MySQL** 5.7+
- **Git**

### Local Development Setup

#### 1. Clone and Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:3000`

#### 2. Setup Backend

```bash
cd backend

# Copy environment file
cp .env.example .env

# Install dependencies
composer install

# Generate app key
php artisan key:generate

# Run migrations
php artisan migrate --seed

# Start server
php artisan serve
```

Backend API will be available at `http://localhost:8000`

### Environment Variables

#### Frontend (`.env`)
```
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Ghana TVET Info Portal
VITE_ENVIRONMENT=development
```

#### Backend (`.env`)
```
APP_NAME="Ghana TVET Portal"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=gtvet_portal
DB_USERNAME=root
DB_PASSWORD=
```

## 📂 Project Structure

```
gtvet-portal/
├── frontend/                    # React/Vite + shadcn/ui
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/             # shadcn UI components
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/              # Page components
│   │   ├── services/           # API service layer
│   │   ├── store/              # Zustand state store
│   │   ├── lib/                # Utilities (cn function)
│   │   └── App.jsx             # Main app component
│   ├── components.json         # shadcn config
│   ├── vite.config.js          # Vite configuration
│   └── package.json
│
├── backend/                     # Laravel API
│   ├── app/
│   │   ├── Models/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   ├── Requests/
│   │   │   └── Resources/
│   ├── routes/
│   │   └── api.php
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── config/
│   └── composer.json
│
└── deployment/                  # cPanel deployment files
    ├── .htaccess
    ├── deploy.sh
    └── CPANEL_SETUP.md
```

## 🔌 API Endpoints

### Institutions
- `GET /api/institutions` - List all institutions
- `GET /api/institutions/{id}` - Get institution details

### Programs
- `GET /api/programs` - List all programs
- `GET /api/programs/{id}` - Get program details

### Announcements
- `GET /api/announcements` - List announcements

### Contact
- `POST /api/contact` - Submit contact form

## 🛠️ Development

### Building Frontend for Production

```bash
cd frontend
npm run build
```

Production build will be in `frontend/dist/`

### Running Tests

```bash
# Backend tests
cd backend
php artisan test

# Frontend tests (if configured)
cd frontend
npm test
```

## 📦 Deployment

### cPanel Hosting Deployment

See [deployment/CPANEL_SETUP.md](deployment/CPANEL_SETUP.md) for detailed instructions.

Quick deployment:
```bash
cd deployment
chmod +x deploy.sh
./deploy.sh
```

### Using Docker

```bash
# Build and start services
docker-compose up -d

# Run migrations
docker-compose exec backend php artisan migrate --seed
```

See `docker-compose.yml` for configuration.

## 🔐 Security Features

- CORS configuration for secure API access
- Input validation on all forms
- SQL injection prevention via Eloquent ORM
- HTTPS enforcement via .htaccess
- Rate limiting on API endpoints
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)

## 📊 Database Schema

### Institutions
- id
- name
- description
- location
- region
- email
- phone
- website
- established_year
- is_active

### Programs
- id
- institution_id
- title
- code
- description
- category
- duration
- level
- intake_capacity
- entry_requirements
- is_active

### Announcements
- id
- title
- content
- category
- published_at
- image_url
- link
- is_active

### Contact Messages
- id
- name
- email
- phone
- subject
- message
- is_read
- responded_at

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📝 License

This project is licensed under the MIT License. See LICENSE file for details.

## 📞 Support & Contact

For support, email: support@gtvet.edu.gh

### TVET Portal Contact Information
- Website: https://gtvet.edu.gh
- Email: info@gtvet.edu.gh
- Phone: +233 XXX XXXX XXX
- Address: Accra, Ghana

## 🎓 Acknowledgments

This portal is developed to support Ghana's Technical and Vocational Education and Training sector, making quality TVET information and opportunities accessible to all.

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Status**: Production Ready ✅
