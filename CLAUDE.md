# MakerFirst Landing Page

## Project
Landing page for MakerFirst (makerfirst.ca) — consulting for Launch Hardware, AI Agents, Firmware Dev.

## Tech Stack
- **Runtime/PM**: Bun (source ~/.bashrc or set PATH=$HOME/.bun/bin:$PATH)
- **Framework**: Astro 5
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
- `src/components/sections/` — Landing page sections (Hero, About, Services, etc.)
- `src/components/` — Reusable UI components
- `src/styles/global.css` — Design tokens (@theme block) + Tailwind import
- `src/scripts/animations.ts` — GSAP parallax/scroll utilities
- `public/` — Static assets (CNAME, favicon, images)

## Design System
See PROMPT.md for complete anti-vibe-coded design guidelines.
Key rules: 8pt spacing grid, Inter font, 8px border-radius, small color palette, subtle animations only.
Tokens defined in src/styles/global.css @theme block.

## Skills (in .claude/skills/)
- `/new-section <type>` — Add a landing page section (hero, about, services, trust, process, cta, footer)
- `/design-review` — Audit against anti-vibe-coded checklist (PASS/FAIL report)
- `/add-component <name>` — Create a reusable UI component
- `/deploy` — Build, verify, and push to deploy
- `/responsive-check` — Audit responsive design across breakpoints
- `/create-svg <name>` — Create SVG assets following ICONS.md specs

## SVG Design Subsystem
See ICONS.md for complete SVG specs and designer handoff notes.
SVGs in src/assets/svg/ (logo, services, ui, social, decorative).
Raw brand files for print in public/brand/.
Use /create-svg skill to generate new SVGs.

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
