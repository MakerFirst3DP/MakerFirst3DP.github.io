---
description: "Add a new landing page section (hero, about, services, trust, process, cta, footer)"
user-invocable: true
---

# /new-section

Add a new section to the MakerFirst landing page.

## Context Loading

Before creating the section, read these files for context:

1. `!cat PROMPT.md` — Anti-vibe-coded design system rules
2. `!cat src/styles/global.css` — Design tokens (@theme block)
3. `!cat src/pages/index.astro` — Current page state and existing sections
4. `!cat ICONS.md` — SVG asset specs (if section needs icons)

## Section Types

- **hero** — Minimal first impression with parallax, tagline, CTA
- **about** — Who MakerFirst is, mission, credibility
- **services** — Consulting services grid (Launch Hardware, AI Agents, Firmware Dev)
- **trust** — Client logos, certifications, stats, case study highlights
- **process** — Steps to engage with MakerFirst
- **cta** — Clear call to action (contact/book a call)
- **footer** — Contact info, social links (real ones only), copyright

## Rules

1. **Use only design tokens** from `src/styles/global.css`. No magic numbers for spacing, colors, or typography.
2. **Real MakerFirst content only**. No placeholder "Lorem ipsum" or generic taglines like "Build your dreams."
3. **Semantic HTML**. Use appropriate section, heading hierarchy, landmark roles.
4. **Mobile-first**. Start with mobile layout, layer up with `md:` and `lg:` breakpoints.
5. **Decide .astro vs .svelte**: Use `.astro` by default (zero JS). Only use `.svelte` if the component needs client-side interactivity (tabs, accordions, carousels that actually work).
6. **GSAP animations**: Import from `src/scripts/animations.ts`. Use `initScrollReveal` or `initStaggerReveal` for scroll-triggered animations. Keep durations <= 400ms.
7. **8pt spacing grid**: All margins, padding, and gaps must be multiples of 8 (or 4 for tight spacing).
8. **Consistent border-radius**: Use `rounded-[var(--radius)]` (8px) for all components. Use `--radius-sm` (4px) or `--radius-lg` (12px) only with intention.
9. **No emojis, no sparkles, no purple gradients.**
10. **Social links**: Only include links that actually work. Use `#contact` as CTA href until a real contact form exists.

## Output

1. Create the section component in `src/components/sections/SectionName.astro` (or `.svelte` if interactive)
2. Update `src/pages/index.astro` to import and include the section in the correct order
3. If the section needs new GSAP animations, add initialization in the page's `<script>` tag

## Quality Checklist (verify before finishing)

- [ ] Uses only design tokens (no hardcoded colors, spacing, or font sizes)
- [ ] Semantic HTML with proper heading hierarchy
- [ ] Mobile-first responsive (tested at 320px, 768px, 1024px mentally)
- [ ] Touch targets >= 44x44px for interactive elements
- [ ] No placeholder content
- [ ] Animations respect `prefers-reduced-motion` (handled by animations.ts)
- [ ] Accessible: alt text, ARIA labels, focus states, color contrast
- [ ] Consistent with existing sections' visual language
