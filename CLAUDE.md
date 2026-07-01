# CLAUDE.md — Perkumpulan Pejabat Lelang (PPL)

## 1. Project Overview

- Name : Perkumpulan Pejabat Lelang (PPL) Website
- Description : A company profile website for the association of auction officials, displaying information about the organization, regulations, announcements, and providing login/register functionality. The design follows the green theme of DJKN (Direktorat Jenderal Kekayaan Negara) as requested by the client.
- Goal : Create a professional, accessible, and responsive website that presents the association's credibility, communicates official regulations and announcements, and allows members to authenticate.
- Target Users: Auction officials, government staff, general public interested in auction processes.
- Version : v1.0.0
- Status : Active development

---

## 2. Tech Stack

- Language : TypeScript
- Framework : Next.js 16 (App Router)
- Styling : Tailwind CSS
- UI Library : shadcn/ui (built on Radix UI)
- Database : PostgreSQL Supabase
- ORM : -
- Auth : NextAuth.js
- State Management : (Not required for this phase, but Zustand for global UI state if needed)
- Data Fetching : Server Components with fetch, React Query for client-side if needed
- Package Manager : npm (or pnpm, but we stick to npm as per existing lockfile)
- Deployment : Vercel (recommended)

---

## 3. Commands

```bash
# Development
npm run dev          # Run dev server
npm run build        # Build for production
npm run start        # Run production build
npm run lint         # Run linter (ESLint)
npm run format       # Format code (Prettier, if configured)

# Package Management
npm install <package>    # Install a new package
npm install            # Install all dependencies

# shadcn/ui
npx shadcn@latest add <component>   # Add shadcn component

# Testing (if added later)
npm run test         # Run tests
```

> Always use npm – do not use yarn or pnpm without explicit confirmation.

---

## 4. Project Structure

Architecture: Feature-based / App Router (Next.js)

```
root/
├── app/
│   ├── (routes)/                 # Grouped routes (optional)
│   │   ├── page.tsx              # Beranda (landing page)
│   │   ├── peraturan/
│   │   │   └── page.tsx          # Peraturan page
│   │   ├── tentang/
│   │   │   └── page.tsx          # Tentang Kami page
│   │   ├── pengumuman/
│   │   │   └── page.tsx          # Pengumuman page
│   │   └── login/
│   │       └── page.tsx          # Login/Register page
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles
│   └── favicon.ico
├── components/
│   ├── ui/                       # shadcn/ui components & custom UI components
│   │   ├── fin-tech-landing-page.tsx   # Landing page component (from 21st.dev)
│   │   ├── card.tsx              # shadcn card
│   │   ├── badge.tsx             # shadcn badge
│   │   ├── avatar.tsx            # shadcn avatar
│   │   └── ...                   # other shadcn components
│   └── layout/                   # (Optional) custom layout wrappers
├── lib/
│   └── utils.ts                  # cn() helper from shadcn
├── public/                       # Static assets
├── tailwind.config.ts            # Tailwind config with custom DJKN green palette
├── next.config.ts
├── package.json
└── tsconfig.json
```

File placement rules:

