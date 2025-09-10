# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a UI component library built with Astro and React, using TailwindCSS for styling and TypeScript for type safety. It's part of the Yoruverse ecosystem and provides reusable UI components with documentation.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
astro build

# Preview production build
npm run preview

# Format and lint code (BiomeJS)
npx biome format --write .
npx biome lint --fix .
```

## Architecture

### Technology Stack
- **Framework**: Astro 5 with React integration
- **Styling**: TailwindCSS 4 with custom Yoruverse theme (`@yoruverse-js/tailwindcss`)
- **Type Safety**: TypeScript with strict configuration
- **Content**: MDX for component documentation
- **Code Quality**: BiomeJS for formatting and linting

### Directory Structure
```
src/
├── components/
│   ├── ui/           # Core UI components (Button, etc.)
│   ├── shared/       # Shared utility components (ComponentSnippet)
│   └── layouts/      # Page and content layouts
├── pages/
│   ├── index.astro   # Homepage with component examples
│   └── docs/         # Dynamic documentation pages
├── data/
│   └── components/   # MDX documentation files
├── lib/              # Utilities (cn helper for class merging)
└── styles/           # Global CSS
```

### Component Architecture
- **UI Components**: React components in `src/components/ui/` with TypeScript props
- **Documentation**: MDX files in `src/data/components/` with frontmatter schema
- **Styling**: Uses `cn()` utility (clsx + tailwind-merge) for conditional classes
- **Theming**: Leverages Yoruverse design tokens through TailwindCSS plugin

### Content Management
- Content collections defined in `src/content.config.ts`
- Component docs automatically loaded from `src/data/components/` via Astro's glob loader
- Dynamic routing at `/docs/components/[id]` for component documentation

### Path Aliases
- `@/*` maps to `src/*` for cleaner imports

### Code Style
- Tab indentation
- Double quotes for JavaScript/TypeScript
- BiomeJS handles formatting with specific overrides for Astro files
- Recommended rules enabled with disabled unused variable checks for template files