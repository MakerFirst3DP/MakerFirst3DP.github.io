# MakerFirst Landing Page

Landing page for [makerfirst.ca](https://makerfirst.ca) — consulting services for Launch Hardware, AI Agents, and Firmware Development.

## Tech Stack

- **Astro 5** — Static-first framework with islands architecture
- **Tailwind CSS 4** — Utility-first CSS with design tokens
- **Svelte 5** — Client-side interactivity (islands only)
- **GSAP** — Scroll-driven animations and parallax
- **Bun** — Runtime and package manager

## Setup

```bash
bun install
bun run dev      # localhost:4321
bun run build    # production build to dist/
bun run preview  # preview production build
```

## Deployment

Automated via GitHub Actions on push to `main`. See `.github/workflows/deploy.yml`.
