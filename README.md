# TikaTone

> **Modern WordPress Theme with Lit Components & Material Design 3**

TikaTone is a cutting-edge WordPress theme built with modern web technologies, featuring a comprehensive component library powered by Lit Elements and Material Design 3. The theme leverages Tailwind CSS 4 with CSS variables for dynamic theming and provides both light and dark mode support.

## Storybook Component Library

### Live Demo

**Storybook Component Library:** [https://tikatone.netlify.app/](https://tikatone.netlify.app/)

Explore all components with interactive controls and comprehensive documentation.

### Storybook Features

- **Interactive Controls** - Adjust props in real-time
- **Multiple Variants** - See all component states
- **Accessibility Audit** - Built-in a11y testing
- **Responsive Testing** - Mobile and desktop views
- **Material Design 3** - Integrated theming system

### Storybook Commands

```bash
pnpm storybook              # Development server on port 6006
pnpm build-storybook        # Build static Storybook site
pnpm capture:video          # Record component interactions
pnpm capture:screenshots    # Take component screenshots
pnpm capture:demo           # Quick demo video
```

## Quick Start

### Prerequisites

- Node.js 20+
- PHP 8.0+ (for WordPress)
- WordPress 6.0+

### Installation

```bash
git clone https://github.com/benitoanagua/TikaTone.git
cd TikaTone
pnpm install
pnpm generate:theme
pnpm build                  # Build components for WordPress
pnpm storybook
```

## Development Workflow

### Component Development

```bash
# Start development servers
pnpm storybook              # Component documentation & development
pnpm dev                    # Theme development server

# Build for production
pnpm build                  # Build theme assets
pnpm build-storybook        # Build Storybook documentation

# Code quality
pnpm lint                   # ESLint + Prettier
pnpm type-check             # TypeScript validation
```

## Key Features

### Advanced Theming System

- **Material Design 3** color system with dynamic color generation
- **Light & Dark themes** with seamless switching
- **Tailwind CSS 4** integration with CSS variables
- **7 Material Design variants**: Monochrome, Neutral, Tonal Spot, Vibrant, Expressive, Fidelity, Content

### Modern Component Library

Built with **Lit Elements** for maximum performance and compatibility:

#### Core Components

- **`<wc-card>`** - Sophisticated content cards with multiple layouts
- **`<wc-overlay>`** - Image overlays with advanced positioning
- **`<wc-grille>`** - Responsive grid system with dynamic borders
- **`<wc-stack>`** - 3D stacking component with animations

#### Navigation & UI

- **`<wc-navbar>`** - Sticky navigation with glass morphism
- **`<wc-offcanvas>`** - Slide-out navigation panel
- **`<wc-theme-toggle>`** - Theme switcher
- **`<wc-accordion>`** - Collapsible content sections

#### Media & Content

- **`<wc-carousel>`** - Touch-enabled content slider
- **`<wc-slideshow>`** - Full-featured image slideshow
- **`<wc-tabs>`** - Accessible tabbed interfaces

## WordPress Integration

### Automatic Asset Loading

Components are automatically loaded in WordPress via ES modules:

```php
// Components are loaded as ES modules in wp_head
<script type="module">
import("/public/tika-tone-elements.es.js")
.then(() => console.log("TikaTone Elements loaded"))
</script>
```

### Build Output

The Vite build process generates WordPress-ready assets in `/public`:

- `tika-tone-elements.es.js` - ES module components
- `tika-tone-elements.css` - Component styles with Tailwind

### Asset Enqueueing

The theme automatically handles CSS and module loading:

```php
// Enqueues component styles
wp_enqueue_style('tika-tone-components',
    TIKA_TONE_THEME_URL . '/public/tika-tone-elements.css');
```

## Component Usage Examples

### Card Component

```html
<wc-card
  title="Modern Web Components"
  excerpt="Building modern websites with Lit Elements and Material Design 3"
  feature-image="/images/hero.jpg"
  author-name="Benito Anagua"
  published-at="Dec 15, 2024"
  media-align="left"
  aspect-ratio="video"
  auto-layout
></wc-card>
```

### Grid System

```html
<wc-grille desktop="3" mobile="1" gap="medium">
  <wc-grille-item>
    <div class="p-4">Responsive Grid Item 1</div>
  </wc-grille-item>
  <wc-grille-item>
    <div class="p-4">Responsive Grid Item 2</div>
  </wc-grille-item>
</wc-grille>
```

### Navigation with Theme Toggle

```html
<wc-navbar>
  <wc-logo slot="logo" class="h-8 fill-primary"></wc-logo>
  <nav slot="navigation" class="flex gap-4">
    <a href="/" class="text-onSurface hover:text-primary">Home</a>
    <a href="/about" class="text-onSurface hover:text-primary">About</a>
  </nav>
  <div slot="actions">
    <wc-theme-toggle></wc-theme-toggle>
  </div>
</wc-navbar>
```

## Theme Customization

### Material Design Configuration

Edit `assets/plugins/material-theme/theme-config.ts`:

```typescript
export const themeConfig: ThemeConfig = {
  seedColor: "#0c658e", // Your brand color
  contrastLevel: 0, // -1 to 1
  variant: 2, // 0-6 (Tonal Spot)
};
```

### Available Color Variants

- **0**: MONOCHROME - Grayscale palette
- **1**: NEUTRAL - Subtle, professional tones
- **2**: TONAL_SPOT - Balanced color harmony (default)
- **3**: VIBRANT - Bold, energetic colors
- **4**: EXPRESSIVE - Creative, artistic palette
- **5**: FIDELITY - True-to-source colors
- **6**: CONTENT - Content-optimized colors

## Contributing

TikaTone welcomes contributions! Here's how to get started:

1. **Fork the repository**
2. **Set up development environment**
   ```bash
   git clone your-fork-url
   cd TikaTone
   pnpm install
   pnpm generate:theme
   pnpm build
   ```
3. **Start development server**
   ```bash
   pnpm storybook    # Component development
   ```
4. **Make your changes and test**
   ```bash
   pnpm lint         # Code quality
   pnpm type-check   # TypeScript validation
   ```
5. **Submit a pull request**

## Links

- **Live Demo:** [https://tikatone.netlify.app/](https://tikatone.netlify.app/)
- **GitHub Repository:** [https://github.com/benitoanagua/TikaTone](https://github.com/benitoanagua/TikaTone)
- **Issue Tracker:** [GitHub Issues](https://github.com/benitoanagua/TikaTone/issues)

---

**TikaTone** - Where modern web technologies meet WordPress elegance. Built with Lit Elements, Material Design 3, and a passion for beautiful user interfaces.
