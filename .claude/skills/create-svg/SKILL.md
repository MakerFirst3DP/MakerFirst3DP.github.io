---
description: "Create SVG assets following ICONS.md specs"
user-invocable: true
---

# /create-svg

Create SVG assets following the ICONS.md specification.

## Context Loading

Before creating the SVG, read:

1. `!cat ICONS.md` — Complete SVG specs
2. `!cat src/styles/global.css` — Design tokens for color/sizing consistency

## SVG Categories

### Logo (`src/assets/svg/logo/`)
- **ViewBox**: 64x64px (logomark), variable (logotype/lockups)
- **Stroke**: 2.5px for details
- **Colors**: Navy `#0f172a` + Amber `#f59e0b`
- **Safe zone**: 12.5% padding all sides
- Must work at 16px (favicon) through 256px+ (print)

### Service Icons (`src/assets/svg/services/`)
- **ViewBox**: 48x48px
- **Stroke**: 2px
- **Style**: Line icons with selective fills
- **Colors**: Amber `#f59e0b` for accent, Navy `#0f172a` for structure

### UI Icons (`src/assets/svg/ui/`)
- **ViewBox**: 24x24px
- **Stroke**: 1.5px
- **Line cap/join**: round
- **Color**: `currentColor`

### Social Icons (`src/assets/svg/social/`)
- **ViewBox**: 24x24px
- **Style**: Filled paths
- **Color**: `currentColor`

### Decorative (`src/assets/svg/decorative/`)
- **hero-parallax.svg**: 1200x800px viewBox, low-opacity pattern
- **section-divider.svg**: Full-width, 48px height
- **grid-pattern.svg**: 100x100px, tileable

## Rules

1. Pure vector only — no embedded raster images
2. Use design token colors exclusively
3. Round line caps and joins on all strokes
4. Include XML comments with: dimensions, safe zones, color notes
5. Optimize: remove unnecessary groups, attributes, whitespace
6. Test scalability: must look good from 16px to 256px+
7. For print assets, also save to `public/brand/`

## Output

1. Create the SVG file in the appropriate `src/assets/svg/` subdirectory
2. If it's a brand asset, also copy to `public/brand/`
3. Add CMYK-safe color notes as XML comments

## Quality Checklist

- [ ] Correct viewBox dimensions per category
- [ ] Correct stroke widths per category
- [ ] Uses only brand colors (navy, amber, or currentColor)
- [ ] Round line cap and join
- [ ] No embedded rasters
- [ ] Scalable (looks good at min and max sizes)
- [ ] XML comments with specs
