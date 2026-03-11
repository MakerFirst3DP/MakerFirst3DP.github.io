---
description: "Audit responsive design across breakpoints"
user-invocable: true
allowed-tools: Read, Glob, Grep, Bash
---

# /responsive-check

Audit all components and pages for responsive design quality.

## Process

1. Read all files in `src/components/`, `src/pages/`, `src/layouts/`
2. Audit each file against the responsive checklist below

## Breakpoints

| Name | Width | Use |
|------|-------|-----|
| Mobile | 320px–767px | Base styles (mobile-first) |
| Tablet | 768px–1023px | `md:` prefix |
| Desktop | 1024px+ | `lg:` prefix |
| Wide | 1280px+ | `xl:` prefix |

## Audit Checklist

### Layout
- [ ] Mobile-first approach: base styles for mobile, `md:` / `lg:` for larger
- [ ] No horizontal scroll at any breakpoint
- [ ] Content containers have appropriate max-width
- [ ] Grid layouts collapse properly on mobile (e.g., 3-col → 1-col)
- [ ] Sections have appropriate vertical spacing at each breakpoint

### Typography
- [ ] Text scales appropriately (smaller headings on mobile)
- [ ] Line length stays readable (45–75 characters per line)
- [ ] No text overflow or truncation issues

### Touch Targets
- [ ] All interactive elements >= 44x44px on mobile
- [ ] Adequate spacing between touch targets (no accidental taps)
- [ ] Links and buttons are easily tappable

### Images & Media
- [ ] Images don't overflow containers
- [ ] SVGs scale properly
- [ ] No fixed-width images that break on small screens

### Navigation
- [ ] Navigation is usable on mobile (hamburger or simplified)
- [ ] Menu items are accessible on touch devices

### Spacing
- [ ] Padding adjusts for mobile (less horizontal padding on small screens)
- [ ] Section spacing is proportional to viewport

## Output Format

```
# Responsive Check Report

## Summary: PASS / FAIL

### Mobile (320px)
- Issues found...

### Tablet (768px)
- Issues found...

### Desktop (1024px+)
- Issues found...

### Recommendations
- Priority fixes with file:line references
```
