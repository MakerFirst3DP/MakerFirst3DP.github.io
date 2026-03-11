---
description: "Create a reusable UI component following the design system"
user-invocable: true
---

# /add-component

Create a reusable UI component for the MakerFirst site.

## Context Loading

Before creating the component, read:

1. `!cat PROMPT.md` — Design system rules
2. `!cat src/styles/global.css` — Design tokens
3. Check `src/components/` for existing components to ensure consistency

## Decision: .astro vs .svelte

- **Use `.astro`** (default): Static components, no client-side interactivity needed. Zero JS shipped.
- **Use `.svelte`**: Component needs client-side interactivity (click handlers, state changes, dynamic behavior).

## Rules

1. **Typed props**: Define an `interface Props` with all component props (for .astro) or use `$props()` with TypeScript (for .svelte)
2. **Design tokens only**: Use Tailwind classes that map to design tokens. No hardcoded colors, spacing, or font sizes.
3. **All states handled**: Default, hover, focus, active, disabled (where applicable)
4. **Accessible**: ARIA attributes, keyboard navigation, semantic HTML
5. **Consistent**: Same border-radius, shadow, padding logic as other components
6. **No emojis or sparkle icons**

## Component Naming

- PascalCase file names: `Button.astro`, `Card.astro`, `ServiceCard.astro`
- Place in `src/components/` (not in `sections/`)
- Sections go in `src/components/sections/`

## Template

### .astro component
```astro
---
interface Props {
  variant?: 'primary' | 'secondary';
  // ... other props
}

const { variant = 'primary', ...rest } = Astro.props;
---

<element class:list={[/* base classes */, /* variant classes */]} {...rest}>
  <slot />
</element>
```

### .svelte component
```svelte
<script lang="ts">
  let { variant = 'primary', children } = $props<{
    variant?: 'primary' | 'secondary';
    children: any;
  }>();
</script>

<element class={/* classes */}>
  {@render children()}
</element>
```

## Quality Checklist

- [ ] Props are typed
- [ ] Uses only design tokens
- [ ] All interactive states handled
- [ ] Accessible (ARIA, keyboard, focus)
- [ ] Consistent with existing component styles
- [ ] No client-side JS unless needed (.astro preferred)
