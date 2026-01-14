# Implementation Plan

- [x] 1. Update global CSS with spacing utilities





  - Create container utility classes (.container-padding, .container-max-width, .container-wrapper)
  - Create section spacing utilities (.section-padding-y, .section-padding)
  - Create gap utilities (.gap-section, .gap-component, .gap-element)
  - Add comprehensive documentation comments explaining the spacing system
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 3.1, 3.2, 3.3, 3.4, 7.1, 7.2, 7.3_

- [ ] 2. Update Header component with Harvey spacing pattern
  - Apply container-wrapper class to main header container
  - Update horizontal padding to use Harvey pattern (px-7 md:px-8 lg:px-9 xl:px-10)
  - Apply max-width constraint (max-w-[1920px])
  - Update navigation gap spacing to use gap-element utility
  - Ensure button padding follows Harvey pattern (px-7)
  - _Requirements: 5.1, 5.2, 5.5, 1.1, 1.5_

- [ ] 3. Update Footer component with consistent spacing
  - Apply section-padding for vertical spacing
  - Apply container-padding for horizontal spacing
  - Use gap-section for major footer sections
  - Use gap-component for footer columns
  - Ensure alignment with header spacing
  - _Requirements: 5.3, 5.4, 5.5, 1.1, 1.2_

- [ ] 4. Update HeroSection component
  - Apply section-padding class to main section element
  - Apply container-max-width to content wrapper
  - Use gap-section for major content blocks
  - Use gap-component for internal spacing
  - Ensure responsive spacing at all breakpoints
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 2.1, 2.2, 2.3, 2.4_

- [ ] 5. Update MarqueeSection component
  - Apply section-padding-y for vertical spacing
  - Apply container-padding for horizontal spacing
  - Ensure proper spacing with adjacent sections
  - _Requirements: 6.1, 6.5, 1.1, 1.2_

- [ ] 6. Update TextRevealSection component
  - Apply section-padding class
  - Apply container-max-width to content
  - Use gap-component for internal elements
  - _Requirements: 6.1, 6.2, 6.4, 1.1, 1.2_

- [ ] 7. Update LawyersUseSection component
  - Apply section-padding class
  - Apply container-max-width to content wrapper
  - Use gap-section for major blocks
  - Use gap-component for card grids
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 8. Update ImpactSection component
  - Apply section-padding class
  - Apply container-max-width to content
  - Use gap-section for content blocks
  - Ensure grid gap spacing follows system
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 9. Update VisionSection component
  - Apply section-padding class
  - Apply container-max-width to content
  - Use gap-component for internal spacing
  - _Requirements: 6.1, 6.2, 6.4_

- [ ] 10. Update BenefitsSection component
  - Apply section-padding class
  - Apply container-max-width to content wrapper
  - Use gap-section for major blocks
  - Use gap-component for benefit cards
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 11. Update WorkSection component
  - Apply section-padding class
  - Apply container-max-width to content
  - Use gap-section for content blocks
  - _Requirements: 6.1, 6.2, 6.4_

- [ ] 12. Update PricingSection component
  - Apply section-padding class
  - Apply container-max-width to content wrapper
  - Use gap-section for pricing tiers
  - Use gap-component for pricing card internals
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 13. Update TestimonialsCarousel component
  - Apply section-padding class
  - Apply container-max-width to content
  - Use gap-component for carousel items
  - _Requirements: 6.1, 6.2, 6.4_

- [ ] 14. Update FAQSection component
  - Apply section-padding class
  - Apply container-max-width to content wrapper
  - Use gap-component for FAQ items
  - _Requirements: 6.1, 6.2, 6.4_

- [ ] 15. Update typography spacing across all components
  - Apply consistent gap spacing between headings and body text (gap-4 to gap-6)
  - Ensure proper spacing between list items
  - Verify line-height values for readability
  - Update navigation element spacing
  - Update form element and button spacing
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 16. Checkpoint - Verify spacing consistency
  - Ensure all tests pass, ask the user if questions arise.
  - Test all breakpoints (mobile, tablet, desktop, large desktop)
  - Verify no horizontal scroll at any viewport size
  - Check alignment between header, content, and footer
  - Verify spacing scales proportionally across breakpoints
  - _Requirements: 2.5, 5.5, 6.4, 6.5_

- [ ]* 17. Write property-based tests for spacing system
  - **Property 1: Consistent horizontal padding across breakpoints**
  - **Validates: Requirements 1.1, 2.1, 2.2, 2.3, 2.4**

- [ ]* 17.1 Write property test for horizontal padding consistency
  - Generate random viewport widths within each breakpoint range
  - Verify horizontal padding matches Harvey pattern at each breakpoint
  - Test on multiple components (header, sections, footer)
  - Run 100 iterations minimum
  - **Property 1: Consistent horizontal padding across breakpoints**
  - **Validates: Requirements 1.1, 2.1, 2.2, 2.3, 2.4**

- [ ]* 17.2 Write property test for max-width constraint
  - Generate random viewport widths above 1920px
  - Verify content containers never exceed 1920px width
  - Verify containers are centered with mx-auto
  - Run 100 iterations minimum
  - **Property 2: Max-width constraint consistency**
  - **Validates: Requirements 1.5**

- [ ]* 17.3 Write property test for vertical section spacing
  - Generate random viewport widths within each breakpoint range
  - Verify vertical padding follows responsive pattern
  - Test on all major page sections
  - Run 100 iterations minimum
  - **Property 3: Vertical section spacing consistency**
  - **Validates: Requirements 1.2, 6.1**

- [ ]* 17.4 Write property test for gap spacing hierarchy
  - Generate random components with different gap levels
  - Verify gap values correspond to hierarchy (element < component < section)
  - Verify gaps scale responsively across breakpoints
  - Run 100 iterations minimum
  - **Property 4: Gap spacing hierarchy**
  - **Validates: Requirements 1.3, 6.2, 6.3**

- [ ]* 17.5 Write property test for header/footer alignment
  - Generate random viewport widths
  - Verify header horizontal padding matches content padding
  - Verify footer horizontal padding matches content padding
  - Run 100 iterations minimum
  - **Property 5: Header and footer alignment**
  - **Validates: Requirements 5.1, 5.3, 5.5**

- [ ]* 17.6 Write property test for spacing scale adherence
  - Scan all component styles for spacing values
  - Verify all spacing values come from predefined scale
  - Flag any arbitrary spacing values
  - Run 100 iterations minimum
  - **Property 6: Spacing scale adherence**
  - **Validates: Requirements 1.4, 3.1, 7.1**

- [ ]* 18. Write unit tests for CSS utilities
  - Test that utility classes are defined in globals.css
  - Test that Tailwind classes compile correctly
  - Test for conflicting spacing declarations
  - _Requirements: 3.1, 3.2, 7.1_

- [ ] 19. Final checkpoint - Complete testing and documentation
  - Ensure all tests pass, ask the user if questions arise.
  - Run full test suite (unit tests and property tests)
  - Perform visual regression testing at key breakpoints
  - Complete manual testing checklist
  - Update documentation with any deviations or notes
  - _Requirements: All requirements_
