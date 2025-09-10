# Yoruverse UI - Project Summary for Claude Sessions

## 📋 Project Overview

**Project**: Yoruverse UI Component Library  
**URL**: https://ui.yoruverse.com  
**Repository**: https://github.com/yoruverse/ui  
**Type**: React/Astro component library with documentation site

## 🏗️ Architecture & Technology Stack

### Core Technologies
- **Framework**: Astro 5 with React integration
- **Styling**: TailwindCSS 4 with custom Yoruverse theme (`@yoruverse-js/tailwindcss`)
- **TypeScript**: Strict configuration for type safety
- **Content**: MDX for component documentation with frontmatter schema
- **Code Quality**: BiomeJS for formatting and linting
- **Package Manager**: pnpm (always use pnpm, never npm)

### Project Structure
```
src/
├── components/
│   ├── ui/              # Core UI components (Button, Breadcrumb)
│   ├── shared/          # Utility components (ComponentSnippet, icons)
│   └── layouts/         # Layout components (layout.astro, prose.astro, sidebar.tsx)
├── pages/
│   ├── index.astro      # Homepage with component examples
│   └── docs/components/[id].astro  # Dynamic component documentation
├── data/components/     # MDX documentation files for each component
├── lib/                 # Utilities (cn helper for class merging)
└── styles/              # Global CSS
```

## 🧩 Components Built

### 1. Button Component
- **Location**: `src/components/ui/button.tsx`
- **Documentation**: `src/data/components/button.mdx`
- **Features**: Primary/secondary variants, icon support, forwardRef pattern
- **Props**: `variant?: "primary" | "secondary"`, `isIcon?: boolean`

### 2. Breadcrumb Component  
- **Location**: `src/components/ui/breadcrumb.tsx`
- **Documentation**: `src/data/components/breadcrumb.mdx`
- **Features**: Full accessibility, modular design, customizable separators
- **Components**: Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator
- **Usage**: Dynamic breadcrumbs in documentation pages

### 3. Sidebar Component (Layout-specific)
- **Location**: `src/components/layouts/sidebar.tsx`
- **Purpose**: Documentation navigation (not in component catalog)
- **Features**: Collapsible sections, active states, hierarchical navigation
- **Integration**: Used in `[id].astro` for dynamic component navigation

## 🎨 Design System

### Styling Patterns
- **Class Utility**: `cn()` function (clsx + tailwind-merge) for conditional classes
- **Component Pattern**: forwardRef with displayName for all UI components
- **TypeScript Typing**: `React.ComponentProps<"element">` extended with custom props
- **Theme Integration**: Leverages Yoruverse design tokens through TailwindCSS plugin

### Code Conventions
- **Indentation**: Tabs (not spaces)
- **Quotes**: Double quotes for JS/TS
- **Import Style**: `import * as React from "react"`
- **Export Pattern**: Named exports with destructuring
- **No Comments**: Unless explicitly requested

## 📖 Documentation System

### Content Collections
- **Configuration**: `src/content.config.ts`
- **Collection**: `components` collection loads from `src/data/components/`
- **Schema**: `title: string`, `description?: string`
- **Routing**: Dynamic at `/docs/components/[id]`

### Documentation Features
- **Auto-generated navigation**: Sidebar dynamically lists all components
- **Live examples**: ComponentSnippet shows interactive previews
- **SEO optimized**: Dynamic titles, descriptions, canonical URLs
- **Breadcrumb navigation**: Shows current location in site hierarchy

## 🔧 SEO & Performance

### SEO Configuration
- **Plugin**: astro-seo for comprehensive meta tags
- **Site URL**: https://ui.yoruverse.com
- **Features**: Open Graph, Twitter cards, dynamic canonical URLs
- **Meta Tags**: Keywords, author, robots, sitemap integration

### Performance Optimizations
- **Static Generation**: All pages pre-rendered
- **Image Optimization**: Astro's built-in image optimization
- **Code Splitting**: Automatic with Astro
- **Favicon**: Custom Yoruverse branding from jotis.me

## 🐳 Docker & Deployment

### Docker Setup
- **Multi-stage Build**: Node.js build → Nginx serving
- **Image Size**: Optimized to ~53MB (vs 387MB with Node.js)
- **Base Images**: node:20-alpine → nginx:alpine
- **Security**: Non-root user, minimal attack surface

### Container Features
- **Port**: 4321 (configurable)
- **Health Checks**: Built-in HTTP health monitoring  
- **Caching**: Static asset caching with proper headers
- **Security Headers**: X-Frame-Options, CSP, XSS protection
- **Compression**: Gzip enabled for text assets

