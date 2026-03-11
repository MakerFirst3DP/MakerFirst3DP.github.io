---
description: "Audit the site against the anti-vibe-coded design checklist"
user-invocable: true
allowed-tools: Read, Glob, Grep, Bash
---

# /design-review

Run a comprehensive design audit against the anti-vibe-coded checklist from PROMPT.md.

## Process

1. Read `PROMPT.md` for the complete checklist
2. Read `src/styles/global.css` for design tokens
3. Read all files in `src/components/`, `src/pages/`, `src/layouts/`
4. Audit each file against the checklist below

## Audit Categories

### 1. Spacing Discipline
- [ ] All spacing values use design tokens (multiples of 4/8)
- [ ] No magic numbers in margins, padding, or gaps
- [ ] Consistent vertical rhythm between sections

### 2. Typography
- [ ] Only Inter font used
- [ ] Type ramp follows defined sizes (text-xs through text-6xl)
- [ ] Heading hierarchy is logical (h1 > h2 > h3, no skips)
- [ ] Line heights match tokens (1.2 headings, 1.6 body)
- [ ] No overly bold or overly light text

### 3. Colors
- [ ] Only palette colors used (brand-primary, brand-secondary, brand-accent, neutrals)
- [ ] No purple gradients
- [ ] No neon effects
- [ ] High contrast text (meets WCAG AA)

### 4. Border Radius
- [ ] Consistent use of --radius (8px) across all components
- [ ] No mixed border radiuses without intention
- [ ] --radius-sm and --radius-lg used sparingly

### 5. Animations
- [ ] All animations <= 400ms duration
- [ ] No bounce, wiggle, or overshoot effects
- [ ] Hover effects are subtle (no aggressive lifts or rotations)
- [ ] prefers-reduced-motion respected
- [ ] No decorative-only animations

### 6. Content Quality
- [ ] No generic taglines ("Build your dreams", "Launch faster")
- [ ] No placeholder text
- [ ] No fake testimonials
- [ ] Real social links only (no "#" hrefs for social icons)
- [ ] Copyright text is correct and current

### 7. Meta/SEO
- [ ] Page title is specific (not "Home")
- [ ] Meta description present and meaningful
- [ ] OG image defined
- [ ] Favicon present
- [ ] Canonical URL set

### 8. Accessibility
- [ ] Skip-to-content link present
- [ ] All images have alt text
- [ ] Touch targets >= 44x44px
- [ ] Focus styles visible
- [ ] ARIA labels on icon-only buttons
- [ ] Color not sole indicator of state

### 9. Performance
- [ ] No unnecessary client-side JS (Svelte only where needed)
- [ ] Images optimized (SVG preferred, proper dimensions)
- [ ] Fonts preconnected
- [ ] No unused CSS/JS

## Output Format

```
# Design Review Report

## Summary: PASS / FAIL (X issues found)

### Category: Status
- PASS: reason
- FAIL: file:line — description — suggested fix

### Recommendations
- Priority fixes
- Nice-to-have improvements
```
