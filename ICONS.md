# MakerFirst SVG Design System

Specification for all SVG assets. These SVGs are shared across: landing page, business card, Kickstand poster, pamphlet.

**Brand style**: Maker/craft energy — tools, gears, circuit elements, hands-on creation feel. Wrench+circuit hybrid aesthetic.

**Directory structure**:
- `src/assets/svg/` — Astro-processed SVGs (imported in components)
- `public/brand/` — Raw downloadable brand assets for print

```
src/assets/svg/
├── logo/
│   ├── logomark.svg          # Icon-only mark (gear+wrench+circuit motif)
│   ├── logotype.svg          # "MakerFirst" text in Inter Bold
│   ├── lockup-horizontal.svg # Logomark + logotype side by side
│   └── lockup-stacked.svg    # Logomark above logotype
├── services/
│   ├── launch-hardware.svg   # Rocket/launchpad + circuit board motif
│   ├── ai-agents.svg         # Neural network/node graph + gear
│   └── firmware-dev.svg      # Microchip/processor + wrench
├── ui/
│   ├── arrow-right.svg
│   ├── arrow-down.svg
│   ├── chevron-down.svg
│   ├── menu.svg              # Hamburger
│   ├── close.svg             # X
│   ├── external-link.svg
│   ├── email.svg
│   ├── phone.svg
│   └── location.svg
├── social/
│   ├── linkedin.svg
│   ├── github.svg
│   ├── twitter-x.svg
│   ├── youtube.svg
│   └── instagram.svg
└── decorative/
    ├── hero-parallax.svg     # Abstract circuit/gear pattern for parallax bg
    ├── section-divider.svg   # Subtle wave or angled divider
    └── grid-pattern.svg      # Dot/line grid for subtle backgrounds
public/brand/
├── logomark.svg              # Raw brand files for download/print
├── lockup-horizontal.svg
└── brand-guide-excerpt.svg   # Visual spec sheet
```

---

## 1. Logo System

- **Logomark**: 64x64px base grid, scalable. Gear/wrench/circuit motif
- Must work at: 16px (favicon), 32px (nav), 64px (hero), 256px+ (print)
- **Safe zone**: 12.5% padding on all sides (8px at 64px size)
- **Color variants**:
  - Full color: navy `#0f172a` + amber `#f59e0b`
  - Monochrome dark: `#0f172a`
  - Monochrome light (reversed): `#f8fafc`
  - Single-color: `currentColor`
- **Minimum size**: 16x16px digital, 10mm print
- **Logotype**: "MakerFirst" set in Inter Bold, tracking -0.02em
- **Lockup horizontal**: Logomark left, logotype right, 8px gap (at 64px mark size)
- **Lockup stacked**: Logomark above, logotype below, 4px gap

## 2. Service Icons

Three icons, one per service offering.

- **ViewBox**: 48x48px
- **Stroke weight**: 2px
- **Style**: Line icons with selective fills, matching logomark aesthetic
- Each icon must be recognizable at 24px and detailed at 96px
- **Color**: Brand accent amber `#f59e0b` for key element, neutral stroke `#0f172a` for structure
- **Icons**:
  - `launch-hardware.svg` — Rocket/launchpad + circuit board traces
  - `ai-agents.svg` — Neural network nodes + gear/cog element
  - `firmware-dev.svg` — Microchip/processor + wrench tool

## 3. UI Icons

- **ViewBox**: 24x24px
- **Stroke weight**: 1.5px
- **Line cap**: round
- **Line join**: round
- **Color**: `currentColor` (inherits from CSS)
- **Touch target**: Icon sits within 44x44px hit area (padding handled by CSS)

## 4. Social Icons

- **ViewBox**: 24x24px
- **Style**: Filled (official brand shapes)
- **Color**: `currentColor` (inherits from CSS)
- Use official brand paths where possible

## 5. Decorative Elements

- **Hero parallax** (`hero-parallax.svg`): 1200x800px viewBox, low-opacity circuit/grid pattern. Used as parallax background in hero section.
- **Section divider** (`section-divider.svg`): Full-width, 48px height, angled or subtle wave shape.
- **Grid pattern** (`grid-pattern.svg`): Tileable 100x100px, dot/line grid for CSS `background-image`.

## 6. Print Specifications

For business card, Kickstand poster, and pamphlet:

| Context | Logo lockup width | Service icon size |
|---------|-------------------|-------------------|
| Business card | 30mm | 8mm |
| Kickstand poster | 80mm+ | 20mm |
| Pamphlet | 50mm | 12mm |

Requirements:
- All SVGs must be pure vector (no embedded raster images)
- CMYK-safe colors noted alongside hex:
  - Navy `#0f172a` → C:95 M:80 Y:45 K:60
  - Amber `#f59e0b` → C:0 M:40 Y:95 K:0
  - White `#f8fafc` → C:0 M:0 Y:0 K:0
- Bleed/trim marks not in SVG (handled by print layout software)
- Files in `public/brand/` for raw download

## 7. Design Tokens for SVGs

Consistency with CSS design tokens:

| Token | Value | Use |
|-------|-------|-----|
| Stroke width (small/UI) | 1.5px | UI icons |
| Stroke width (medium/service) | 2px | Service icons |
| Stroke width (large/logo detail) | 2.5px | Logo details |
| Corner radius on strokes | Proportional to `--radius` (8px) | Rounded elements |
| Line cap | `round` | All strokes |
| Line join | `round` | All strokes |
| Fill opacity (subtle accent) | 0.15 | Background fills |
| Fill opacity (solid accent) | 1.0 | Primary fills |
