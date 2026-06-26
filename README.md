# CYD Portfolio — Infinite by Design

**Author**
Cristian Yuri S. Domingo

**Role**
Web Developer · Designer · Visual Creator

**Version**
v1.0 — June 2026

**Stack**
Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · Zod · Resend

---

## 1. Project Overview

A single-page portfolio website for **Cristian Yuri Domingo (CYD)** — built from scratch to showcase work in design, branding, and development. The site is a complete v1 with a hero section, scroll-driven works gallery, sticky service panels, collapsible experience timeline, contact form with API delivery, and individual project detail pages.

Every visual detail — sharp corners, hairline borders, uppercase tracking, light font weights — is intentional. The code is organized around Atomic Design, with extracted hooks and data files for maintainability.

### 1.1 Objectives
- Present a professional portfolio that reflects the owner's design and development skills.
- Demonstrate scroll-driven animation and interactive UI techniques.
- Provide a working contact form for freelance and collaboration inquiries.
- Maintain a clean, type-safe, and scalable codebase.

### 1.2 Target Audience
- Potential clients looking for design, branding, or development services.
- Recruiters and hiring managers in creative and tech roles.
- Developers interested in the project's architecture and implementation.

---

## 2. Current State — v1 Complete

All core features are built and working:

### 2.1 Pages & Layout

| Feature | Status |
|---|---|
| Hero / landing section | ✅ Built |
| About section (experience + academics) | ✅ Built |
| Works gallery (horizontal scroll + grid) | ✅ Built |
| Services panels (sticky scroll reveal) | ✅ Built |
| Contact form | ✅ Built |
| Individual work detail pages (`/works/[slug]`) | ✅ Built — 5 SSG pages |
| Contact API (`POST /api/contact`) | ✅ Built — Zod + Resend |
| Fixed navbar with scroll-hide | ✅ Built |
| Mobile responsive navigation | ✅ Built |

### 2.2 Animation & Interactions

| Feature | Status |
|---|---|
| Scroll-driven horizontal works track (desktop) | ✅ Built |
| Sticky service panels with scroll reveal | ✅ Built |
| Word-by-word color animation (Services intro) | ✅ Built |
| Canvas-based portrait hover effect (alpha detection) | ✅ Built |
| Corner bracket hover overlay on hero portrait | ✅ Built |
| Navbar hide-on-scroll-down / reveal-on-scroll-up | ✅ Built |
| Mobile menu with staggered link animation | ✅ Built |
| Collapsible experience sections (motion animate) | ✅ Built |
| `prefers-reduced-motion` fallback | ✅ Built |

### 2.3 Code Quality

| Feature | Status |
|---|---|
| TypeScript strict mode | ✅ Enabled |
| ESLint + Prettier | ✅ Configured |
| Zod schema validation | ✅ In use on contact API |
| Responsive design (all breakpoints) | ✅ Tested |
| Accessibility (aria-labels, focus-visible, semantic HTML) | ✅ Implemented |
| SEO meta tags + Open Graph | ✅ Per-page via generateMetadata |
| Next.js Image optimization | ✅ Enabled |
| Modular data/hooks extraction | ✅ Refactored |

---

## 3. Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Next.js 14.2 (App Router) | SSR, routing, performance |
| Language | TypeScript (strict) | Type safety |
| Styling | Tailwind CSS 3.4 + CSS custom properties | Utility-first, design tokens |
| Animation | Framer Motion 12 | Scroll-driven animations, transitions |
| Fonts | Geist (local) · Playfair Display · Bebas Neue | Typography system |
| Validation | Zod 4 | Schema validation on contact API |
| Email | Resend | Contact form delivery |
| Linting | ESLint 8 · Prettier 3.8 | Code quality |

---

## 4. Architecture & Code Principles

### 4.1 Folder Structure

```
src/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts        — POST handler with Zod + Resend
│   ├── works/
│   │   └── [slug]/
│   │       └── page.tsx        — Work detail page (SSG, 5 pre-built paths)
│   ├── globals.css             — Tailwind directives, CSS custom properties
│   ├── layout.tsx              — Root layout, fonts, metadata, body classes
│   ├── page.tsx                — Home page: Hero → About → Works → Services → Contact
│   └── fonts/                  — Local font files (GeistVF, GeistMonoVF)
├── components/
│   ├── organisms/              — Complex section components
│   │   ├── Navbar.tsx          — Fixed header, scroll-hide, mobile menu
│   │   ├── HeroSection.tsx     — Hero with watermark, portrait, stats bar
│   │   ├── AboutSection.tsx    — Collapsible work/academic experience
│   │   ├── WorksSection.tsx    — Project cards, pinned scroll (desktop)
│   │   ├── ServicesSection.tsx — Sticky panels, word reveal animation
│   │   ├── ContactSection.tsx  — Contact form + info sidebar
│   │   └── Footer.tsx          — Minimal dark footer
│   └── molecules/
│       └── PortraitHoverImage.tsx — Canvas-based alpha hover effect
├── data/
│   ├── works.ts                — Work interface + project data
│   └── experience.tsx          — Work/academic experience data
├── hooks/
│   └── useNavbar.ts            — Navbar hooks (scroll, body lock, escape)
└── public/
    └── images/                 — Static assets (hero, works, about, logos)
```

### 4.2 Component Tree

