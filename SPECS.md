# MakerFirst Site — Specifications

Living document. Captures original plan decisions, implementation refinements, and gotchas discovered during the build. Read this before adding features or opening PRs.

---

## 1. Project Context

**Business:** MakerFirst — boutique engineering consultancy, Canada-based.
**Services:** Launch Hardware, AI Agents, Firmware Development.
**Goal:** Landing page that induces trust on first look. Not a portfolio. Not a blog. A single conversion page.
**Domain:** makerfirst.ca (GitHub Pages, custom domain)
**Repo:** MakerFirst3DP/MakerFirst3DP.github.io

---

## 2. Tech Stack

| Layer | Choice | Version | Reason |
|-------|--------|---------|--------|
| Runtime / PM | Bun | 1.3.10 | Fast installs, native TS, lockfile for CI |
| Framework | Astro | 6.x | Static-first, zero JS by default, islands architecture |
| CSS | Tailwind CSS 4 | 4.x | Design tokens via `@theme`, no config file needed |
| Tailwind plugin | @tailwindcss/vite | 4.x | Tailwind v4 does NOT use the old `@astrojs/tailwind` — use Vite plugin directly |
| Interactivity | Svelte 5 | 5.x | Smallest bundles, used only for client-side islands |
| Animations | GSAP + ScrollTrigger | 3.x | Scroll-driven parallax with native touch support |
| Deploy | withastro/action | v5 | Auto-detects bun.lockb, uses Bun in CI |
| Typography | Inter | — | Single font via Google Fonts, weights 400/500/600/700 |

### Bun PATH note

Bun lives at `~/.bun/bin/bun`. In a fresh shell it may not be on PATH.

```bash
export PATH="$HOME/.bun/bin:$PATH"
# or: source ~/.bashrc
```

Always use `bun`, never `npm` or `npx`. Use `bunx` for one-off executables.

---

## 3. Directory Structure

```
/
├── public/
│   ├── CNAME                   # makerfirst.ca — MUST be in public/, not root
│   ├── favicon.svg
│   ├── og-image.svg            # 1200×630 OG card (SVG, not PNG)
│   ├── robots.txt
│   ├── brand/                  # Raw brand files for print/download
│   │   ├── logomark.svg
│   │   ├── lockup-horizontal.svg
│   │   └── brand-guide-excerpt.svg
│   └── svg/                    # Static SVGs served as URLs — all SVG assets live here
│       ├── logo/
│       ├── services/
│       ├── ui/
│       ├── social/
│       └── decorative/
├── src/
│   ├── assets/svg/             # LEGACY PATH — do not use for new assets
│   │   └── (same tree as public/svg — kept for reference, not served)
│   ├── components/
│   │   ├── Nav.astro
│   │   └── sections/
│   │       ├── Hero.astro
│   │       ├── Services.astro
│   │       ├── Trust.astro
│   │       ├── About.astro
│   │       ├── Process.astro
│   │       ├── CTA.astro
│   │       └── Footer.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── scripts/
│   │   └── animations.ts       # GSAP parallax + scroll reveal utilities
│   └── styles/
│       └── global.css          # Design tokens (@theme) + Tailwind import
├── .claude/skills/             # Claude Code skill prompts
├── .github/workflows/
│   └── deploy.yml
├── astro.config.mjs
├── svelte.config.js
├── tsconfig.json               # extends astro/tsconfigs/strict
├── package.json
├── bun.lock
├── CLAUDE.md                   # Claude Code project context
├── PROMPT.md                   # Anti-vibe-coded design system reference
├── ICONS.md                    # SVG design subsystem specs
└── SPECS.md                    # This file
```

---

## 4. Critical Gotchas Discovered

These burned time and must not be repeated.

### 4.1 SVG Assets Must Be in `public/`, NOT `src/assets/`

**Problem:** Astro does not serve `src/` directory contents as static URLs. Any `<img src="/src/assets/...">` will 404 in both dev and production.

