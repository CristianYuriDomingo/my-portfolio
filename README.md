# CYD Portfolio — Infinite by Design

Personal portfolio of **Cristian Yuri Domingo** — a single-page scroll experience showcasing work in design, branding, and development.

Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14.2 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3.4 + CSS custom properties |
| Animation | Framer Motion 12 |
| Fonts | Geist (local), Playfair Display, Bebas Neue |
| Linting | ESLint 8 + Prettier |

---

## Architecture

### Page Structure

Single home page (`src/app/page.tsx`) with five stacked sections:

```
Navbar (fixed, scroll-hide)
─────────────────────────────
Hero          — Full-viewport intro, watermark bg, CTA buttons
Services      — Sticky-panel layout with scroll-driven word animation
Works         — Pinned horizontal scroll (desktop) / CSS grid (mobile)
About         — Large heading + portrait with hover-reveal effect
Footer        — Contact info, social links, watermark bg
─────────────────────────────
```

### Component Tree

```
src/
├── app/
│   ├── layout.tsx       — Root layout, fonts, metadata, body classes
│   ├── page.tsx         — Home page composition
│   └── globals.css      — Tailwind directives, CSS custom properties
├── components/
│   ├── organisms/
│   │   ├── Navbar.tsx         — Fixed header, scroll-hide, mobile menu
│   │   ├── HeroSection.tsx    — Hero with watermark, Playfair italic heading
│   │   ├── ServicesSection.tsx — Sticky panels, animated word reveal
│   │   ├── WorksSection.tsx   — Project cards, pinned scroll (desktop)
│   │   ├── AboutSection.tsx   — Portrait with hover mask effect
│   │   └── Footer.tsx         — Contact, social icons, watermark
│   └── molecules/
│       └── PortraitHoverImage.tsx — Canvas-based alpha hover effect
├── lib/             — (available for utilities)
└── types/           — (available for shared types)
```

---

## Design Decisions

### Color Theme

A light theme with navy accents, defined as CSS custom properties:

```css
--background: #ffffff;
--foreground: #0D1428;  /* navy */
--accent: #fcdb32;      /* gold */
--surface: #F8F8F8;
--surface-alt: #fafafa;
--border: #e5e4e2;
--navy-dark: #141D38;
```

### Typography

- **Geist Sans** — Primary body and headings (weight 100–300 for a light, premium feel)
- **Playfair Display** (italic) — Accent word in hero heading
- **Bebas Neue** — Display font for large section titles

### Animation Approach

- **Framer Motion `useScroll` / `useTransform`** — Scroll-driven horizontal slide for the Works section, word-by-word color reveal in Services intro
- **`prefers-reduced-motion` respected** — Falls back to static grid when user prefers reduced motion
- All transitions use custom cubic-bezier easing for a smooth, premium feel

### Key Interactions

- **Navbar** — Hides on scroll down, reveals on scroll up; mobile menu with staggered link animations and body scroll lock
- **PortraitHoverImage** — Uses offscreen canvas pixel-alpha data to create a custom hover reveal mask
- **Works pinned scroll** — Desktop: horizontal track moves in sync with vertical scroll; Mobile: standard 2-column grid

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

---

## To Do

- [ ] Contact form (Phase 2)
- [ ] Individual work detail pages (`/works/[slug]`)
- [ ] Update `metadataBase` in `layout.tsx` before deployment
- [ ] Replace placeholder social links
- [ ] Write tests
