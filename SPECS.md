# MakerFirst Site — Specifications

Living document. Captures implementation decisions, design system, and gotchas. Read this before adding features or opening PRs.

---

## 1. Project Context

**Business:** MakerFirst — 3D printable everyday gadgets for Makers.
**Focus:** Community-driven, open-source product design. Not a consultancy.
**Slogan:** "One size doesn't fit all."
**First product:** Espresso gear — Air-Puck Distributor (precision air distribution for coffee pucks, replaces WDT).
**Domain:** makerfirst.ca (GitHub Pages, custom domain)
**Repo:** MakerFirst3DP/MakerFirst3DP.github.io

---

## 2. Tech Stack

| Layer | Choice | Version | Reason |
|-------|--------|---------|--------|
| Runtime / PM | Bun | 1.3.10 | Fast installs, native TS, lockfile for CI |
| Framework | Astro | 6.x | Static-first, zero JS by default, islands architecture |
| CSS | Tailwind CSS 4 | 4.x | Design tokens via `@theme`, no config file needed |
| Tailwind plugin | @tailwindcss/vite | 4.x | Tailwind v4 does NOT use `@astrojs/tailwind` |
| Interactivity | Svelte 5 | 5.x | Smallest bundles, used only for client-side islands |
| Animations | GSAP + ScrollTrigger | 3.x | Scroll-driven parallax with native touch support |
| Deploy | withastro/action | v5 | Auto-detects bun.lockb, uses Bun in CI |
| Typography | Space Grotesk (display) + Inter (body) | — | Two fonts via Google Fonts |

### Bun PATH note

Bun lives at `~/.bun/bin/bun`. In a fresh shell it may not be on PATH.

```bash
export PATH="$HOME/.bun/bin:$PATH"
# or: source ~/.bashrc
```

---

## 3. Design System — "The Digital Workbench"

Full anti-vibe-coded rules in `PROMPT.md`. Design spec in `design/DESIGN.md`.

### 3.1 Color Palette — The Industrial Palette

Rooted in the materials of the workshop: matte metals, dark resins, and Filament Orange.

| Token | Hex | Tailwind Class | Use |
|-------|-----|----------------|-----|
| `--color-primary` | `#FF6B00` | `bg-primary`, `text-primary` | Filament Orange — the ONLY accent |
| `--color-primary-tint` | `#ffb693` | `bg-primary-tint`, `text-primary-tint` | Lighter orange for gradients |
| `--color-surface-dim` | `#0a0a0b` | `bg-surface-dim` | Deepest: page bg, footer |
| `--color-surface-lowest` | `#0e0e0e` | `bg-surface-lowest` | Floor of the workbench (hero, manifesto) |
| `--color-surface-low` | `#131313` | `bg-surface-low` | Section backgrounds |
| `--color-surface` | `#171717` | `bg-surface` | Cards, raised components |
| `--color-surface-high` | `#1c1b1b` | `bg-surface-high` | Hover states, table headers |
| `--color-on-surface` | `#e2e2e5` | `text-on-surface` | Primary text on dark surfaces |
| `--color-on-surface-variant` | `#8e8e93` | `text-on-surface-variant` | Secondary/muted text |
| `--color-outline` | `#28282c` | `border-outline` | Borders, dividers |
| `--color-outline-variant` | `#3a3a3e` | `border-outline-variant` | Deeper borders |

**The "No-Line" Rule:** Do not use 1px solid borders to define sections. Sectioning must be achieved through tonal shifts, negative space, or ghost borders (15% opacity).

**The "Only Orange" Rule:** `#FF6B00` is the ONLY accent color. No purple gradients. No random color splashes.

### 3.2 Spacing — 8pt Grid

All margins, padding, and gaps use the 8pt scale:

```
8px   → spacing-1  → p-1, m-1, gap-1
16px  → spacing-2  → p-2, m-2, gap-2
24px  → spacing-3  → p-3, gap-3
32px  → spacing-4  → p-4, gap-4
40px  → spacing-5  → gap-5
48px  → spacing-6  → p-6, gap-6
64px  → spacing-8  → p-8, gap-8
80px  → spacing-10  → py-10
96px  → spacing-12 → py-12
```

### 3.3 Typography

**Space Grotesk** for display/headings (font-display). **Inter** for body (font-body).

| Class | rem | px | Line height | Use |
|-------|-----|----|-------------|-----|
| `text-[10px]` | 0.625 | 10 | — | Technical labels, spec annotations |
| `text-[11px]` | 0.6875 | 11 | — | Small UI text, terminal |
| `text-xs` | 0.75 | 12 | 1.6 | Labels, captions |
| `text-sm` | 0.875 | 14 | 1.6 | Body text, descriptions |
| `text-base` | 1.0 | 16 | 1.6 | Standard body |
| `text-lg` | 1.125 | 18 | 1.5 | Lead paragraphs |
| `text-xl` | 1.25 | 20 | 1.4 | Card headings |
| `text-2xl` | 1.5 | 24 | 1.3 | Section subheadings |
| `text-3xl` | 1.875 | 30 | 1.2 | Section headings |
| `text-4xl` | 2.25 | 36 | 1.2 | Large headings |
| `text-6xl` | 3.75 | 60 | 1.1 | Hero tablet |
| `text-8xl` | 6.0 | 96 | 1.0 | Hero desktop |