**Correct approach:** All SVGs referenced via `<img>` or CSS `url()` must live in `public/`. They are then accessible as `/svg/...`.

```
public/svg/decorative/hero-parallax.svg  →  src="/svg/decorative/hero-parallax.svg"  ✓
src/assets/svg/decorative/hero-parallax.svg  →  src="/src/assets/svg/..."  ✗ 404
```

**Alternative (not used here):** Import with `import url from '../assets/img.svg?url'` in Astro frontmatter. Vite processes and hashes the file. Good for content-hashed assets. Not used because the SVGs are large, shared, and benefit from stable URLs.

**Note:** `src/assets/svg/` exists as a reference copy but is NOT served. Do not add new assets there — add to `public/svg/`.

### 4.2 CNAME Must Be in `public/`, Not the Repo Root

**Problem:** Astro builds to `dist/`. It copies `public/` to `dist/`. If `CNAME` is in the repo root, it does not appear in `dist/`, and GitHub Pages loses the custom domain on every deploy.

```
public/CNAME  →  dist/CNAME  ✓  (custom domain preserved)
CNAME         →  NOT in dist  ✗  (domain reset on deploy)
```

### 4.3 Tailwind v4 Plugin — Not the Old Integration

**Problem:** Tailwind CSS 4 uses `@tailwindcss/vite`, not `@astrojs/tailwind`. The old integration does not work with v4.

```js
// astro.config.mjs — correct
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  vite: { plugins: [tailwindcss()] },
});
```

```js
// WRONG — old v3 pattern
import tailwind from '@astrojs/tailwind';
integrations: [tailwind()]
```

### 4.4 Tailwind v4 Theme — `@theme` Block, No Config File

**Problem:** Tailwind v4 does not use `tailwind.config.js`. Design tokens are defined with the `@theme {}` directive in CSS.

```css
/* src/styles/global.css */
@import 'tailwindcss';

@theme {
  --color-brand-primary: #0f172a;  /* → bg-brand-primary, text-brand-primary, etc. */
  --color-brand-accent: #f59e0b;   /* → bg-brand-accent, text-brand-accent, etc. */
}
```

Token names map directly to Tailwind utility suffixes. `--color-brand-primary` → `text-brand-primary`, `bg-brand-primary`, `border-brand-primary`.

### 4.5 GSAP Selectors Must Be Section-Scoped

**Problem:** Using a generic selector like `'section'` as the parent in `initStaggerReveal` fires the animation when ANY section on the page enters the viewport — not just the intended one.

```ts
// WRONG — fires on first section that matches
initStaggerReveal('section', '.trust-stat', options);

// CORRECT — scoped to specific section
initStaggerReveal('#trust', '.trust-stat', options);
```

**Rule:** Always give animated sections a unique `id` and target by `#id`.

### 4.6 GitHub Pages Source Must Be Set to GitHub Actions

By default, new GitHub Pages repos use "Deploy from branch". The Astro deploy workflow requires "GitHub Actions" as the source.

```bash
gh api repos/MakerFirst3DP/MakerFirst3DP.github.io/pages \
  --method PUT \
  --field build_type=workflow
```

This is a one-time setup. Do not redo it unless the repo Pages settings are reset.

### 4.7 `withastro/action@v5` Auto-Detects Bun

The GitHub Actions deploy workflow uses `withastro/action@v5`. It detects `bun.lock` in the repo root and automatically uses Bun for install and build — no extra configuration needed.

**Note:** `actions/checkout@v4` uses Node.js 20 which GitHub will deprecate in June 2026. Pin to `@v5` before that date.

### 4.8 OG Image — SVG Works, But Check Platform Support

`og-image.svg` is referenced in meta tags. Most link-preview scrapers (Slack, Discord, Twitter/X, LinkedIn) render OG images — SVG support varies by platform. If OG previews look broken on a specific platform, convert `og-image.svg` to PNG at 1200×630 and rename to `og-image.png`.

### 4.9 Parallax Target Is the Wrapper Div, Not the `<img>`

