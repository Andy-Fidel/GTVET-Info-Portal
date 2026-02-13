# shadcn/ui Components in This Project

## Available Components

### Core Components

#### Button
Custom button component with variants:
- `variant`: "default", "secondary", "destructive", "outline", "ghost"
- `size`: "sm", "md", "lg", "icon"

```jsx
import { Button } from '@/components/ui/Button'

<Button variant="primary">Click me</Button>
<Button variant="secondary" size="lg">Large button</Button>
```

#### Card
Container component with multiple sub-components:
- `Card` - Container
- `CardHeader` - Header section
- `CardTitle` - Title
- `CardDescription` - Subtitle/description
- `CardContent` - Main content
- `CardFooter` - Footer section

```jsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

#### Input
Text input field with focus states:

```jsx
import { Input } from '@/components/ui/Input'

<Input 
  type="email"
  placeholder="Enter email"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

#### Textarea
Multi-line text input:

```jsx
import { Textarea } from '@/components/ui/Textarea'

<Textarea 
  placeholder="Your message..."
  rows={5}
/>
```

#### Label
Accessible label component:

```jsx
import { Label } from '@/components/ui/Label'

<Label htmlFor="name">Full Name</Label>
<Input id="name" />
```

#### Badge
Small badge component with variants:
- `variant`: "default", "primary", "secondary", "destructive"

```jsx
import { Badge } from '@/components/ui/Badge'

<Badge variant="primary">Featured</Badge>
```

#### AlertDialog
Modal dialog component:
- `AlertDialog` - Root
- `AlertDialogTrigger` - Button to open
- `AlertDialogContent` - Content container
- `AlertDialogHeader` - Header
- `AlertDialogTitle` - Title
- `AlertDialogDescription` - Description
- `AlertDialogFooter` - Footer
- `AlertDialogAction` - Confirm button
- `AlertDialogCancel` - Cancel button

```jsx
import { AlertDialog, AlertDialogTrigger, AlertDialogContent } from '@/components/ui/AlertDialog'

<AlertDialog>
  <AlertDialogTrigger>Open</AlertDialogTrigger>
  <AlertDialogContent>
    {/* content */}
  </AlertDialogContent>
</AlertDialog>
```

## Utility Functions

### cn() - Class Name Merger
Utility for merging Tailwind CSS classes with conflict resolution:

```jsx
import { cn } from '@/lib/utils'

const className = cn(
  'px-4 py-2 rounded',
  isActive && 'bg-primary text-white'
)
```

## Adding New Components

To add more shadcn components:

```bash
npm run add [component-name]
# Example:
npm run add dialog
npm run add dropdown-menu
npm run add tabs
```

## Styling with shadcn

All components are built with:
- **Tailwind CSS** for styling
- **Radix UI** for primitive components
- **Class Variance Authority** for variant management

This means you can customize components by:
1. Adding Tailwind classes
2. Using the `cn()` utility function
3. Modifying the component files directly

## Example Usage

See the following pages for practical examples:
- `frontend/src/pages/Contact.jsx` - Form with shadcn components
- `frontend/src/pages/Home.jsx` - Card components
- `frontend/src/pages/Institutions.jsx` - Card + Badge components
- `frontend/src/pages/Programs.jsx` - Button + Card components
- `frontend/src/components/Header.jsx` - Button component
