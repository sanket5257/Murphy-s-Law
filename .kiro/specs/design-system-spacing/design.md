# Design Document: Design System Spacing Implementation

## Overview

This design document outlines the implementation strategy for applying Harvey.ai's spacing and sizing patterns to the Murphys Law AI website. The design focuses on creating a consistent, professional spacing system that scales responsively across all breakpoints while maintaining the existing visual identity.

The implementation will update the global CSS, create reusable utility classes, and systematically apply spacing patterns to all components following the Harvey pattern: `px-7 md:px-8 lg:px-9 xl:px-10` for horizontal spacing and proportional vertical spacing.

## Architecture

### Spacing System Hierarchy

```
Global Styles (globals.css)
├── Base Spacing Scale (Tailwind config)
├── Container Utilities
│   ├── .container-padding (horizontal)
│   └── .section-padding (vertical)
├── Component-Level Spacing
│   ├── Header
│   ├── Footer
│   ├── Page Sections
│   └── Individual Components
└── Element-Level Spacing
    ├── Typography gaps
    ├── Button padding
    └── Form element spacing
```

### Responsive Breakpoint Strategy

Following Tailwind's default breakpoints:
- **Base (mobile)**: < 768px → px-7, py-12, gap-4
- **md (tablet)**: ≥ 768px → px-8, py-16, gap-6
- **lg (desktop)**: ≥ 1024px → px-9, py-20, gap-8
- **xl (large desktop)**: ≥ 1280px → px-10, py-24, gap-10
- **2xl (extra large)**: ≥ 1536px → maintains xl values

## Components and Interfaces

### 1. Global CSS Utilities

**Location**: `app/globals.css`

**New Utility Classes**:

```css
/* Container utilities */
.container-padding {
  @apply px-7 md:px-8 lg:px-9 xl:px-10;
}

.container-max-width {
  @apply max-w-[1920px] mx-auto;
}

.container-wrapper {
  @apply container-padding container-max-width;
}

/* Section spacing utilities */
.section-padding-y {
  @apply py-12 md:py-16 lg:py-20 xl:py-24;
}

.section-padding {
  @apply section-padding-y container-padding;
}

/* Gap utilities for consistent spacing */
.gap-section {
  @apply gap-8 md:gap-12 lg:gap-16;
}

.gap-component {
  @apply gap-4 md:gap-6 lg:gap-8;
}

.gap-element {
  @apply gap-2 md:gap-3 lg:gap-4;
}
```

### 2. Header Component Updates

**File**: `components/Header.tsx`

**Changes**:
- Apply `container-wrapper` to main header container
- Use consistent height with CSS custom property
- Apply Harvey padding pattern to navigation elements
- Ensure max-width constraint of 1920px

**Key Classes**:
- Main container: `container-wrapper h-[var(--header-height)]`
- Navigation items: `gap-element`
- Button spacing: `px-7` (consistent with Harvey)

### 3. Footer Component Updates

**File**: `components/Footer.tsx`

**Changes**:
- Apply `section-padding` for vertical spacing
- Apply `container-padding` for horizontal spacing
- Use `gap-section` for major footer sections
- Use `gap-component` for footer columns

### 4. Page Section Components

**Affected Components**:
- HeroSection
- LawyersUseSection
- ImpactSection
- VisionSection
- BenefitsSection
- WorkSection
- PricingSection
- TestimonialsCarousel
- FAQSection
- MarqueeSection
- TextRevealSection

**Standard Section Structure**:
```tsx
<section className="section-padding">
  <div className="container-max-width">
    <div className="flex flex-col gap-section">
      {/* Section content */}
    </div>
  </div>
</section>
```

## Data Models

### Spacing Scale Configuration