### Build Scripts
- **Linux/macOS**: `./docker-build.sh`
- **Windows**: `docker-build.bat`
- **Docker Compose**: `docker-compose up -d`

## 🚀 CI/CD Pipeline

### GitHub Actions Workflows

#### 1. Build & Push (`docker-build-push.yml`)
- **Triggers**: Push to main, tags, PRs
- **Platforms**: linux/amd64, linux/arm64
- **Registry**: Docker Hub (`jotis/yoruverse-ui`)
- **Caching**: GitHub Actions cache for faster builds
- **Security**: Only pushes on main branch, not PRs

#### 2. Deploy Notifications (`deploy-notify.yml`)
- **Features**: Commit comments, deployment status, security scanning
- **Security**: Trivy vulnerability scanning
- **Monitoring**: Results uploaded to GitHub Security tab

### Required Secrets
- `DOCKERHUB_USERNAME`: Docker Hub username (`jotis`)
- `DOCKERHUB_TOKEN`: Docker Hub access token

### Tagging Strategy
- **Main branch**: `latest`, `main`
- **Tags**: `v1.0.0` → `1.0.0`, `1.0`, `1`
- **Image**: `jotis/yoruverse-ui`
- **PRs**: Build only, no push

## 🛠️ Development Commands

```bash
# Development
pnpm dev                    # Start dev server
pnpm build                  # Build for production  
pnpm preview                # Preview production build

# Code Quality
npx biome format --write .  # Format code
npx biome lint --fix .      # Lint and fix

# Docker
./docker-build.sh           # Build and run container
docker-compose up -d        # Run with compose
```

## 📁 Important Files

### Configuration
- `astro.config.mjs` - Astro configuration
- `tailwind.config.ts` - TailwindCSS configuration  
- `tsconfig.json` - TypeScript configuration
- `biome.json` - BiomeJS configuration
- `src/content.config.ts` - Content collections

### Documentation
- `DOCKER.md` - Docker deployment guide
- `GITHUB_ACTIONS.md` - CI/CD setup instructions
- `CLAUDE.md` - Project instructions for Claude Code

### Build & Deploy
- `Dockerfile` - Multi-stage Docker build
- `docker-compose.yml` - Container orchestration
- `.github/workflows/` - GitHub Actions workflows
- `.dockerignore` - Docker build optimization

## 🔄 Development Workflow

### Adding New Components
1. Create component in `src/components/ui/`
2. Follow forwardRef + displayName pattern
3. Use `cn()` utility for class merging
4. Create MDX documentation in `src/data/components/`
5. Test with ComponentSnippet examples
6. Component automatically appears in sidebar navigation

### Deployment Process
1. **Development**: Work on feature branch
2. **Testing**: Create PR (triggers build test)
3. **Deploy**: Merge to main (auto-builds and pushes to Docker Hub)
4. **Release**: Tag version (creates versioned Docker images)

## 🎯 Project Goals & Context

### Purpose
- **Component Library**: Reusable UI components for Yoruverse ecosystem
- **Documentation Site**: Interactive examples and usage guides
- **Design System**: Consistent styling and behavior patterns

### Target Users
- **Developers**: Using components in React/Astro projects
- **Designers**: Understanding component capabilities and variations
- **Maintainers**: Contributing to the component library

## 🚨 Important Notes for Future Sessions

### Always Remember
- **Use pnpm**: Never use npm, always use pnpm for this project
- **Tab indentation**: Project uses tabs, not spaces
- **forwardRef pattern**: All UI components use React.forwardRef
- **No comments**: Don't add code comments unless explicitly requested
- **Documentation location**: Component docs go in `src/data/components/`
- **Sidebar is layout**: Sidebar component is in layouts/, not ui/ (not in catalog)

### Current Status
- **Components**: Button, Breadcrumb (both with full documentation)
- **Navigation**: Dynamic sidebar with breadcrumbs
- **SEO**: Fully configured with astro-seo
- **Docker**: Production-ready containerization
- **CI/CD**: GitHub Actions ready (secrets need setup)
- **Deployment**: Ready for https://ui.yoruverse.com

### Next Steps Likely Needed
- Configure GitHub repository secrets for Docker Hub
- Build first manual Docker image with tag 0.1.0
- Add more UI components (Input, Card, Modal, etc.)
- Implement responsive design testing
- Add component testing framework
- Create component playground/sandbox

This project is production-ready and follows industry best practices for component libraries, documentation, containerization, and CI/CD automation.