```astro
<!-- Hero.astro -->
<div class="parallax-bg absolute inset-0 ...">  <!-- GSAP animates this div -->
  <img src="/svg/decorative/hero-parallax.svg" ... />
</div>
```

```ts
initParallax('.parallax-bg', 0.2);  // correct — targets the wrapper
```

GSAP translates the wrapper div via `yPercent`. The image fills it via `object-cover`. The `<section>` is the ScrollTrigger trigger (via `el.parentElement`).

---

## 5. Design System

Full anti-vibe-coded rules in `PROMPT.md`. Summary of implemented tokens:

### 5.1 Spacing — 8pt Grid

All margins, padding, and gaps must be multiples of 4px (tight) or 8px (standard).

```
4px   → spacing-1  → p-1, m-1, gap-1
8px   → spacing-2  → p-2, m-2, gap-2
12px  → spacing-3  → p-3, gap-3
16px  → spacing-4  → p-4, gap-4
24px  → spacing-6  → p-6, gap-6
32px  → spacing-8  → p-8, gap-8
48px  → spacing-12 → p-12, gap-12
64px  → spacing-16 → p-16
96px  → spacing-24 → py-24 (section vertical padding)
128px → spacing-32
```

**Violations that were found and fixed:** `gap-5` (20px), `gap-10` (40px), `bottom-10` (40px) — all replaced with on-grid values.

### 5.2 Colors

| Token | Hex | Tailwind class | Use |
|-------|-----|----------------|-----|
| `--color-brand-primary` | `#0f172a` | `bg-brand-primary`, `text-brand-primary` | Dark navy. Main text, dark sections, nav bg |
| `--color-brand-secondary` | `#334155` | `text-brand-secondary` | Slightly lighter navy. Secondary text |
| `--color-brand-accent` | `#f59e0b` | `bg-brand-accent`, `text-brand-accent` | Amber. CTAs, highlights, borders |
| `--color-brand-accent-hover` | `#d97706` | `hover:bg-brand-accent-hover` | Darker amber for hover states |
| `--color-neutral-50` | `#f8fafc` | `bg-neutral-50` | Page default background |
| `--color-neutral-100` | `#f1f5f9` | `bg-neutral-100` | Subtle section alternation (Process) |
| `--color-neutral-200` | `#e2e8f0` | `border-neutral-200` | Card borders, dividers |
| `--color-neutral-600` | `#475569` | `text-neutral-600` | Body text on light backgrounds |
| `--color-neutral-800` | `#1e293b` | `bg-neutral-800` | Button hover on dark |
| `--color-neutral-950` | `#020617` | `bg-neutral-950` | Footer background (deeper than navy) |

**Do not** use hardcoded hex values (`bg-[#0f172a]`). Always use token classes. 35 violations were found and fixed in the initial quality gate pass.

**Note on amber:** Tailwind's built-in `amber-*` utilities are still available. Brand accent `#f59e0b` = Tailwind `amber-500`. Use `bg-brand-accent` for CTA buttons to stay token-consistent.

### 5.3 Typography

Single font: **Inter** via Google Fonts (weights 400, 500, 600, 700). No other fonts.

| Class | rem | px | Line height | Use |
|-------|-----|----|-------------|-----|
| `text-xs` | 0.75 | 12 | 1.6 | Labels, captions |
| `text-sm` | 0.875 | 14 | 1.6 | Secondary UI text |
| `text-base` | 1.0 | 16 | 1.6 | Body copy |
| `text-lg` | 1.125 | 18 | 1.5 | Lead paragraph |
| `text-xl` | 1.25 | 20 | 1.4 | Card headings |
| `text-2xl` | 1.5 | 24 | 1.3 | Section subheadings |
| `text-3xl` | 1.875 | 30 | 1.2 | Section headings |
| `text-4xl` | 2.25 | 36 | 1.2 | Large headings |
| `text-5xl` | 3.0 | 48 | 1.1 | Hero at tablet |
| `text-6xl` | 3.75 | 60 | 1.1 | Hero at desktop |
| `text-7xl` | 4.5 | 72 | 1.1 | Hero at large screens |

