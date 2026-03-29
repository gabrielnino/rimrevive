# Component Documentation

## Overview

RimRevive uses a component-based architecture with React and Next.js. Components are organized in the `components/` directory and follow a consistent design system with Tailwind CSS and custom CSS-in-JS styles.

## Component Architecture

### Design System

- **Color Palette**: Dark theme with lime green accents (`--lime`, `--carbon`, `--chrome` variables)
- **Typography**: Three font families (`--font-display`, `--font-body`, `--font-mono`)
- **Spacing**: Consistent 4px grid system
- **Animations**: Intersection Observer for scroll-based animations, CSS transitions

### Component Categories

1. **Layout Components**: `Navbar`, `Footer`
2. **Section Components**: `HeroSection`, `ProblemSection`, etc.
3. **Interactive Components**: `QuoteSection` (form)
4. **Content Components**: `FAQSection`, `PremiumSection`

## Component Reference

### Navbar

**File**: `components/Navbar.tsx`

**Description**: Fixed navigation bar with logo, navigation link, and WhatsApp CTA button. Features scroll detection for background opacity change.

**Features**:
- Fixed positioning at top of viewport
- Background blur effect on scroll
- Logo with custom SVG icon
- "Get Quote" anchor link to quote section
- WhatsApp button with icon

**State**:
- `scrolled`: boolean tracking scroll position

**Effects**:
- Adds scroll event listener to update `scrolled` state

**Styling**:
- Uses inline CSS with CSS variables
- Smooth transitions for background and border

**Usage**:
```tsx
import Navbar from '@/components/Navbar'

// Automatically included in page.tsx
```

### HeroSection

**File**: `components/HeroSection.tsx`

**Description**: Hero section with animated headline, subheadline, CTA buttons, and trust indicators.

**Features**:
- Staggered fade-in animation for all elements
- Radial gradient background
- Grid lines background pattern
- Responsive typography with `clamp()`
- Two primary CTA buttons (Get Quote, WhatsApp)
- Trust indicators with icons

**State**: None

**Effects**:
- Uses `useEffect` to trigger staggered animations on mount
- Each element has `data-hero-item` attribute for animation targeting

**Styling**:
- Complex inline styles with CSS variables
- Responsive design with viewport units

**Usage**:
```tsx
import HeroSection from '@/components/HeroSection'
```

### ProblemSection

**File**: `components/ProblemSection.tsx`

**Description**: Emotional problem statement section highlighting the pain points of damaged rims.

**Features**:
- Scroll-triggered reveal animations
- Large emotional headline with price emphasis
- Three emotional cards with icons
- Gradient border effects
- Dark background with subtle borders

**State**: None

**Effects**:
- Uses Intersection Observer to trigger animations when section enters viewport
- CSS classes `.reveal` and `.reveal-delay-*` for animation sequencing

**Data**:
```typescript
const cards = [
  {
    icon: '😤',
    title: 'The Embarrassment',
    body: 'You drive a premium vehicle — but curb rash tells a different story...'
  },
  // ... two more cards
]
```

**Styling**:
- CSS classes for animations defined in `globals.css`
- Gradient border utility class

**Usage**:
```tsx
import ProblemSection from '@/components/ProblemSection'
```

### BeforeAfterSection

**File**: `components/BeforeAfterSection.tsx`

**Description**: Visual before/after comparison showcasing rim repair results.

**Note**: File not reviewed in detail, but expected to contain image comparison functionality.

### HowItWorksSection

**File**: `components/HowItWorksSection.tsx`

**Description**: Step-by-step explanation of the rim repair process.

**Note**: File not reviewed in detail.

### PremiumSection

**File**: `components/PremiumSection.tsx`

**Description**: Showcase of premium services and value proposition.

**Note**: File not reviewed in detail.

### FAQSection

**File**: `components/FAQSection.tsx`

**Description**: Frequently asked questions with expandable/collapsible answers.

**Note**: File not reviewed in detail.

### QuoteSection

**File**: `components/QuoteSection.tsx`

**Description**: Multi-step quote request form with photo upload and API integration.

**Features**:
- Multi-step form with numbered sections
- Drag-and-drop photo upload
- Form validation and submission
- Success state display
- Integration with `/api/submit-quote` endpoint
- Scroll-triggered animations

**State**:
- `submitted`: boolean tracking form submission status
- `dragging`: boolean for drag-and-drop UI feedback
- `files`: array of uploaded file names

**Effects**:
- Intersection Observer for scroll animations
- Event handlers for form interactions

**Form Sections**:
1. **Contact Information**: Name, phone, email
2. **Vehicle Details**: Make, model, year
3. **Damage Details**: Rim position, damage type
4. **Upload Photos**: Drag-and-drop interface
5. **Location & Preferences**: Zone, notes

**Form Submission**:
- Collects form data via `FormData`
- Sends POST request to `/api/submit-quote`
- Handles success/error responses
- Updates UI state accordingly

**Styling**:
- Consistent input styles with focus states
- Section headers with numbered indicators
- Drag-and-drop zone with visual feedback

**Usage**:
```tsx
import QuoteSection from '@/components/QuoteSection'
```

### Footer

**File**: `components/Footer.tsx`

**Description**: Site footer with contact information, links, and copyright.

**Note**: File not reviewed in detail.

## Styling System

### CSS Variables

Defined in `app/globals.css`:
- `--lime`: #a8e63d (primary accent)
- `--carbon-1` to `--carbon-4`: Dark theme shades
- `--chrome`, `--chrome-dim`: Text colors
- `--font-display`, `--font-body`, `--font-mono`: Font families

