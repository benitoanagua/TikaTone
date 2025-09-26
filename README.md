# TikaTone

> **Work in Progress** 🚧 - A modern and minimalist WordPress theme with unique style

TikaTone is a cutting-edge WordPress theme built with modern web technologies, featuring a comprehensive component library powered by Lit Elements and Material Design 3. The theme leverages Tailwind CSS 4 with CSS variables for dynamic theming and provides both light and dark mode support.

## ✨ Key Features

### 🎨 Advanced Theming System

- **Material Design 3** color system with dynamic color generation
- **Light & Dark themes** with seamless switching
- **Tailwind CSS 4** integration with CSS variables
- **Dynamic theme generation** from seed colors
- **7 Material Design variants**: Monochrome, Neutral, Tonal Spot, Vibrant, Expressive, Fidelity, Content

### 🧩 Modern Component Library

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

### 🛠️ Technical Excellence

- **TypeScript** for type safety and better DX
- **Vite** for lightning-fast development
- **Storybook** for component documentation
- **Full Tailwind 4** with `@apply` directive
- **CSS Variables** for dynamic theming
- **ESM modules** for modern bundling

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PHP 8.0+
- WordPress 6.0+

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/benitoanagua/TikaTone.git
   cd TikaTone
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Generate theme files**

   ```bash
   npm run generate:theme
   ```

4. **Development mode**
   ```bash
   npm run dev
   ```

## 🎨 Theme Customization

### Material Design Configuration

Edit `assets/plugins/material-theme/theme-config.ts`:

```typescript
export const themeConfig: ThemeConfig = {
  seedColor: "#ff1d8d", // Your brand color
  contrastLevel: 0, // -1 to 1
  variant: 4, // 0-6 (see variants below)
};
```

### Available Variants

- **0**: MONOCHROME - Grayscale palette
- **1**: NEUTRAL - Subtle, professional tones
- **2**: TONAL_SPOT - Balanced color harmony (default)
- **3**: VIBRANT - Bold, energetic colors
- **4**: EXPRESSIVE - Creative, artistic palette
- **5**: FIDELITY - True-to-source colors
- **6**: CONTENT - Content-optimized colors

### CSS Architecture

The theme uses Tailwind 4's new CSS architecture:

```css
@import "tailwindcss";
@plugin "@iconify/tailwind4";

/* Material Design color system */
@import "./styles/material-theme.css";
@import "./styles/theme.css";

/* Component styles */
@import "./styles/accordion.css";
@import "./styles/card.css";
@import "./styles/carousel.css";
/* ... more components */

@source '../assets/**/*.{ts,css,js}';
@source '../src/**/*.{ts,css,js,php}';
```

## 🧩 Component Usage

### Basic Card Example

```html
<wc-card
  title="Article Title"
  url="/article-slug"
  excerpt="Brief description..."
  feature-image="image.jpg"
  author-name="John Doe"
  published-at="Dec 15, 2024"
  media-align="left"
  aspect-ratio="video"
  auto-layout
></wc-card>
```

### Grid Layout

```html
<wc-grille desktop="3" mobile="1" gap="medium">
  <wc-grille-item>Content 1</wc-grille-item>
  <wc-grille-item>Content 2</wc-grille-item>
  <wc-grille-item>Content 3</wc-grille-item>
</wc-grille>
```

### Theme Toggle

```html
<!-- Automatic theme switching -->
<wc-theme-toggle></wc-theme-toggle>
```

## 📦 Build Process

### Development

```bash
npm run dev          # Start development server
npm run storybook    # Launch component documentation
```

### Production

```bash
npm run build        # Build for production
npm run preview      # Preview production build
```

### Theme Generation

```bash
npm run generate:theme  # Generate Material Design colors
```

The build process generates optimized assets in the `public/` directory:

- `tika-tone-elements.es.js` - Component library
- `tika-tone-elements.css` - All styles with CSS variables

## 🎯 WordPress Integration

TikaTone is designed as a modern WordPress theme with:

- **Block Theme** support (FSE - Full Site Editing)
- **Custom Block Patterns** using web components
- **Dynamic color schemes** that integrate with WordPress customizer
- **RTL language support**
- **Translation ready** with proper text domains

### Theme Structure

```
TikaTone/
├── assets/           # Source files
│   ├── elements/     # Web Components
│   ├── styles/       # CSS files
│   └── plugins/      # Theme utilities
├── public/           # Built assets
├── src/              # PHP templates
└── style.css         # WordPress theme file
```

## 🤝 Contributing

TikaTone is currently in active development. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure all components work in Storybook
5. Submit a pull request

## 📝 License

GPL v2 or later - see [LICENSE](LICENSE) for details.

## 👨‍💻 Author

**Benito Anagua**

- Website: [benitoanagua.me](https://benitoanagua.me/)
- GitHub: [@benitoanagua](https://github.com/benitoanagua)
- Email: benito.anagua@gmail.com

## 🔗 Links

- [Live Demo](#) _(Coming Soon)_
- [Documentation](#) _(Coming Soon)_
- [Component Library](storybook-static/index.html) _(After build)_
- [WordPress.org](#) _(Coming Soon)_

---

**TikaTone** - Where modern web technologies meet WordPress elegance.