Heading line heights: 1.1–1.2. Body line heights: 1.5–1.6. Never mix.

### 5.4 Border Radius

```
--radius-sm: 4px   → rounded-[var(--radius-sm)]  → small chips, tags
--radius:    8px   → rounded-[var(--radius)]      → buttons, cards, inputs (standard)
--radius-lg: 12px  → rounded-[var(--radius-lg)]  → large cards (Services)
--radius-full: 9999px → rounded-[var(--radius-full)] → pills, avatars, progress
```

Always reference via CSS variable. Do not use Tailwind's built-in `rounded-lg` etc. because their pixel values don't match the design tokens.

### 5.5 Shadows

Three levels, one shadow system:

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05)
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
```

Use `shadow-sm` for nav buttons and icon containers. `shadow-md` for CTAs. `shadow-lg` on card hover. Never create custom shadow values.

### 5.6 Animation

```
--duration-fast:   150ms  → hover/focus transitions
--duration-normal: 250ms  → interactive state changes
--duration-slow:   400ms  → max for scroll reveals (never exceed)
```

All GSAP scroll animations are capped at `duration: 0.4` (400ms). Always check `prefers-reduced-motion` — `animations.ts` handles this automatically. Never animate on decoration alone — every animation must be triggered by user action (scroll, hover) and serve orientation.

---

## 6. Page Sections

### Section Order (index.astro)

```
Nav         → fixed top, z-50
Hero        → dark (brand-primary), min-h-screen, parallax bg
Services    → white, 3-col card grid
Trust       → white (continuation), stats + qualifiers
About       → dark (brand-primary), alternates with Trust
Process     → neutral-100, 5-step vertical timeline
CTA         → brand-accent (amber), email + cal.com
Footer      → neutral-950 (deeper dark)
```

### Color alternation logic

```
Dark  → Light → Light → Dark → Light → Amber → Darkest
Nav/Hero → Services → Trust → About → Process → CTA → Footer
```

This creates visual rhythm without random color switching.

### Section background + IDs

| Section | Background | ID |
|---------|------------|----|
| Nav | `bg-brand-primary/95` (95% opacity) | — |
| Hero | `bg-brand-primary` | — (anchor via `#`) |
| Services | `bg-white` | `id="services"` |
| Trust | `bg-white` | `id="trust"` |
| About | `bg-brand-primary` | `id="about"` |
| Process | `bg-neutral-100` | `id="process"` |
| CTA | `bg-brand-accent` | `id="contact"` |
| Footer | `bg-neutral-950` | — |

---

## 7. SVG System

Full specs in `ICONS.md`. Key facts:

### File locations

| Category | Path | Access |
|----------|------|--------|
| Logo variants | `public/svg/logo/` | `/svg/logo/logomark.svg` |
| Service icons | `public/svg/services/` | `/svg/services/launch-hardware.svg` |
| UI icons | `public/svg/ui/` | `/svg/ui/arrow-right.svg` |
| Social icons | `public/svg/social/` | `/svg/social/linkedin.svg` |
| Decorative | `public/svg/decorative/` | `/svg/decorative/hero-parallax.svg` |
| Brand (print) | `public/brand/` | `/brand/logomark.svg` |

### Icon specs at a glance

| Category | ViewBox | Stroke | Color |
|----------|---------|--------|-------|
| Logo | 64×64 | 2.5px | Navy + amber |
| Service icons | 48×48 | 2px | Navy structure + amber accent |
| UI icons | 24×24 | 1.5px | `currentColor` |
| Social icons | 24×24 | filled | `currentColor` |
| Decorative | varies | thin | `currentColor` |

### currentColor requirement

UI and social icons use `currentColor` — they inherit their color from the CSS `color` property of their parent. This means they must be **inline SVGs** or referenced in a context where `color` is set, NOT in an `<img>` tag (`<img>` does not pass CSS color into SVG content).

