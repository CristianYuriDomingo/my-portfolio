# Changelog — Session 4

## README Rewrite
- Restructured with clearer "what the project is", "current state", and "what's next" sections
- Moved completed roadmap items into "Current State — v1 Complete"
- Added "What's Next" with priority-ordered remaining work
- Cleaned up duplicate entries in feature tables
- Added "Currently blocked" note for Resend API key

---

# Changelog — Session 3

## Work Detail Pages

### Created `src/app/works/[slug]/page.tsx`
- Dynamic route rendering each work from `src/data/works.ts`
- `generateStaticParams` pre-builds all 5 pages at build time
- `generateMetadata` per-page SEO (title, description, OG image)
- Hero image (full-width, 50–70vh), title, tag badge, description with bold markdown parsing
- Back link to `/#works`
- 404 on invalid slugs via `notFound()`
- Matches site design language: sharp corners, hairline borders, Geist Sans, navy/white

### Route output (SSG)
- `/works/bantay-bayan`
- `/works/sagip-247`
- `/works/graphic-design`
- `/works/laur-tourism`
- `/works/cyd-portfolio`

---

## Contact API

### Created `src/app/api/contact/route.ts`
- POST handler with Zod validation (`name`, `email`, `company`, `message`)
- Integration with **Resend** for email delivery
- Returns `{ ok: true }` on success, `{ ok: false, errors }` on validation failure

### Installation
- Added `resend` to dependencies
- Created `.env.local` with `RESEND_API_KEY` placeholder (gitignored)
- Sends to `dcristianyuri@gmail.com`

---

# Changelog — Session 2

## Theme Alignment

### `src/app/globals.css`
- `--background: #0d1428` → `#ffffff` (matches actual white page bg)
- `--foreground: #ffffff` → `#0D1428` (matches actual navy text)

### `src/components/organisms/Navbar.tsx`
- Hardcoded `bg-[#FCDB32]/[0.08]` → `bg-accent/[0.08]`

---

## Navigation Fix

### `src/components/organisms/WorksSection.tsx`
- Added `id="works"` wrapper `<section>` around both `SimpleWorksRow` and `PinnedWorksRow`
- Removed duplicate `id="works"` from individual rows (caused desktop scroll to target hidden element)
- Reduced motion fallback also wrapped in `<section id="works">`

---

## Code Refactoring

### Files created
- `src/data/works.ts` — `Work` interface + `works` array (existed inline in WorksSection)
- `src/data/experience.tsx` — `ExpEntry` type + work/academic experience data (existed inline in AboutSection)
- `src/hooks/useNavbar.ts` — 5 hooks extracted from Navbar (scroll hide, body lock, breakpoint reset, escape close, navbar height)

### Files modified
- **Navbar.tsx** — `-140 lines`: hooks removed, constants `SCROLL_THRESHOLD`/`MD_BREAKPOINT` moved, imports updated
- **AboutSection.tsx** — `-105 lines`: data removed, unused `SectionHeading` component deleted
- **WorksSection.tsx** — `-49 lines`: data + interface removed, imports updated

### Incidental fixes
- Unescaped `'` → `&apos;` in HeroSection (2 spots) and experience data (1 spot)
- `scrollYProgress: any` → `MotionValue<number>` in ServicesSection
- Dead `SectionHeading` component removed
- `key={b}` (invalid ReactNode key) → `key={bi}` (index) in AboutSection
- Prettier CRLF line endings normalized

---

## README

- Updated folder structure to include `src/data/` and `src/hooks/`
- Updated hooks reference to point to `src/hooks/useNavbar.ts`
- Removed "Cards link to /works/[slug]" from Works section breakdown
- Updated Roadmap with completed items

---

# Changelog — Session 1

## Theme System

### `src/app/globals.css`
- Switched from dark theme to light theme CSS custom properties
- New tokens: `--surface`, `--surface-alt`, `--border`, `--navy-dark`
- Old: `--background: #0d1428`, `--foreground: #ffffff`
- New: `--background: #ffffff`, `--foreground: #0D1428`

### `tailwind.config.ts`
- Added color tokens: `navy-dark`, `accent`, `surface`, `surface-alt`, `border`

### `src/app/layout.tsx`
- Body classes: `bg-navy text-white` → `bg-background text-foreground`

---

## Works Section

### `src/components/organisms/WorksSection.tsx`

**Header redesign:**
- Added top border matching navbar (`border-t border-navy/[0.06]`)
- Moved from left-aligned to centered layout
- Line-separator badge pattern (matching HeroSection)
- Removed slide nav arrows (added back temporarily, then removed)
- Sub-label changed from Playfair italic 9px → Geist sans bordered badge → line-separator text
- Removed small 80px separator under heading
- Removed full-width divider at bottom

**Card spacing tightened:**
- Title padding: `pt-[24px]` → `pt-[16px]` → `pt-[12px]`
- Description margin: `mt-[8px]` → `mt-[4px]` → `mt-[2px]`

**Image sizing:**
- `object-contain` → `object-cover` (images fill entire card)

**Layout order:**
- Sections reordered: Works and Services swapped positions

---

## Services Section

### `src/components/organisms/ServicesSection.tsx`
- Added `borderTop` and `borderBottom` to every panel (matching navbar border style)
- IntroPanel background: `#f9f9f9` → `#000000` (black)
- IntroPanel text: navy → white
- AnimatedWord: gold fill → white fill, dim start from `#999` → `#555`

---

## Footer

No changes made (pending redesign).

---

## Files Created

- `CHANGELOG.md` — This file (session documentation)
