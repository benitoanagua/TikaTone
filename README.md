# TikaTone

> **Modern WordPress Theme with Lit Components & Material Design 3**

TikaTone is a cutting-edge WordPress theme built with modern web technologies, featuring a comprehensive component library powered by Lit Elements and Material Design 3. The theme leverages Tailwind CSS 4 with CSS variables for dynamic theming and provides both light and dark mode support.

## Live Demo

**Storybook Component Library:** [https://tikatone.netlify.app/](https://tikatone.netlify.app/)

Explore all components with interactive controls and comprehensive documentation.

## Key Features

### Advanced Theming System

- **Material Design 3** color system with dynamic color generation
- **Light & Dark themes** with seamless switching
- **Tailwind CSS 4** integration with CSS variables
- **Dynamic theme generation** from seed colors
- **7 Material Design variants**: Monochrome, Neutral, Tonal Spot, Vibrant, Expressive, Fidelity, Content

### Modern Component Library

Built with **Lit Elements** for maximum performance and compatibility:

#### Featured Components

- **`<wc-card>`** - Sophisticated content cards with multiple layouts
- **`<wc-overlay>`** - Image overlays with advanced positioning
- **`<wc-grille>`** - Responsive grid system with dynamic borders
- **`<wc-stack>`** - 3D stacking component with Vue-like animations

#### Navigation & UI

- **`<wc-navbar>`** - Sticky navigation with glass morphism effects
- **`<wc-offcanvas>`** - Slide-out navigation panel
- **`<wc-theme-toggle>`** - Theme switcher with visual indicators
- **`<wc-accordion>`** - Collapsible content sections

#### Media & Content

- **`<wc-carousel>`** - Touch-enabled content slider
- **`<wc-slideshow>`** - Full-featured image slideshow
- **`<wc-tabs>`** - Accessible tabbed interfaces
- **`<wc-logo>`** - Scalable SVG logo component

### Technical Excellence

- **TypeScript** for type safety and better DX
- **Vite** for lightning-fast development
- **Storybook** for component documentation
- **Full Tailwind 4** with `@apply` directive
- **CSS Variables** for dynamic theming
- **ESM modules** for modern bundling
- **Playwright** for comprehensive testing

## Quick Start

### Prerequisites

- Node.js 20+
- PHP 8.0+ (for WordPress)
- WordPress 6.0+

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/benitoanagua/TikaTone.git
   cd TikaTone
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Generate theme files**

   ```bash
   pnpm generate:theme
   ```

4. **Development mode**
   ```bash
   pnpm dev              # Development server
   pnpm storybook        # Component documentation
   ```

## Component Demo & Development

### Explore Components

Visit the [Storybook Demo](https://tikatone.netlify.app/) to interact with all components:

- **Interactive Controls** - Adjust props in real-time
- **Multiple Variants** - See all component states
- **Accessibility Audit** - Built-in a11y testing
- **Responsive Testing** - Mobile and desktop views

### Development Workflow

```bash
# Start development servers
pnpm dev                    # Vite dev server
pnpm storybook              # Storybook on port 6006

# Build for production
pnpm build                  # Build theme assets
pnpm build-storybook        # Build Storybook

# Testing
pnpm test                   # Run Playwright tests
pnpm test:dev               # Run tests in headed mode

# Code quality
pnpm lint                   # ESLint + Prettier
pnpm type-check             # TypeScript validation
```

### Component Testing & Capture

```bash
# Generate component videos and screenshots
pnpm capture:video          # Record component interactions
pnpm capture:screenshots    # Take component screenshots
pnpm capture:demo           # Quick demo video

# Interactive capture mode
pnpm capture:interactive    # Guided capture process
```

## 🧩 Component Usage Examples

### Card Component

```html
<wc-card
  title="Modern Web Components"
  url="/article-slug"
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
  <wc-grille-item>
    <div class="p-4">Responsive Grid Item 3</div>
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

## Build & Deployment

### Production Build

```bash
# Build everything
pnpm build                # Theme assets
pnpm build-storybook      # Documentation

# Output directories
# - dist/                 # Production theme assets
# - storybook-static/     # Static Storybook site
```

### Netlify Deployment

The project includes `netlify.toml` for automatic deployment:

```toml
[build]
  publish = "storybook-static"
  command = "pnpm build-storybook"

[build.environment]
  NODE_VERSION = "20"
```

## Project Architecture

```
TikaTone/
├── assets/
│   ├── elements/           # Lit Web Components
│   ├── styles/            # Tailwind + Component CSS
│   ├── stories/           # Storybook stories
│   ├── plugins/           # Build tools & utilities
│   └── types/             # TypeScript definitions
├── tests/
│   ├── components/        # Component tests
│   ├── integration/       # Integration tests
│   └── utils/             # Test utilities
├── public/                # Built assets
├── storybook-static/      # Storybook build
└── netlify.toml          # Deployment configuration
```

## Contributing

TikaTone welcomes contributions! Here's how to get started:

1. **Fork the repository**
2. **Set up development environment**
   ```bash
   git clone your-fork-url
   cd TikaTone
   pnpm install
   pnpm generate:theme
   ```
3. **Start development servers**
   ```bash
   pnpm storybook    # Component development
   pnpm dev          # Theme development
   ```
4. **Make your changes and test**
   ```bash
   pnpm test         # Run tests
   pnpm lint         # Code quality
   ```
5. **Submit a pull request**

### Contribution Guidelines

- Follow TypeScript best practices
- Ensure all components work in Storybook
- Include comprehensive tests
- Update documentation as needed
- Follow the existing code style

## License

GPL v2 or later - see [LICENSE](LICENSE) for details.

## Author

**Benito Anagua**

- Website: [benitoanagua.me](https://benitoanagua.me/)
- GitHub: [@benitoanagua](https://github.com/benitoanagua)
- Email: benito.anagua@gmail.com

## Links

- **Live Demo:** [https://tikatone.netlify.app/](https://tikatone.netlify.app/)
- **GitHub Repository:** [https://github.com/benitoanagua/TikaTone](https://github.com/benitoanagua/TikaTone)
- **Issue Tracker:** [GitHub Issues](https://github.com/benitoanagua/TikaTone/issues)

---

**TikaTone** - Where modern web technologies meet WordPress elegance. Built with Lit Elements, Material Design 3, and a passion for beautiful user interfaces.