### Utility Classes

**Badges**:
```css
.badge           /* Default badge style */
.badge-lime      /* Lime-colored badge */
```

**Buttons**:
```css
.btn-primary     /* Primary button (lime background) */
.btn-secondary   /* Secondary button (outline) */
```

**Animations**:
```css
.reveal          /* Base reveal animation */
.reveal-delay-1  /* Delay modifier */
.reveal-delay-2  /* ... */
.reveal-delay-3  /* ... */
```

**Borders**:
```css
.gradient-border /* Gradient border effect */
```

### Inline Styles vs CSS Classes

- **Inline Styles**: Used for dynamic properties (animations, scroll effects)
- **CSS Classes**: Used for reusable utility classes and static styles

## Animation Patterns

### Scroll-triggered Animations

Components use Intersection Observer to trigger animations:
```tsx
useEffect(() => {
  const observer = new IntersectionObserver(callback, { threshold: 0.2 })
  observer.observe(ref.current)
  return () => observer.disconnect()
}, [])
```

### Staggered Animations

Hero section uses staggered animation timing:
```tsx
items.forEach((item, i) => {
  setTimeout(() => {
    item.style.opacity = '1'
    item.style.transform = 'translateY(0)'
  }, 200 + i * 150)
})
```

### CSS Transitions

Smooth transitions for interactive elements:
```css
transition: opacity 0.8s ease, transform 0.8s ease
```

## Form Handling

### Quote Form Architecture

**Input Management**:
- Controlled components for complex interactions (file upload)
- Uncontrolled components for simple inputs (name, email)
- Consistent styling with `inputStyle` and `labelStyle` objects

**Validation**:
- Required fields: `name`, `phone`
- HTML5 form validation
- API-level validation on submission

**File Upload**:
- Drag-and-drop interface
- Limits: 4 files maximum
- Simulated upload (files stored in state, not actually uploaded)

**Submission Flow**:
1. Form data collection
2. API request to `/api/submit-quote`
3. Success/error handling
4. UI state update

## Responsive Design

### Mobile-First Approach
- All components designed for mobile first
- `clamp()` for responsive typography
- Flexbox and Grid for layout
- Breakpoint-free design where possible

### Responsive Techniques
- Viewport units (`10vw`, `5vw`)
- `clamp(min, preferred, max)` for fluid typography
- `grid-template-columns: repeat(auto-fit, minmax(...))`
- Flexbox wrapping

## Accessibility Considerations

### Semantic HTML
- Proper heading hierarchy (`h1`, `h2`, `h3`)
- Semantic section elements
- ARIA labels where needed

### Keyboard Navigation
- All interactive elements keyboard accessible
- Focus states for form inputs
- Logical tab order

### Color Contrast
- High contrast text colors
- Lime accent meets contrast guidelines
- Dark theme reduces eye strain

## Performance Optimizations

### Code Splitting
- Next.js automatic code splitting
- Component-level lazy loading possible

### Image Optimization
- Next.js Image component for optimized images
- SVG icons for scalability

### Animation Performance
- CSS transforms and opacity for GPU acceleration
- Debounced scroll handlers
- Intersection Observer for efficient scroll tracking

## Component Testing

### Testing Strategy
Components can be tested with:
- React Testing Library for interaction testing
- Jest for unit tests
- Cypress for end-to-end testing

### Key Test Cases
1. Form submission flow
2. Scroll animations
3. Responsive behavior
4. Accessibility compliance

## Customization Guide

### Adding New Components
1. Create new `.tsx` file in `components/` directory
2. Follow existing patterns for styling and structure
3. Add to `page.tsx` if needed
4. Update documentation

### Modifying Styles
1. Update CSS variables in `globals.css` for theme changes
2. Modify utility classes for reusable styles
3. Update component inline styles for specific changes

### Adding Animations
1. Use existing `.reveal` pattern for scroll animations
2. Add CSS transitions for interactive elements
3. Consider performance implications

## Common Patterns

### Section Component Template
```tsx
'use client'
import { useEffect, useRef } from 'react'

export default function NewSection() {
  const ref = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Animation logic
  }, [])
  
  return (
    <section ref={ref} style={/* styles */}>
      {/* Content */}
    </section>
  )
}
```

### Form Input Template
```tsx
const inputStyle: React.CSSProperties = {
  /* common input styles */
}

<label style={labelStyle}>Label</label>
<input 
  type="text" 
  style={inputStyle}
  onFocus={handleFocus}
  onBlur={handleBlur}
/>
```

## Troubleshooting

### Common Issues

**Animations not triggering**:
- Check Intersection Observer threshold
- Verify `.reveal` class is applied
- Check CSS animation definitions

**Form submission failing**:
- Check API endpoint availability
- Verify required fields are filled
- Check browser console for errors

**Styling inconsistencies**:
- Verify CSS variables are defined
- Check for conflicting inline styles
- Ensure proper CSS specificity

### Debugging Tips
1. Use browser DevTools for style inspection
2. Check React DevTools for component state
3. Monitor network requests for API calls
4. Test on multiple viewport sizes

## Future Improvements

### Planned Enhancements
1. **Component Library**: Extract reusable components to shared library
2. **Storybook**: Add component documentation and testing
3. **Theming**: Support light/dark mode toggle
4. **Internationalization**: Multi-language support

### Performance Optimizations
1. **Lazy Loading**: Implement React.lazy for component splitting
2. **Image Optimization**: Further optimize image delivery
3. **Bundle Analysis**: Reduce JavaScript bundle size

---

*Last Updated: March 29, 2026*