# shadcn/ui Integration Guide

## What's Included

✅ **shadcn/ui Components Setup**
- Pre-configured with 7 core components
- TypeScript & JavaScript ready
- Fully customizable with Tailwind CSS

## Components Included

1. **Button** - Multiple variants (default, secondary, destructive, outline, ghost)
2. **Card** - Container system (CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
3. **Input** - Text input field
4. **Textarea** - Multi-line text input
5. **Label** - Accessible form labels
6. **Badge** - Inline badge component
7. **AlertDialog** - Modal dialog system

## Project Updates

### Package.json
- Added Radix UI dependencies
- Added class-variance-authority & tailwind-merge
- Added lucide-react for icons
- Added npm script: `npm run add` for adding more components

### File Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/                 # NEW: shadcn components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Textarea.jsx
│   │   │   ├── Label.jsx
│   │   │   ├── Badge.jsx
│   │   │   └── AlertDialog.jsx
│   │   ├── Header.jsx         # UPDATED: Uses shadcn Button & icons
│   │   └── Footer.jsx
│   ├── lib/
│   │   └── utils.js           # NEW: cn() utility function
│   └── pages/
│       ├── Home.jsx           # UPDATED: shadcn Cards & Buttons
│       ├── Institutions.jsx   # UPDATED: shadcn components
│       ├── Programs.jsx       # UPDATED: shadcn components
│       ├── Announcements.jsx  # UPDATED: shadcn components
│       └── Contact.jsx        # UPDATED: shadcn Form components
├── components.json            # NEW: shadcn configuration
└── vite.config.js            # UPDATED: Added path alias support
```

## Key Updates

### 1. Vite Configuration
Added path alias `@` pointing to `./src` for cleaner imports:
```jsx
import { Button } from '@/components/ui/Button'
```

### 2. Components Improved
All pages now use:
- **shadcn/ui Button** for consistent actions
- **shadcn/ui Card** for content containers
- **shadcn/ui Input/Textarea** for forms
- **shadcn/ui Label** for accessible forms
- **shadcn/ui Badge** for tags/pills
- **Lucide React Icons** for beautiful icons

### 3. Accessibility
- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Semantic HTML

## Usage Examples

### Button
```jsx
import { Button } from '@/components/ui/Button'

// Default
<Button>Click me</Button>

// With variant and size
<Button variant="secondary" size="lg">Large secondary</Button>

// Outline
<Button variant="outline">Outline</Button>
```

### Form
```jsx
import { Label } from '@/components/ui/Label'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'

<div className="space-y-4">
  <div>
    <Label htmlFor="name">Name</Label>
    <Input id="name" placeholder="Your name" />
  </div>
  <div>
    <Label htmlFor="message">Message</Label>
    <Textarea id="message" placeholder="Your message" />
  </div>
  <Button type="submit">Send</Button>
</div>
```

### Card
```jsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

## Adding More Components

To add more shadcn components (e.g., dropdown-menu, tabs, dialog):

```bash
cd frontend
npm run add dropdown-menu
npm run add tabs
npm run add dialog
```

Available components: https://ui.shadcn.com/docs/components

## Styling & Customization

### Using the cn() Utility
```jsx
import { cn } from '@/lib/utils'

export function MyComponent({ className, ...props }) {
  return (
    <div
      className={cn(
        'px-4 py-2 rounded-md',
        className
      )}
      {...props}
    />
  )
}
```

### Extending Components
All components are in `frontend/src/components/ui/` and can be modified directly. They're not locked - you own the code!

## Next Steps

1. **Install dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start development**:
   ```bash
   npm run dev
   ```

3. **Add more components as needed**:
   ```bash
   npm run add [component-name]
   ```

4. **Customize components** by editing files in `src/components/ui/`

## Resources

- shadcn/ui Docs: https://ui.shadcn.com
- Tailwind CSS: https://tailwindcss.com
- Radix UI: https://www.radix-ui.com
- Lucide Icons: https://lucide.dev

## Backend Status

Backend `composer install` issue fixed:
- Changed package name from `gtvet-portal-backend` to `gtvet/portal-backend` (proper Composer format)

Ready to run: `composer install` in the backend directory

---

**Frontend is now ready with professional, accessible UI components!** 🎨✨
