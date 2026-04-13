# MakerFirst Landing Page

## Project
Landing page for MakerFirst (makerfirst.ca) — 3D printable everyday gadgets for Makers.

## Brand
- Slogan: "One size doesn't fit all"
- We create never-before-seen product categories, not optimized clones
- Community-driven, open source (CERN-OHL-S license)
- Makers are partners in design, not consumers

## Tech Stack
- **Runtime/PM**: Bun (source ~/.bashrc or set PATH=$HOME/.bun/bin:$PATH)
- **Framework**: Astro 6
- **CSS**: Tailwind CSS 4 via @tailwindcss/vite
- **Interactive**: Svelte 5 via @astrojs/svelte (use ONLY for client-side interactivity)
- **Animations**: GSAP + ScrollTrigger (src/scripts/animations.ts)
- **Deploy**: GitHub Pages via withastro/action@v5

## Commands (use bun, not npm)
- `bun run dev` — Start dev server (localhost:4321)
- `bun run build` — Production build to dist/
- `bun run preview` — Preview production build
- `bun add <pkg>` — Add dependency

## Architecture
- `src/pages/` — File-based routing (index.astro = landing page)
- `src/layouts/BaseLayout.astro` — HTML shell with meta tags, view transitions, font loading
- `src/components/sections/` — Landing page sections (Hero, Product, Manifesto, Community, BuildProtocol, CTA, Footer)
- `src/components/Nav.astro` — Fixed top navigation
- `src/styles/global.css` — Design tokens (@theme block) + widget CSS + Tailwind import
- `src/scripts/animations.ts` — GSAP scroll utilities
- `public/svg/` — Static SVG assets (logo, social, ui, decorative)

## Design System — "The Digital Workbench"
See `design/DESIGN.md` for full spec, `PROMPT.md` for anti-vibe-coded rules.

**Core rules:**
- Dark industrial palette: Filament Orange (#FF6B00) is the ONLY accent
- Space Grotesk (display) + Inter (body) fonts
- 8pt spacing grid, 4px max border radius
- No purple, no sparkles, no emoji, no fake testimonials
- No 1px borders for sections — use tonal shifts or ghost borders
- No random shadows — use tonal layering instead
- Max 2px hover shift, 150ms transitions
- Precision Grid background pattern on key sections

**10 Named Design Widgets** (must be consistent across website, banner, biz card, mobile app):
1. Precision Grid — `.precision-grid`
2. Schematic Callout — `.callout-dot`, `.callout-line`
3. Spec Sheet — Technical data table (no dividers, zebra rows)
4. Version Badge — `.version-badge`, `.status-dot`
5. Terminal Card — `.terminal-card`, `.terminal-header`, `.terminal-body`
6. Filament Accent — `.filament-accent`
7. Technical Label — `.technical-label`
8. Ghost Border — `.ghost-border`
9. Workbench Floor — `--color-surface-lowest` bg
10. Repository Node — `.repo-track`

## Section Order
Nav → Hero → Product → Manifesto → Community → BuildProtocol → CTA → Footer

## GitHub Pages
- Source: GitHub Actions (configured via gh CLI)
- Custom domain: makerfirst.ca (CNAME in public/)
- Workflow: .github/workflows/deploy.yml
- Auto-deploys on push to main

## Svelte Usage Rules
- Only use .svelte for components needing CLIENT-SIDE interactivity
- Use client:visible for below-fold interactive components
- Use client:load only for above-fold critical interactivity
- Most components should be .astro (zero JS shipped)