```
<Navbar />              — Fixed top, scroll-hide, mobile dropdown
<main>
  <HeroSection />       — Full-viewport intro, CTA buttons, stats bar
  <AboutSection />      — Portrait + collapsible experience rows
  <WorksSection />      — Horizontal scroll (desktop) / grid (mobile)
  <ServicesSection />   — Sticky panels + animated word intro
  <ContactSection />    — Form + contact details
</main>
<Footer />              — Dark bar with copyright
```

### 4.3 Design Patterns
- **Atomic Design** — Components split into `molecules` and `organisms`.
- **Custom Hooks** — Scroll hide, body scroll lock, breakpoint reset, Escape close, navbar height — all in `src/hooks/useNavbar.ts`.
- **CSS Custom Properties** — Color tokens, font families, and dynamic values (`--navbar-h`, `--page-x`) for consistency.
- **Framer Motion Scroll-Linked Animations** — `useScroll` + `useTransform` for scroll-driven effects.
- **Defensive** — TypeScript strict, Zod validation, null checks.

---

## 5. Design System

### Color Theme

```css
--background: #ffffff;
--foreground: #0D1428;
--accent: #fcdb32;
```

| Token | Value | Usage |
|---|---|---|
| `navy` | `#0D1428` | Primary text, button backgrounds |
| `navy-dark` | `#141D38` | Dark variant |
| `surface` | `#F8F8F8` | Navbar background, secondary surfaces |
| `surface-alt` | `#fafafa` | Image placeholder backgrounds |
| `yellow` / `accent` | `#fcdb32` | Accent highlights |
| `border` | `#e5e4e2` | Border color token |

Borders use `navy` at opacities (`/10`, `/15`, `/06`) for a consistent hairline aesthetic.

### Typography

| Font | Usage | Weights |
|---|---|---|
| **Geist Sans** (local) | Body, headings, UI labels | 100–900 |
| **Playfair Display** (Google, italic) | Accent words | 400 |
| **Bebas Neue** (Google) | Display headings | 400 |

### Design Language
- **Sharp corners** — 0px radius throughout.
- **Hairline borders** — 1px at low-opacity navy (`.06`–`.20`).
- **Uppercase tracking** — Labels at `10px–12px` with `0.12em–0.22em` spacing.
- **Light weights** — Body at `200/300`, headings at `700`.
- **Watermarks** — Logo at `opacity: 0.015–0.025` as background texture.

### Animation Principles
- Custom easing `cubic-bezier(0.22, 1, 0.36, 1)`.
- Scroll-driven via `useScroll` / `useTransform`, no manual listeners.
- `prefers-reduced-motion` respected → static fallback.
- Stagger delays (`index * 45ms`) for sequential reveals.

---

## 6. Section Breakdown

### Navbar
- Fixed, hide-on-scroll-down, reveal-on-scroll-up (10px threshold).
- Desktop: centered links. Mobile: burger with animated curtain dropdown + staggered items.
- Body scroll locked when menu open. `--navbar-h` synced for dropdown position.
- "Ask AI" button dispatches `openAIChat` custom event.

### Hero
- 50/50 split: text left, portrait right. Watermark bg at `opacity: 0.015`.
- Playfair italic name, role labels, bordered bio.
- CTA buttons: "View My Work" (navy) and "Ask AI About Me" (outline).
- Portrait grayscale + hover corner bracket reveal.
- Stats bar: NEUST, Gold Award, 3-in-1.

### About
- Large "ABOUT ME" heading with canvas-based hover portrait (alpha detection).
- Two collapsible sections: Work Experience (2 entries) and Academic Achievements (2 entries).
- Each entry: fade-in stagger, hover accent line, index, type badge.

### Works
- **Desktop**: Pinned horizontal scroll — `useScroll` drives `useTransform` over 320vh.
- **Mobile**: 2-column grid.
- 5 project cards with hover overlay, image zoom, scrim.
- Each card links to its `<slug>` detail page.

### Services
- Intro: full-screen sticky with scroll-driven word color animation (`#555` → `#fff`).
- 3 sticky panels (Design, Branding, Development) stack via z-index.
- Each: number, heading, description, subtitle, image.

### Contact
- Left: location, email, phone. Right: form (Name, Email, Company, Message).
- POST to `/api/contact` — Zod validated, delivered via Resend.
- States: idle → sending → sent / error.

### Footer
- Dark bar: tagline + copyright.

---

## 7. What's Next

| Priority | Item | Status |
|---|---|---|
| P1 | AI Chat modal — wire up `openAIChat` event to a working chat UI | ⏳ |
| P1 | Update `metadataBase` in layout.tsx for production domain | ⏳ |
| P2 | Page transitions between routes (Framer Motion) | ⏳ |
| P2 | Custom 404 page | ⏳ |
| P2 | Skills & tools section | ⏳ |
| P2 | Favicon | ⏳ |
| P3 | Testimonials or client section | 📋 |
| P3 | Resume/CV download | 📋 |
| P3 | Plausible or lightweight analytics | 📋 |
| P4 | CMS integration for work content | 📋 |
| P4 | Dark mode toggle | 📋 |
| P4 | Unit tests | 📋 |

**Currently blocked**: Contact form needs a `RESEND_API_KEY` in `.env.local` to actually send emails (free at resend.com).

---

## 8. Getting Started

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

© 2026 Cristian Yuri Domingo — Infinite by Design, Build Without Limits.