```typescript
// Spacing values following Harvey pattern
interface SpacingScale {
  horizontal: {
    mobile: '1.75rem',    // px-7 (28px)
    tablet: '2rem',       // px-8 (32px)
    desktop: '2.25rem',   // px-9 (36px)
    large: '2.5rem'       // px-10 (40px)
  },
  vertical: {
    mobile: '3rem',       // py-12 (48px)
    tablet: '4rem',       // py-16 (64px)
    desktop: '5rem',      // py-20 (80px)
    large: '6rem'         // py-24 (96px)
  },
  gaps: {
    element: ['0.5rem', '0.75rem', '1rem'],      // gap-2, gap-3, gap-4
    component: ['1rem', '1.5rem', '2rem'],       // gap-4, gap-6, gap-8
    section: ['2rem', '3rem', '4rem']            // gap-8, gap-12, gap-16
  },
  maxWidth: '1920px'
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Consistent horizontal padding across breakpoints

*For any* page component or section, the horizontal padding should follow the Harvey pattern (px-7 md:px-8 lg:px-9 xl:px-10) at all breakpoints.

**Validates: Requirements 1.1, 2.1, 2.2, 2.3, 2.4**

### Property 2: Max-width constraint consistency

*For any* container element, when the max-width utility is applied, it should be set to 1920px and centered with mx-auto.

**Validates: Requirements 1.5**

### Property 3: Vertical section spacing consistency

*For any* major page section, the vertical padding should follow the responsive pattern (py-12 md:py-16 lg:py-20 xl:py-24).

**Validates: Requirements 1.2, 6.1**

### Property 4: Gap spacing hierarchy

*For any* component using gap utilities, the gap value should correspond to its hierarchy level (element < component < section) and scale responsively.

**Validates: Requirements 1.3, 6.2, 6.3**

### Property 5: Header and footer alignment

*For any* page, the horizontal padding of the header and footer should match the horizontal padding of the page content sections.

**Validates: Requirements 5.1, 5.3, 5.5**

### Property 6: Spacing scale adherence

*For any* spacing value used in the system, it should come from the predefined spacing scale and not use arbitrary values.

**Validates: Requirements 1.4, 3.1, 7.1**

## Error Handling

### Missing Utility Classes

**Issue**: Component attempts to use spacing utility that doesn't exist
**Solution**: Provide fallback to base Tailwind classes and log warning in development

### Breakpoint Inconsistencies

**Issue**: Spacing doesn't scale properly at certain breakpoints
**Solution**: Use Tailwind's responsive modifiers consistently and test at all breakpoints

### Content Overflow

**Issue**: Content exceeds max-width or causes horizontal scroll
**Solution**: Apply `overflow-x-hidden` at root level and ensure all containers respect max-width

### Legacy Spacing Conflicts

**Issue**: Existing component spacing conflicts with new system
**Solution**: Systematically replace old spacing with new utilities, component by component

## Testing Strategy

### Unit Testing

Unit tests will verify:
- CSS utility classes are properly defined in globals.css
- Tailwind classes compile correctly
- No conflicting spacing declarations exist

### Property-Based Testing

We will use **Playwright** for property-based testing of the spacing system.

Property-based tests will:
- Generate random viewport sizes within each breakpoint range
- Verify spacing values match expected patterns at each breakpoint
- Test that spacing scales proportionally across breakpoints
- Verify max-width constraints are respected
- Ensure no horizontal overflow occurs at any viewport size

Each property-based test will run a minimum of 100 iterations to ensure comprehensive coverage across different viewport sizes and component combinations.

### Visual Regression Testing

- Capture screenshots at key breakpoints (375px, 768px, 1024px, 1280px, 1920px)
- Compare spacing consistency across components
- Verify alignment and spacing relationships

### Manual Testing Checklist

- [ ] Test all breakpoints in browser dev tools
- [ ] Verify spacing on actual devices (mobile, tablet, desktop)
- [ ] Check spacing consistency across all page sections
- [ ] Verify header and footer alignment with content
- [ ] Test edge cases (very long content, very short content)
- [ ] Verify no horizontal scroll at any breakpoint

## Implementation Notes

### Order of Implementation

1. **Phase 1**: Update global CSS with utility classes
2. **Phase 2**: Update Header and Footer components
3. **Phase 3**: Update page section components (one at a time)
4. **Phase 4**: Update individual UI components
5. **Phase 5**: Testing and refinement

### Migration Strategy

- Update components incrementally to avoid breaking changes
- Test each component after updating
- Maintain backward compatibility during transition
- Document any deviations from the Harvey pattern with justification

### Performance Considerations

- Utility classes are compiled at build time (no runtime cost)
- CSS custom properties provide minimal overhead
- Responsive classes use media queries efficiently
- No JavaScript required for spacing calculations

### Browser Compatibility

- Tailwind CSS supports all modern browsers
- CSS custom properties supported in all target browsers
- Responsive utilities use standard media queries
- No polyfills required

## Future Enhancements

1. **Dynamic Spacing**: Add support for user-adjustable spacing preferences
2. **Component Library**: Create a Storybook with spacing examples
3. **Spacing Linter**: Add ESLint rules to enforce spacing patterns
4. **Design Tokens**: Export spacing values as design tokens for design tools
5. **Animation**: Add smooth transitions when spacing changes at breakpoints