### 3.4 Border Radius

Industrial: **4px max.** We build machines, not pillows.

```
--radius-sm: 2px   → small elements
--radius:    4px   → buttons, cards, inputs (standard)
--radius-lg: 4px   → same as default — intentional consistency
```

Always reference via CSS variable. No `rounded-lg` (12px), no circular avatars on cards.

### 3.5 Shadows

Only for floating overlays (modals, tooltips). Never for cards in flow.

```
--shadow-overlay: 0 8px 32px rgb(0 0 0 / 0.4), 0 0 0 1px rgb(255 107 0 / 0.04)
```

### 3.6 Animation

```
--duration-fast:   150ms  → hover/focus transitions
--duration-normal: 250ms  → interactive state changes
--duration-slow:   400ms  → max for scroll reveals
```

Max 2px shift on hover. No bounce. No overshoot. No animation for decoration.

---

## 4. Named Design Widgets

These specific visual elements must be consistent across ALL MakerFirst touchpoints (website, banner, biz card, mobile app):

### 4.1 [WIDGET] Precision Grid
Background grid pattern (32px major, 8px minor) using `--color-primary` at 5% opacity.
CSS class: `.precision-grid`

### 4.2 [WIDGET] Schematic Callout
Leader line annotation: 6px orange dot + 1px orange line + uppercase label.
CSS classes: `.callout-dot`, `.callout-line`

### 4.3 [WIDGET] Spec Sheet
Technical data table — no divider lines, tonal zebra striping, right-aligned values.
Uppercase label-md for keys.

### 4.4 [WIDGET] Version Badge
Small metadata chip with status dot + label.
CSS class: `.version-badge`, `.status-dot`

### 4.5 [WIDGET] Terminal Card
Code/terminal preview with window control dots.
CSS classes: `.terminal-card`, `.terminal-header`, `.terminal-body`

### 4.6 [WIDGET] Filament Accent
Orange gradient strip (primary-tint → primary at 135deg).
CSS class: `.filament-accent`

### 4.7 [WIDGET] Technical Label
Small uppercase tracking-widest label in Space Grotesk, primary color.
CSS class: `.technical-label`

### 4.8 [WIDGET] Ghost Border
Subtle outline at ~15% opacity. Felt, not seen.
CSS class: `.ghost-border`

### 4.9 [WIDGET] Workbench Floor
Deepest surface bg (`--color-surface-lowest: #0e0e0e`) for "etched" sections.

### 4.10 [WIDGET] Repository Node
Connected node in branching layout with orange vertical track.
CSS class: `.repo-track`

---

## 5. Page Sections

### Section Order (index.astro)

```
Nav         → fixed top, z-50, bg-surface-dim/95, border-b border-outline
Hero        → surface-lowest, precision-grid, slogan + product visual
Product     → surface-low, Spec Sheet + Schematic Callouts
Manifesto   → surface-lowest, precision-grid, 4 principle cards
Community   → surface-dim, precision-grid, Terminal Card + Fork cards
BuildProtocol → surface-high, 3-step assembly instructions
CTA         → surface-lowest, precision-grid, download + email
Footer      → surface-dim, Technical Labels, GitHub link
```

### Section IDs

| Section | Background | ID |
|---------|------------|-----|
| Nav | `bg-surface-dim/95` | — |
| Hero | `bg-surface-lowest` | — |
| Product | `bg-surface-low` | `id="product"` |
| Manifesto | `bg-surface-lowest` | `id="manifesto"` |
| Community | `bg-surface-dim` | `id="community"` |
| BuildProtocol | `bg-surface-high` | `id="build"` |
| CTA | `bg-surface-lowest` | `id="cta"` |
| Footer | `bg-surface-dim` | — |

---

## 6. Critical Gotchas

### 6.1 SVG Assets Must Be in `public/`
All SVGs referenced via `<img>` or CSS `url()` must live in `public/`.

### 6.2 CNAME Must Be in `public/`
`public/CNAME` must contain `makerfirst.ca`.

### 6.3 Tailwind v4 — `@theme` Block, No Config File
Design tokens defined via `@theme {}` in `src/styles/global.css`.

### 6.4 GSAP Selectors Must Be Section-Scoped
Always use `#id` for parent selectors in `initStaggerReveal`.

### 6.5 Color Tokens — Use Classes, Not Inline Hex
Never use `bg-[#0e0e0e]`. Always use `bg-surface-lowest` etc.

---

## 7. Contact & Social Links

| Platform | URL | Status |
|----------|-----|--------|
| Email | `hello@makerfirst.ca` | Real |
| GitHub | `https://github.com/MakerFirst3DP` | Active (this repo's org) |

Instagram, YouTube, Twitter/X, LinkedIn not linked — no confirmed active accounts.

---

## 8. Local Development

```bash
bun run dev      # Start dev server at localhost:4321
bun run build    # Production build → dist/
bun run preview   # Preview production build
```