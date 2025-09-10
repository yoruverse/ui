# Yoruverse UI

A modern UI component library built with Astro and React, providing reusable components with comprehensive documentation and theming support.

## Features

- **Modern Stack**: Built with Astro 5, React 19, and TypeScript
- **Custom Design System**: Integrated with Yoruverse design tokens via TailwindCSS
- **Component Documentation**: Interactive examples with MDX-powered docs
- **Type Safe**: Full TypeScript support with strict configuration
- **Developer Experience**: BiomeJS for consistent formatting and linting

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **Framework**: [Astro](https://astro.build/) with React integration
- **Styling**: [TailwindCSS 4](https://tailwindcss.com/) + Yoruverse theme
- **Type Safety**: [TypeScript](https://typescriptlang.org/) with strict mode
- **Content**: [MDX](https://mdxjs.com/) for component documentation
- **Code Quality**: [BiomeJS](https://biomejs.dev/) for formatting and linting
- **Fonts**: Geist and Geist Mono variable fonts

## Project Structure

```
src/
├── components/
│   ├── ui/              # Core UI components
│   │   └── button.tsx   # Button component
│   ├── shared/          # Shared utility components
│   └── layouts/         # Page and content layouts
├── data/
│   └── components/      # Component documentation (MDX)
├── pages/
│   ├── index.astro      # Homepage with examples
│   └── docs/            # Documentation pages
├── lib/
│   └── cn.ts           # Class name utility
└── styles/
    └── global.css      # Global styles
```

## Components

### Button

A versatile button component with multiple variants and accessibility support.

```tsx
import { Button } from "@/components/ui/button";

// Primary button (default)
<Button>Click me</Button>

// Secondary variant
<Button variant="secondary">Secondary</Button>

// Icon button
<Button isIcon>
  <Icon />
</Button>
```

## Development

### Code Style

This project uses BiomeJS for consistent code formatting:
- Tab indentation
- Double quotes for strings
- Automatic import organization

```bash
# Format code
npx biome format --write .

# Lint code
npx biome lint --fix .
```

### Path Aliases

The project uses TypeScript path aliases for cleaner imports:
- `@/*` → `src/*`

### Content Collections

Component documentation is managed through Astro's content collections. MDX files in `src/data/components/` are automatically loaded and made available at `/docs/components/[id]`.

## Contributing

1. Follow the existing code style (enforced by BiomeJS)
2. Add documentation for new components in `src/data/components/`
3. Use the `cn()` utility for conditional class names
4. Ensure TypeScript strict mode compliance

## License

Part of the Yoruverse ecosystem.