# Quick Start Guide

## Installation & Running

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Visit: http://localhost:3000

### Backend Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```
Visit: http://localhost:8000/api

## What's New: shadcn/ui Integration

### Pre-built Components

**Import and use immediately:**
```jsx
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Badge } from '@/components/ui/Badge'

// Use them:
<Button>Save</Button>
<Card>...</Card>
<Input placeholder="Name" />
<Label>Email</Label>
<Badge>New</Badge>
```

### Icons Available

400+ beautiful icons from Lucide React:
```jsx
import { 
  Search, Menu, X, 
  Home, Settings, Bell,
  Plus, Minus, Download,
  Clock, Calendar, User
} from 'lucide-react'

<Search size={24} />
<Menu className="w-6 h-6" />
```

### Adding More Components

Need more shadcn components?
```bash
npm run add dropdown-menu
npm run add tabs
npm run add dialog
npm run add form
```

See: https://ui.shadcn.com/docs/components

## Component Examples Used

### Pages Updated with shadcn

1. **Home.jsx** 
   - Card component with icons
   - Button variants

2. **Institutions.jsx**
   - Input for search
   - Card grid layout
   - Badge for tags
   - Loading icon

3. **Programs.jsx**
   - Button filters
   - Card with borders
   - Badge variants
   - Clock & Award icons

4. **Announcements.jsx**
   - Card container
   - Badge for categories
   - Arrow icons

5. **Contact.jsx**
   - Input & Textarea forms
   - Label elements
   - Card containers
   - Buttons with loading state

6. **Header.jsx**
   - Button (menu toggle)
   - Menu icon from Lucide

## File Structure

```
frontend/src/
├── components/
│   ├── ui/                    ← shadcn components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Textarea.jsx
│   │   ├── Label.jsx
│   │   ├── Badge.jsx
│   │   └── AlertDialog.jsx
│   ├── Header.jsx            ← Uses shadcn
│   └── Footer.jsx
├── pages/                     ← All updated to use shadcn
├── lib/
│   └── utils.js              ← cn() function
├── services/
└── store/
```

## Documentation

- **SHADCN_COMPONENTS.md** - Full component reference
- **SHADCN_INTEGRATION.md** - Integration details & examples
- **INTEGRATION_SUMMARY.md** - Overview of changes

## Key Features

✨ **Accessible** - WCAG compliant
✨ **Customizable** - Modify components directly
✨ **Responsive** - Mobile-first design
✨ **Beautiful** - Professional appearance
✨ **Icons** - 400+ built-in icons
✨ **Production-Ready** - Used in real apps

## Tailwind Classes Still Work

All shadcn components use Tailwind CSS, so you can still:
```jsx
<Button className="w-full shadow-lg">Full width button</Button>
<Card className="p-8 border-2 border-red-500">Custom card</Card>
```

## Backend

Fixed composer.json package name format:
- Was: `gtvet-portal-backend` ❌
- Now: `gtvet/portal-backend` ✅

Ready to run:
```bash
cd backend
composer install
php artisan serve
```

## Next Steps

1. ✅ Frontend dependencies installed
2. ✅ shadcn components integrated
3. ⏭️ Install backend: `composer install`
4. ⏭️ Setup database
5. ⏭️ Add seed data
6. ⏭️ Deploy to cPanel

## Support

- shadcn/ui: https://ui.shadcn.com
- Tailwind: https://tailwindcss.com
- Lucide Icons: https://lucide.dev
- React: https://react.dev

---

**Everything is ready! Start building! 🎉**
