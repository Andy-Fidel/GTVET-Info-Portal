# Technical Playbook: App Development Skills & Patterns

This document captures the architectural patterns, best practices, and "skills" established during the development of the **GTVET Information Portal**. Use this as a guide for building future high-performance, premium web applications.

---

## 1. Core Philosophy
*   **Premium UI/UX**: Every interface must feel modern and high-end. Use glassmorphism, subtle gradients, and micro-animations.
*   **Mobile-First**: Design for responsiveness from the start. Buttons should be touch-friendly, and layouts must stack elegantly.
*   **Performance Second to None**: Use video backgrounds with image fallbacks, virtualized lists for long data, and optimized API queries.

---

## 2. Technology Stack
| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) | Fast dev cycle, modern ecosystem, component-based. |
| **Styling** | Tailwind CSS | Utility-first, highly customizable, zero runtime CSS. |Shadcn UI|
| **State** | Zustand | Lightweight alternative to Redux for global state. |
| **Backend** | Laravel (PHP) | Robust, secure, excellent Eloquent ORM. |
| **Database** | MySQL | Reliable, industry-standard relational database. |
| **Mailing** | Resend API | Modern, developer-friendly email delivery. |

---

## 3. Frontend Patterns (React)

### API Service Layer
Always centralize API calls in `src/services/api.js`. Use Axios interceptors for authentication and error handling.
```javascript
// Pattern: Standardized API Service
export const itemsAPI = {
  getAll: (params) => apiClient.get('/items', { params }),
  create: (formData) => apiClient.post('/items', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};
```

### Global State (Zustand)
Use `useAppStore` for session-wide data like authenticated users, global loading states, and error alerts.
```javascript
export const useAppStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

### Interactive Components
*   **SVG Maps**: Use raw SVG paths within React components to create interactive, region-based explorers.
*   **Video Media**: Implement `video` tags with `poster` attributes and dual-layered overlays (`bg-slate-900/70`) for text readability.

---

## 4. Backend Patterns (Laravel)

### API Data Transformation
Never return raw models. Use **API Resources** to format data, handle relationship nesting, and provide absolute file URLs.
```php
public function toArray($request) {
    return [
        'id' => $this->id,
        'name' => $this->name,
        'image_url' => $this->image_path ? asset('storage/' . $this->image_path) : null,
    ];
}
```

### Media Management
*   **Storage Link**: Always run `php artisan storage:link`.
*   **Upload Pattern**: Store images in the `public` disk and save the path in the database. Use a dedicated `view-image` route if direct direct browsing is restricted.

---

## 5. UI/UX "Magic" Touches
*   **Logo Visibility**: When placing logos on dark/busy headers, wrap them in a white circular background (`bg-white rounded-full p-1.5`) with a subtle border.
*   **Gradient Text**: Use `bg-clip-text text-transparent bg-gradient-to-br` for high-impact headings.
*   **Animation**: Leverage `animate-in fade-in slide-in-from-bottom` for content that feels "alive" on load.

---

## 6. Development Workflow
1.  **Planning**: Create an `implementation_plan.md` before writing code.
2.  **Tracking**: Use `task.md` to break down complex features into checkable items.
3.  **Verification**: Write a `walkthrough.md` with embedded screenshots/recordings as proof of work.

---
*Created by the GTVET Development Team*
