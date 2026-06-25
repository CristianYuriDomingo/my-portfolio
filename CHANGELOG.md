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
