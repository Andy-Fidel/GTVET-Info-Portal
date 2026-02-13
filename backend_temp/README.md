# Backend Setup

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Copy the environment file:
```bash
cp .env.example .env
```

3. Install dependencies:
```bash
composer install
```

4. Generate application key:
```bash
php artisan key:generate
```

5. Create database and run migrations:
```bash
php artisan migrate --seed
```

## Running the Server

```bash
php artisan serve
```

The API will be available at http://localhost:8000

## Available API Endpoints

- `GET /api/institutions` - List all institutions
- `GET /api/institutions/{id}` - Get institution details
- `GET /api/programs` - List all programs
- `GET /api/programs/{id}` - Get program details
- `GET /api/announcements` - List announcements
- `POST /api/contact` - Submit contact form
