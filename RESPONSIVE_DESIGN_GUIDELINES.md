# Responsive Design Guidelines

## Standard Breakpoints (Tailwind CSS)

```
sm:  640px  - Small devices (tablets)
md:  768px  - Medium devices (small laptops)
lg:  1024px - Large devices (desktops)
xl:  1280px - Extra large devices (large desktops)
2xl: 1536px - 2x Extra large devices (very large screens)
```

## Mobile-First Approach

Always start with mobile styles (base classes) and scale up using breakpoint prefixes:
- Base styles = Mobile (< 640px)
- Add `sm:` for tablets and up
- Add `md:` for small laptops and up
- Add `lg:` for desktops and up
- Add `xl:` and `2xl:` for larger screens

## Standard Responsive Patterns

### 1. **Container Padding**
```jsx
// Mobile: p-4 (1rem = 16px)
// Tablet: sm:p-6 (1.5rem = 24px)
// Desktop: lg:p-8 (2rem = 32px)
<div className="p-4 sm:p-6 lg:p-8">
```

### 2. **Section Spacing**
```jsx
// Vertical spacing between sections
<section className="py-8 sm:py-12 lg:py-16">
```

### 3. **Typography**
```jsx
// Headings
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
<h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
<h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl">

// Body text
<p className="text-sm sm:text-base lg:text-lg">
```

### 4. **Grid Layouts**
```jsx
// 1 column mobile, 2 columns tablet, 3-4 columns desktop
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">

// Common patterns:
// - Products: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
// - Features: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
// - Partners/Logos: grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6
```

### 5. **Flexbox Layouts**
```jsx
// Stack on mobile, row on desktop
<div className="flex flex-col lg:flex-row gap-4 lg:gap-8">

// Center content with responsive spacing
<div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8">
```

### 6. **Width & Max-Width**
```jsx
// Container widths
<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

// Content widths
<div className="w-full sm:w-3/4 lg:w-1/2">
```

### 7. **Images**
```jsx
// Responsive image sizing
<img className="w-full h-auto object-cover" />

// Fixed aspect ratios
<div className="aspect-video w-full">
  <img className="w-full h-full object-cover" />
</div>

// Responsive heights
<img className="h-48 sm:h-64 lg:h-80 w-full object-cover" />
```

### 8. **Buttons**
```jsx
// Full width on mobile, auto on desktop
<button className="w-full sm:w-auto px-6 py-2 sm:py-3">

// Responsive text and padding
<button className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base">
```

### 9. **Navigation**
```jsx
// Hidden on mobile, visible on desktop
<div className="hidden lg:flex">

// Visible on mobile, hidden on desktop
<div className="lg:hidden">
```

### 10. **Cards & Components**
```jsx
// Responsive card padding
<div className="p-4 sm:p-6 lg:p-8 rounded-lg">

// Responsive gaps in card content
<div className="space-y-3 sm:space-y-4 lg:space-y-6">
```

## Common CSS Properties to Convert

When migrating from CSS to Tailwind, look for these properties:

### Spacing
- `margin` → `m-{size}` with responsive variants
- `padding` → `p-{size}` with responsive variants
- `gap` → `gap-{size}` with responsive variants

### Sizing
- `width` → `w-{size}` with responsive variants
- `height` → `h-{size}` with responsive variants
- `max-width` → `max-w-{size}`
- `min-width` → `min-w-{size}`

### Typography
- `font-size` → `text-{size}` with responsive variants
- `line-height` → `leading-{size}`
- `font-weight` → `font-{weight}`

### Display & Layout
- `display: flex` → `flex`
- `flex-direction` → `flex-row`, `flex-col`
- `display: grid` → `grid`
- `grid-template-columns` → `grid-cols-{n}`

## Migration Checklist for Each Component

1. **Read the component file** to understand current structure
2. **Check for CSS file** - if exists, read it
3. **Identify hardcoded values** for:
   - [ ] Padding/Margin
   - [ ] Width/Height
   - [ ] Font sizes
   - [ ] Grid/Flex layouts
4. **Convert to Tailwind classes** with mobile-first approach
5. **Add responsive variants** (sm:, md:, lg:, xl:)
6. **Test visual hierarchy** works on all screen sizes
7. **Remove unused CSS** or delete CSS file if fully migrated

## Best Practices

### DO:
✅ Use mobile-first approach (base + sm: + md: + lg:)
✅ Use consistent spacing scale (4, 6, 8, 12, 16, etc.)
✅ Use Tailwind's default spacing units (multiples of 0.25rem)
✅ Keep responsive breakpoints consistent across components
✅ Use semantic gap sizes (gap-4, gap-6, gap-8)
✅ Use max-width containers for large screens

### DON'T:
❌ Don't use arbitrary values unless absolutely necessary
❌ Don't mix CSS files with Tailwind classes for the same properties
❌ Don't use too many breakpoint variants (keep it simple)
❌ Don't forget to test on actual devices or browser dev tools
❌ Don't use fixed pixel values in CSS that should be responsive

## Component-Specific Patterns

### Hero Sections
```jsx
<section className="min-h-screen flex items-center py-12 lg:py-20">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
    <p className="text-base sm:text-lg lg:text-xl mt-4 sm:mt-6">
    <button className="mt-6 sm:mt-8 px-6 py-3 sm:px-8 sm:py-4">
  </div>
</section>
```

### Card Grids
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
  <div className="p-4 sm:p-6 rounded-lg">
    <img className="h-48 sm:h-56 lg:h-64 w-full object-cover rounded-lg" />
    <h3 className="text-lg sm:text-xl lg:text-2xl mt-4">
    <p className="text-sm sm:text-base mt-2">
  </div>
</div>
```

### Navigation
```jsx
// Desktop nav
<nav className="hidden lg:flex items-center gap-6">

// Mobile menu button
<button className="lg:hidden p-2">

// Mobile menu
<div className="lg:hidden fixed inset-0 bg-white z-50">
```

### Footer
```jsx
<footer className="py-8 sm:py-12 lg:py-16">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
  </div>
</footer>
```

## Testing Checklist

- [ ] Mobile (< 640px) - Stack elements vertically, full-width buttons
- [ ] Tablet (640px - 1023px) - 2 columns for most grids, comfortable spacing
- [ ] Desktop (1024px+) - 3-4 columns, optimal reading width
- [ ] Large Desktop (1280px+) - Maximum content width with horizontal margins

## Resources

- Tailwind CSS Documentation: https://tailwindcss.com/docs
- Responsive Design Breakpoints: https://tailwindcss.com/docs/responsive-design
- Spacing Scale: https://tailwindcss.com/docs/customizing-spacing
