# Landing Page Redesign — Design Spec

**Date:** 2026-06-05
**Project:** Yeremia Portfolio (MyPortofolio)
**Status:** Approved

---

## 1. Overview

Replace the current cyberpunk/sci-fi themed portfolio with a professional, editorial design based on the "Structured Precision" framework. The new design uses a monochromatic palette, strict grid system, and Montserrat typography to create a clean, focused experience that lets project content take center stage.

**Sections (in order):** Navbar → Hero → About → Projects → Contact

---

## 2. Design System

### Color Tokens

| Token | Light Mode | Dark Mode |
|---|---|---|
| `--bg-base` | `#FAFAFA` | `#0F172A` (slate-900) |
| `--bg-surface` | `#FFFFFF` | `#1E293B` (slate-800) |
| `--text-primary` | `#0F172A` | `#F8FAFC` |
| `--text-secondary` | `#64748B` | `#94A3B8` |
| `--border` | `#E2E8F0` | `#334155` |

All tokens are CSS custom properties defined on `:root` and overridden under `.dark` class on `<html>`.

### Dark Mode Strategy

- Default: system preference via `prefers-color-scheme: dark`
- Manual toggle: `.dark` class on `<html>` element
- Toggle button lives in the Navbar

### Typography — Montserrat (Google Fonts)

| Role | Weight | Size | Notes |
|---|---|---|---|
| Display / H1 | 700 Bold | `clamp(3rem, 8vw, 6rem)` | Hero headline |
| H2 Section | 600 SemiBold | `2rem` | Section titles |
| Sub-label | 500 Medium | `0.75rem` | Uppercase, `tracking-widest` |
| Body | 400 Regular | `1rem` | `line-height: 1.7` |
| Meta | 400 Regular | `0.875rem` | Muted color, project metadata |

### Grid

- 12 columns, max-width `1280px`, gutter `2rem`, centered with `margin: 0 auto`
- Desktop (≥1024px): 12 columns
- Tablet (≥768px): 8 columns
- Mobile (<768px): 4 columns

### Animation

Uses existing `framer-motion` dependency. Behavior:
- Entrance: `opacity: 0 → 1`, `y: 20px → 0`, `duration: 0.5s`
- Trigger: `whileInView` with `viewport={{ once: true }}`
- No glows, pulses, scan-lines, or neon effects

---

## 3. Component Specs

### Navbar

- Height: `80px`
- Position: sticky top
- Background: `--bg-base` at 80% opacity + `backdrop-filter: blur(12px)`
- Bottom: hairline `1px solid var(--border)`
- Left: `YEREMIA` in Montserrat SemiBold
- Right: nav links (`About`, `Projects`, `Contact`) + dark/light toggle icon (sun icon in dark mode, moon icon in light mode)
- Active state: thin underline, no color change
- Click: `scale(0.95)` feedback via `whileTap`
- Mobile: nav links collapse into a slide-down drawer, hamburger icon trigger; drawer closes on link click or outside tap

### Hero

- Layout: 2-column 50/50 split at desktop, stacked (photo top) at mobile
- Left column:
  - Sub-label: `01 — INTRODUCTION` (uppercase, tracking-widest, text-secondary)
  - H1 headline: `Building Clean, Scalable Software.`
  - Bio: 1-2 sentence description of Yeremia as a Software Engineer
  - Two buttons: primary (solid `--text-primary` bg, white text, 4px radius) + secondary (ghost, border only)
- Right column:
  - Placeholder box, aspect ratio `4:5`, border `1px solid var(--border)`, background `--bg-surface`
  - Label `IMAGE` centered inside as placeholder text

### About

- Layout: full-width, two sub-sections stacked
- Sub-label: `02 — ABOUT`
- H2 title + bio paragraph
- Stats row: 3 items horizontal — large number + small label below (`50+ Deployments`, `10+ Regions`, `99.9% Uptime`)
- Skills grid: chip badges — border `1px solid var(--border)`, background transparent, text `--text-secondary`, font mono uppercase, no fill color
- Skills list: `Next.js`, `TypeScript`, `React`, `Node.js`, `Python`, `PostgreSQL`, `Docker`, `AWS`

### Projects

- Sub-label: `03 — SELECTED WORKS`
- Grid: 3 columns desktop, 2 columns tablet, 1 column mobile
- Card structure:
  - Thumbnail area: aspect ratio `4:5`, background `--bg-surface`, border `1px solid var(--border)`
  - Below thumbnail: project name (SemiBold), category (Regular, muted), year (right-aligned, muted)
- Hover state: thumbnail `scale(1.03)` transition + border `var(--border)` → `slate-400`
- No box-shadows — only border and scale for depth

### Contact

- Layout: 2-column 50/50 split at desktop, stacked at mobile
- Sub-label: `04 — CONTACT`
- Left: heading, short description, email address
- Right: form with 3 fields (Name, Email, Message textarea)
  - Input style: bottom-border only (`border-bottom: 1px solid var(--border)`), no box, no background
  - Label: small uppercase text above each field
  - Submit: solid button, same style as Hero primary button, label `Send Message`
- Footer: single line below, copyright left, optional social links right

---

## 4. Files to Create / Modify

### Files to delete (current cyberpunk theme)
- `src/components/Hero.tsx` + `Hero.module.css`
- `src/components/About.tsx` + `About.module.css`
- `src/components/Projects.tsx` + `Projects.module.css`
- `src/components/Contact.tsx` + `Contact.module.css`
- `src/components/Navbar.tsx` + `Navbar.module.css`

### Files to create (new design)
- `src/components/Navbar.tsx` + `Navbar.module.css`
- `src/components/Hero.tsx` + `Hero.module.css`
- `src/components/About.tsx` + `About.module.css`
- `src/components/Projects.tsx` + `Projects.module.css`
- `src/components/Contact.tsx` + `Contact.module.css`

### Files to modify
- `src/app/globals.css` — replace all CSS variables and base styles
- `src/app/layout.tsx` — update metadata title/description, add dark mode toggle context
- `src/app/page.tsx` — no structural change needed

---

## 5. Responsive Breakpoints

| Breakpoint | Width | Behavior |
|---|---|---|
| Mobile | `< 768px` | 1 column, stacked layouts, drawer nav |
| Tablet | `768px – 1023px` | 2 columns, condensed hero |
| Desktop | `≥ 1024px` | Full 3-column grid, split layouts |

---

## 6. Out of Scope

- No real project data or images (placeholders only)
- No backend / form submission logic
- No page routing beyond the single landing page
- No animations beyond framer-motion entrance transitions