For service icons that use explicit colors (#0f172a, #f59e0b), `<img>` tags work fine.

---

## 8. GSAP Animation Utilities

All in `src/scripts/animations.ts`. Import and call inside `<script>` blocks within section components.

```ts
import { initParallax, initScrollReveal, initStaggerReveal } from '../../scripts/animations';

document.addEventListener('astro:page-load', () => {
  // Parallax on scroll — scrub true, moves with scroll continuously
  initParallax('.parallax-bg', 0.2);  // speed: 0 = static, 1 = moves at scroll speed

  // Single-element fade-up reveal
  initScrollReveal('.my-element', { distance: 24, duration: 0.4, delay: 0 });

  // Staggered children reveal
  initStaggerReveal('#section-id', '.child-class', { stagger: 0.1, distance: 24 });
});
```

**Key rules:**
- Always wrap in `astro:page-load` (not `DOMContentLoaded`) — Astro View Transitions re-fires this on navigation
- Parent selector in `initStaggerReveal` must be the specific section `#id`, never a generic tag
- All functions no-op silently if `prefers-reduced-motion` is set
- GSAP is loaded client-side only — never import it in Astro frontmatter

---

## 9. GitHub Actions Deployment

```yaml
# .github/workflows/deploy.yml
on: push (branches: [main]) + workflow_dispatch

jobs:
  build:   withastro/action@v5   # auto-detects bun.lock → uses Bun
  deploy:  actions/deploy-pages@v4
```

**Prerequisites (one-time):**
1. GitHub Pages source set to "GitHub Actions" via `gh api`
2. `public/CNAME` contains `makerfirst.ca`
3. Repository has Pages enabled

**Monitoring:**
```bash
gh run list --limit 5
gh run watch <run-id>
```

---

## 10. Claude Code Skills

Located in `.claude/skills/`. Each skill is a `SKILL.md` with frontmatter and prompt body.

| Skill | Trigger | Purpose |
|-------|---------|---------|
| `/new-section` | `user-invocable: true` | Add landing page sections iteratively |
| `/design-review` | `user-invocable: true` | Anti-vibe-coded audit (read-only) |
| `/add-component` | `user-invocable: true` | Reusable UI component creation |
| `/deploy` | `user-invocable: true` | Build verify + git push |
| `/responsive-check` | `user-invocable: true` | Breakpoint audit |
| `/create-svg` | `user-invocable: true` | SVG creation per ICONS.md specs |

Skills inject `PROMPT.md` + `global.css` via `!cat` for every code generation task.

---

## 11. Quality Gate — Issues Found & Fixed

All 25 issues found during the quality audit (post-initial-build) and their resolution:

| # | Severity | Category | Issue | Resolution |
|---|----------|----------|-------|------------|
| 1 | CRITICAL | Assets | `<img src="/src/assets/svg/...">` — 404 in production | Moved SVGs to `public/svg/`, updated all paths |
| 2 | CRITICAL | Assets | 3 service icon paths broken same way | Same fix |
| 3 | CRITICAL | SEO | `public/og-image.png` referenced but missing | Created `public/og-image.svg`, updated BaseLayout default |
| 4 | CRITICAL | GSAP | `initStaggerReveal('section', ...)` fires on wrong section | Added `id="trust"`, changed selector to `'#trust'` |
| 5 | HIGH | Design | 35+ hardcoded `bg-[#hex]`/`text-[#hex]` colors | Replaced with token classes across all components |
| 6 | MEDIUM | Spacing | `gap-5` (20px) — off 8pt grid | Changed to `gap-6` (24px) |
| 7 | MEDIUM | Spacing | `gap-10` (40px) — off 8pt grid | Changed to `gap-8` (32px) |
| 8 | MEDIUM | Spacing | `bottom-10` (40px) — off grid | Changed to `bottom-8` (32px) |
| 9 | LOW | Design | Mixed use of `rounded-[var(--radius-lg)]` vs `rounded-[var(--radius)]` | Intentional — lg for service cards, default for buttons |
| 10 | MEDIUM | a11y | Process heading hierarchy not explicit | h2 → section, h3 → steps. Verified correct |
| 11 | LOW | a11y | Service icon alt text | Correct: `alt=""` + `aria-hidden="true"` for decorative icons |
| 12 | LOW | Responsive | Process connector `left-[22px]` hardcoded | Simplified to single-column timeline, removed absolute connector |
| 13 | LOW | Responsive | Mobile nav text-only vs desktop button CTA | Removed mobile-only text variant, unified to single CTA always visible |
| 14 | PASS | Content | Generic taglines | None found |
| 15 | PASS | Content | Placeholder text | None found |
| 16 | PASS | Content | Copyright format | Correct: `© {year} MakerFirst. All rights reserved.` |
| 17 | PASS | Social | Social links pointing to `#` or 404 | LinkedIn + GitHub only, both valid URLs |
| 18 | PASS | CTA | Cal.com link | Valid URL format, external booking tool |
| 19 | CRITICAL | SEO | `robots.txt` referenced missing sitemap | Removed broken sitemap reference |
| 20 | PASS | SEO | Canonical URL | Correctly generated from `Astro.site` |
| 21 | PASS | SEO | Favicon | `public/favicon.svg` exists and linked |
| 22 | PASS | GSAP | Parallax selector | `.parallax-bg` correct, scoped to Hero |
| 23 | HIGH | GSAP | Trust GSAP selector too broad | Fixed via `id="trust"` (same as #4) |
| 24 | PASS | a11y | Skip link | `href="#main"` + `id="main"` on `<main>` correct |
| 25 | MEDIUM | Design | Hardcoded colors (same category as #5) | Fixed |

---

## 12. Contact & Social Links

Real links only. No placeholder `#` hrefs for social icons ever.

| Platform | URL | Status |
|----------|-----|--------|
| Email | `hello@makerfirst.ca` | Real — used in CTA + Footer |
| LinkedIn | `https://linkedin.com/company/makerfirst` | Active |
| GitHub | `https://github.com/MakerFirst3DP` | Active (this repo's org) |
| Cal.com | `https://cal.com/makerfirst` | Booking link — verify account exists |

Instagram, YouTube, Twitter/X not linked — no confirmed active accounts. Do not add social links without verified accounts per PROMPT.md rules.

---

## 13. Local Development

```bash
# Start dev server (hot reload at localhost:4321)
bun run dev

# Production build → dist/
bun run build

# Verify CNAME preserved after build
cat dist/CNAME  # must output: makerfirst.ca

# Preview production build (no hot reload, exact output)
bun run preview
```

Dev server: `localhost:4321`. Astro default port, not configurable without `--port`.

---

## 14. Future Considerations

Items noted but not yet built:

- **OG image as PNG**: Convert `og-image.svg` to `og-image.png` if platform SVG support proves inconsistent. Twitter/X in particular has historically been inconsistent with SVG OG images.
- **Sitemap**: Install `@astrojs/sitemap` if SEO becomes a priority. Add to `astro.config.mjs` integrations and restore sitemap reference in `robots.txt`.
- **Dark mode**: Not implemented. Would require `@theme {}` dark variants and a Svelte toggle component. Nav and sections already use dark backgrounds — be careful about conflict.
- **Contact form**: Currently `mailto:` link. Real form would need Netlify Forms, Formspree, or a serverless function. Astro static build limits backend options.
- **Mobile hamburger menu**: Nav shows full links on md+ and hides them on mobile (just logo + CTA visible). A proper hamburger menu would require a Svelte component. Touch targets on mobile are adequate with just the CTA button.
- **Testimonials/Case studies**: Not included because PROMPT.md is explicit: no fake testimonials. Add only when real client quotes with attribution are available.
- **Analytics**: Not installed. Add `@astrojs/partytown` for privacy-respecting GA, or self-hosted Plausible/Umami.
- **Node.js 24 in CI**: `actions/checkout@v4` uses Node.js 20 (deprecated June 2026). Update to `@v5` before then.