- All UI components go to components/ui/ (shadcn's default).
- Page components are placed directly inside app/ routes.
- Utility functions go to lib/.
- Do not create new top-level folders without confirmation.

---

## 5. Naming Conventions

```
# Files and Folders
- Components      : PascalCase      e.g. UserCard.tsx, FinTechLandingPage.tsx
- Non-components  : camelCase       e.g. useAuth.ts, getAnnouncements.ts
- Folders         : kebab-case      e.g. user-profile/
- Pages           : page.tsx
- Layouts         : layout.tsx
- Test files      : component.test.tsx or component.spec.tsx

# Inside Code
- Variables       : camelCase       e.g. userData, isLoading
- Constants       : UPPER_SNAKE     e.g. MAX_RETRY, API_BASE_URL
- Functions       : camelCase       e.g. fetchAnnouncements, formatDate
- Types/Interfaces: PascalCase      e.g. UserType, Announcement
- Enums           : PascalCase      e.g. UserRole, AnnouncementStatus
- CSS Classes     : kebab-case      e.g. announcement-card, nav-item

# Git Branches
- Feature         : feat/feature-name
- Bug fix         : fix/bug-description
- Hotfix          : hotfix/issue
- Refactor        : refactor/area
```

---

## 6. Code Conventions

```
# Coding Approach
- Follow clean code principles, keep functions small and focused.
- Avoid duplicate code; extract reusable logic into hooks or utils.
- Write code for readability, not brevity.

# TypeScript (strict mode)
- No `any` type allowed. Use `unknown` if needed.
- Explicitly annotate function return types.
- Use `interface` for objects, `type` for unions or intersections.

# Import Order
1. External libraries (React, Next.js, etc.)
2. Internal absolute imports (@/components, @/lib, etc.)
3. Internal relative imports (./Component, ../utils)
4. Types and interfaces
5. Assets and styles

# Export Pattern
- Use named exports for components and functions.
- Use default export only for page.tsx and layout.tsx.

# Error Handling
- Always use try-catch for async operations.
- Never leave errors unhandled; provide informative messages.
```

---

## 7. Component Rules

```
# Component Structure (inside one file)
1. Imports
2. Props type/interface
3. Component definition
4. Hooks (useState, useEffect, etc.)
5. Handlers and local functions
6. JSX return
7. Export

# Props
- Always type props explicitly.
- Use default values for optional props.
- Keep props count ≤ 5 (if more, consider splitting).

# Server vs Client Components (Next.js)
- Default: use Server Component.
- Add 'use client' only when needed:
  - useState, useEffect, or other hooks.
  - Event handlers (onClick, onChange).
  - Browser APIs (localStorage, window).
  - Libraries that don't support SSR (framer-motion).

# Small Components
- Extract to separate file if reused in more than one place.
- May stay in same file if used only by the parent.
```

---

## 8. Styling Rules

```
# Styling Approach
- Use Tailwind CSS utility classes in JSX.
- Never use inline styles for static values.
- Never use !important.

# Tailwind CSS
- Use `cn()` helper from @/lib/utils for conditional classes.
- Extract repeated class combinations into reusable components.
- Class order: layout → spacing → sizing → color → typography → state.

# Responsive Design
- Mobile-first approach.
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px).

# Dark Mode
- Not required initially, but design should be adaptable if added later.
- Use CSS variables for colors to support dark mode.

# Design Tokens – DJKN Green Palette
Define custom colors in tailwind.config.ts:

```ts
extend: {
  colors: {
    'djkn': {
      50: '#e8f5e9',
      100: '#c8e6c9',
      200: '#a5d6a7',
      300: '#81c784',
      400: '#66bb6a',
      500: '#2e7d32',   // medium green
      600: '#1b5e20',
      700: '#1a5e2a',   // primary dark green
      800: '#0d3318',
      900: '#081f0e',
    },
  },
}
```

Use these tokens in components; never hardcode hex values.

---

## 9. API & Data Fetching Rules

```
# Server vs Client Fetching
- Server fetch: data that does not change often (announcements, regulations) → use Server Components with fetch.
- Client fetch: data that changes after user interaction (user profile, form submissions) → use React Query or SWR.

# API Response Format
- All endpoints must return:
{ success: boolean, data: T | null, message: string }

# Error Handling
- Always handle errors with try-catch.
- Return appropriate HTTP status codes.
- Do not expose internal error details in production.

# Fetch Functions
- Place all fetch functions in lib/services/ or lib/api/.
- Do not write fetch logic directly inside components.

# Environment
- Use environment variables for all URLs and API keys.
- Never hardcode sensitive values.
```

---

## 10. State Management Rules

```
# State Hierarchy (use simplest first)
1. Local state (useState) – only one component.
2. Lifted state – shared between 2-3 nearby components.
3. Global state – shared across many components (Zustand, Redux, etc.).

# When to Use Global State
- User authentication data.
- UI theme or language.
- Data that needs to persist across pages.

# Zustand (if used)
- Create one store per domain/feature.
- Do not store computed data; compute in selectors.
- Use selectors to pick specific pieces of state.

# Context
- Use for stable, rarely-changing data (theme, locale).
- Do not use for frequently changing state.
```

---

## 11. Performance Rules

```
# Code Splitting
- Use dynamic imports for large components not immediately visible.
- Lazy load pages and components that are rarely accessed.

# Image Optimization
- Always use Next.js Image component.
- Specify width and height.
- Use WebP or AVIF formats for new images.
- Do not use raw <img> tags.

# Re-render Optimization
- Use useMemo for expensive calculations.
- Use useCallback for functions passed as props.
- Do not over-optimize prematurely; profile first.

# Bundle Size
- Import only what you need:
Correct: import { debounce } from 'lodash'
Incorrect: import _ from 'lodash'

# SSR & SSG
- Default to Server Components to reduce client JavaScript.
- Use Static Generation for pages with rarely changing data.
- Use ISR for pages that need periodic revalidation.
```

---

## 12. Git Rules

**Important:** After completing any changes or additions, commit to GitHub immediately before moving to the next task. This allows you to compare changes and undo if needed.

```
# Format Commit Message
feat     : new feature
fix      : bug fix
refactor : code refactor
style    : styling or formatting changes
docs     : documentation updates
test     : add or modify tests
chore    : configuration or tooling changes

# Contoh
feat: add announcements page with grid layout
fix: resolve mobile menu not closing on link click
refactor: extract announcement card into reusable component

# Additional Rules
- Do not commit .env files or secrets.
- One commit per specific change.
- Do not combine unrelated changes in one commit.
```

---

## 13. Features

```
# Completed and working
- [ ] Landing page (Beranda) with hero, navbar, footer, and Instagram link.
- [ ] Navigation menu linking to all pages.
- [ ] Announcements page with card grid layout.
- [ ] Regulations page with card grid layout.
- [ ] About page (Tentang Kami) with static content.
- [ ] Login/Register page with basic form.
- [ ] DJKN green color theme applied.

# In progress — do not modify without confirmation
- [ ] Add actual content for announcements and regulations (data).
- [ ] Implement authentication (login/register) with NextAuth.js.
- [ ] Connect to a database for dynamic content.

# Not started
- [ ] Admin dashboard for managing announcements/regulations.
- [ ] User profile page.
- [ ] Search functionality.
- [ ] Dark mode support.
```

---

## 14. Testing

```
# Testing Approach
- Jenis testing  : Unit, Integration, E2E (to be decided).
- Framework      : Vitest + React Testing Library for unit/integration; Playwright for E2E.

# What to Test
- Utility and helper functions.
- Complex business logic.
- API endpoints (happy path and errors).
- Critical components used in multiple pages.

# What Not to Test
- Simple presentational components.
- Third-party libraries (tested by their authors).
- Configuration files.

# Test Naming
- One test file per source file.
- Descriptive names: "should [expected behavior] when [condition]"
- Arrange → Act → Assert pattern.

# Coverage Target
- Minimum coverage : 70% for business logic.
- Prioritas        : business functions > API routes > UI components.
```

---

## 15. Do Not

If instructions or prompts are ambiguous, **ASK FIRST** before coding. Do not assume.

```
# Structure and Files
- Do not create new folders without confirmation.
- Do not delete files without confirmation.
- Do not move files without confirmation.
- Do not change existing folder structure.

# Code
- Do not use 'any' in TypeScript.
- Do not hardcode values that should come from environment variables.
- Do not commit .env files or secrets.
- Do not install new packages without confirmation.
- Do not remove or modify working features without clear instruction.

# Forbidden Patterns
- Do not use useEffect for data fetching; use React Query or Server Components.
- Do not use inline styles for static styling.
- Do not use !important in CSS.

# Database
- Do not run commands that alter or delete production data.
- Do not create migrations without confirmation.
- Do not expose database credentials to the client.

# Security
- Do not expose API keys or secrets to the client.
- Do not bypass input validation.
- Do not skip error handling in API routes.
```

---

## 16. Environment Variables

```
# Setup
- Copy .env.example to .env.local for local development.
- Never commit .env or .env.local to the repository.

# Public Variables — safe for client
NEXT_PUBLIC_APP_NAME="Perkumpulan Pejabat Lelang"
NEXT_PUBLIC_INSTAGRAM_URL="https://www.instagram.com/pejabatlelang.id/"

DATABASE_URL # (if database is used)
AUTH_SECRET # For JWT signing
AUTH_URL # Base URL of the app
OAUTH_CLIENT_ID # (if OAuth used)
OAUTH_CLIENT_SECRET # Server only
```

---

## 17. Integration of 21st.dev Components

This project uses two components sourced from [21st.dev](https://21st.dev/community/components) to accelerate UI development:

### Component 1: `fin-tech-landing-page.tsx`
- **Purpose:** Provides the landing page (Beranda) with hero, navigation, stats, and footer.
- **Source:** Prompt from 21st.dev (fin-tech-landing-page).
- **Location:** `components/ui/fin-tech-landing-page.tsx`
- **Dependencies:** `framer-motion`, `lucide-react`
- **Adaptations:**
  - Replaced all `emerald-*` and `teal-*` Tailwind classes with `djkn-*` custom palette.
  - Updated content (title, stats, nav links) to reflect PPL.
  - Added Instagram link in footer.
  - Added `"use client"` directive because of `framer-motion`.
- **Usage:** Rendered in `app/page.tsx` as the home page.

### Component 2: `bento-grid.tsx` (or adapted grid for announcements/regulations)
- **Purpose:** Demonstrates a bento grid layout, but we adapt it to a simple responsive card grid for Announcements and Regulations pages.
- **Source:** Prompt from 21st.dev (bento-grid).
- **Location:** `components/ui/bento-grid.tsx` (can be kept for reference, but we build a simpler grid using shadcn `Card`).
- **Adaptations:**
  - We use `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent` from shadcn/ui to display list of items.
  - Applied `motion` from `framer-motion` for staggered entrance animation.
  - Used `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.
- **Usage:** Separate pages `app/pengumuman/page.tsx` and `app/peraturan/page.tsx` use this grid pattern.

### Integration Steps (as per 21st.dev prompts)
1. Copy the provided component code into `components/ui/`.
2. Install necessary dependencies: `lucide-react`, `framer-motion`, `class-variance-authority`, `@radix-ui/react-avatar`.
3. Set up shadcn/ui by running `npx shadcn@latest init` and adding required components (`card`, `badge`, `avatar`).
4. Replace placeholder image URLs with appropriate Unsplash or local images.
5. Customize colors to DJKN green palette.
6. Use the components in respective pages.

### Important Notes
- Both components are client-side, so they must have `"use client"` at the top.
- Ensure `@/lib/utils` exists (from shadcn) for `cn()` helper.
- For the grid pages, we do not directly use `BentoGridShowcase` because it is designed for a fixed 6‑slot layout; instead we take its styling and animation philosophy to build a more flexible grid.

---

## 18. UI/UX Pro Max Skill Integration

We have the `ui-ux-pro-max` skill installed to guide design decisions. It provides:

- **Design System Generation:** Use `--design-system` to get recommendations for styles, colors, typography, and effects.
- **Domain Search:** For specific needs: `--domain style`, `--domain color`, `--domain ux`, etc.
- **Stack Guidelines:** For `react-native` or other stacks, but we can adapt to Next.js.

**When to use the skill:**
- Before starting a new page or component: run a design system search.
- When choosing colors or fonts.
- When reviewing accessibility or UX.

**Example command:**
```bash
python3 skills/ui-ux-pro-max/scripts/search.py "government institution professional green" --domain color
```

End of CLAUDE.md