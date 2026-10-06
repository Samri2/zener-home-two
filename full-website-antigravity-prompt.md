# Full Website Build Prompt — Antigravity
*Reference: architecture/timber-construction site motion reel ("woodland"). This spec covers every screen/state shown in the reference video — the Home hero system and the Projects showcase page — rebuilt with finishing & furniture company content.*

---

## 0. What's Actually In The Reference (scope of this doc)

The video shows exactly **two page states**, looped:
1. **Home** — a 3-phase animated hero (cinematic intro → filter/search → split showcase with sidebar).
2. **Projects** — a long, auto-scrolling 2-column grid of project cards with rich hover states.

Nothing else (About, Services, Contact, Blog, Footer) appears in the reference, even though the nav lists them. Section 8 at the bottom tells you how to extend the system to those pages consistently — but sections 1–7 are a direct rebuild of what's actually on screen.

---

## 1. Global Design System

| Token | Value | Notes |
|---|---|---|
| Background | `#0d0d0d`–`#161616` | Near-black; photography carries the color |
| Text primary | `#F7F5F0` (warm off-white) | Over dark photo overlays |
| Headline font | Serif display ("Fraunces", "Playfair Display", "GT Super") | Large, editorial — never bold-sans |
| Body/UI font | Clean sans ("Inter", "Neue Haas") | Nav, buttons, filters, captions, stats |
| Accent (brand) | `#FF6B00` / `#FF7A3D` | CTA fills, active filter/tab state, active dots, hover glows |
| Glass surfaces | `backdrop-filter: blur(24–30px) saturate(180%)`, `background: rgba(255,255,255,0.06)`, `border: 1px solid rgba(255,255,255,0.14)` | Nav pill, filter dropdowns, sidebar cards, arrow buttons |
| Overlay gradient | `linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.3) 45%, transparent 75%)` | Behind all text-over-image |
| Radius | 14–20px cards, 999px pills/buttons | |
| Ease (entrances) | `cubic-bezier(0.22, 1, 0.36, 1)` | ease-out-expo |
| Ease (hover) | `ease-in-out` | |

---

## 2. Global Navigation (persists across Home + Projects)

- Fixed top bar, transparent over hero imagery; gains the glass background (`blur(24px)`) once the page scrolls past ~40px.
- **Left:** logo wordmark.
- **Center-right:** About · Services · Projects · Blog · Contact.
- **Right:** search icon + filled orange pill CTA ("Start a Project") — on Home this button only appears once Phase 2 of the hero begins (see 3.2); on the Projects page it's present immediately, no delay.
- Active nav item (e.g. "Projects" when on that page) gets a thin underline in accent orange.
- **Mobile:** collapses into the liquid-glass dropdown sheet — logo + hamburger stay visible, tapping opens a full-width frosted panel sliding down with the nav links stacked, staggered fade-in (60ms apart).

---

## 3. HOME PAGE — Hero System

### 3.1 Phase 1 — Cinematic Intro (0.0s–3.0s, plays once on load)

- Full-bleed background photo of a finished project (exterior, dusk lighting), continuous slow zoom `scale(1.0→1.06)` over 8s linear, looping ambient (Ken Burns).
- `0.3s` — nav fades/slides in (`opacity 0→1`, `translateY(-12px→0)`, 500ms).
- `0.6s` — headline builds **word-by-word**: each word in its own span, `opacity 0→1` + `translateY(14px→0)`, 350ms per word, 120ms stagger, left-aligned, vertically centered-low.
- `~2.4s` — full headline holds, e.g. "We don't finish spaces. We build a better life."

### 3.2 Phase 2 — Filter / Search State (3.0s–8.0s, same hero, no scroll)

- `3.0s` — headline re-centers horizontally and shrinks slightly (64px→48px), 500ms ease-out-expo.
- `3.4s` — "Start a Project" pill fades/scales into the nav (`opacity 0→1`, `scale .9→1`, 300ms).
- `3.6s` — category tab row fades up under the headline: `All / Interiors / Furniture / Custom Finishes`, 2nd tab pre-active (filled/underlined orange).
- `4.0s` — filter bar (glass pills) slides/fades in, 80ms stagger per pill: **Style** dropdown, **Scope/Area** dropdown, **Rooms** numeric steppers `1 2 [3] 4 5`, **Timeline** numeric steppers `1 [2] 3` — active numbers filled orange.
- `4.6s` — two preview cards slide up + crossfade in below the filter bar (100ms stagger between them), showing live results for the active filters.
- **Live interactivity:** changing a tab or filter crossfades the two preview cards (400ms); numeric stepper selection slides the active-fill pill to the new number (250ms) instead of snapping.

### 3.3 Phase 3 — Split Showcase + Sidebar (scroll-triggered)

- On scroll-into-view: background **morphs from full-bleed to a two-panel split** — left = exterior night shot, right = interior detail shot — via a 600ms crossfade/wipe across a soft vertical seam.
- Headline drops to a smaller left-aligned position over the left panel; a tagline fades in beneath it (e.g. "Custom finishing & furniture, made to fit your space").
- Bottom-left: contact line (phone/email + icon). Bottom-center: social icons at `opacity .6`, brightening to `1.0` + `scale(1.1)` on hover.
- **Right-edge sidebar** slides in from the right (`translateX(40px→0)`, 500ms, 100ms stagger per card): 3 stacked category cards (thumbnail + label + "Learn more →").
- **Sidebar hover:** thumbnail scales `1.0→1.08` (400ms), a circular glass "View" button fades/scales in at center (`scale .8→1`, 250ms), dark overlay `rgba(0,0,0,.25)` fades over the image for legibility.

---

## 4. PROJECTS PAGE — Full Grid Showcase

This is treated as its **own page** (`/projects`), reached from the nav or the hero's "Start a Project" / tab clicks. It is a long-scrolling, 2-column catalogue — the reference shows at least 5 row-pairs before looping, implying a full catalogue of 10+ projects:

`Saint Tropez` · `San City` · `Pushkino` · `Renaissance` · `Barminka` · `Venezh` · `Albatross` · `Lyubinka` *(reference names — replace with real project names)*

### 4.1 Page Header
- Same global nav (glass, solid from the start — no hero image behind it here).
- Page title in the serif display font (e.g. "Our Projects"), left-aligned, with a short one-line description beneath.
- The **same filter/tab row from the hero Phase 2** repeats here, pinned under the title, so filtering behaves identically across the site (shared component).

### 4.2 Grid Layout
- 2-column grid (1-column mobile), consistent gap (~20–24px).
- Each card: full-bleed photo (`object-fit: cover`, ~4:3), bottom gradient overlay, project name in serif bottom-left, category subtitle beneath it in small sans caps (e.g. "Residential — Solid Wood Finish").
- Cards enter on scroll (IntersectionObserver): `translateY(30px→0)` + `opacity 0→1`, 500ms, staggered by column so left/right cards don't land simultaneously.

### 4.3 Card Hover Interaction (build this precisely — it's the signature interaction of the whole site)
1. Image scales `1.0→1.04` (450ms ease) and overlay darkens `.3→.5`.
2. Three stat chips fade up from the bottom, 60ms stagger: `Floors: 2` · `Area: 584 m²` · `Rooms: 3`.
3. An outlined "View Details" pill fades in above the chips — glass background, fills solid orange on its own hover.
4. Left/right arrow icons fade in at the card's vertical center-edges; clicking cycles through 2–3 alternate images of that *same* project in place (350ms crossfade) — the grid doesn't reflow or navigate away.
5. Mouse-leave reverses everything at 350ms — never an abrupt cut.

### 4.4 Pagination / Loading
- Infinite-scroll or a "Load more" button in the glass/orange style; newly loaded cards use the same staggered entrance as 4.2.

---

## 5. Motion Timing Reference (both pages)

| Element | Trigger | Property | Duration | Easing |
|---|---|---|---|---|
| Hero bg ambient zoom | on load, continuous | `scale 1→1.06` | 8s loop | linear |
| Headline words | on load | `opacity, translateY` | 350ms/word, 120ms stagger | ease-out-expo |
| Headline re-center | after intro | `translate, font-size` | 500ms | ease-out-expo |
| Filter bar pills | after headline / page load | `opacity, translateY` | 400ms, 80ms stagger | ease-out-expo |
| Preview/result card swap | filter or tab change | `opacity crossfade` | 400ms | ease-in-out |
| Split panel morph | scroll-in | `crossfade / clip-path` | 600ms | ease-in-out |
| Sidebar entrance | scroll-in | `opacity, translateX` | 500ms, 100ms stagger | ease-out-expo |
| Sidebar thumb hover | hover | `scale, overlay opacity` | 400ms | ease-in-out |
| Grid card entrance | scroll-in | `opacity, translateY` | 500ms, column stagger | ease-out-expo |
| Grid card hover | hover | `scale, chip translateY` | 450ms, 60ms stagger | ease-in-out |
| Grid card unhover | mouse-leave | reverse of above | 350ms | ease-in-out |
| Grid image cycle (arrows) | click | `crossfade` | 350ms | ease-in-out |

---

## 6. Interactivity Summary

- **Filter pills:** hover brightens border to orange + `box-shadow: 0 0 16px rgba(255,107,0,.35)`.
- **Numeric steppers (Rooms/Timeline):** active fill slides to new value, doesn't snap.
- **Tabs:** underline/fill indicator slides between tabs as a shared-element transition (300ms).
- **Sidebar cards / grid cards:** progressive hover disclosure — never show all info at once; reveal on hover, hide on leave, always animated both directions.
- **Buttons:** outlined glass at rest → fills solid orange with a soft glow on hover → `scale(0.96)` tactile press on click.

---

## 7. Responsive Behavior

- **Desktop (lg+):** exactly as specified above.
- **Tablet:** hero split-screen collapses to one dominant image with the sidebar moving below it as a horizontal row; Projects grid stays 2-column with tighter gaps.
- **Mobile:**
  - Nav → liquid-glass dropdown sheet.
  - Filter bar → horizontally swipeable strip, no wrap.
  - Sidebar cards → swipeable carousel.
  - Projects grid → 1 column; hover states convert to **tap-to-reveal** (first tap shows the stat/CTA overlay, second tap on the CTA navigates).
- Respect `prefers-reduced-motion`: disable the ambient zoom and word stagger; use a plain 300ms crossfade everywhere instead.

---

## 8. Pages Referenced in Nav But Not Shown in the Video

The reference's nav lists **About, Services, Blog, Contact** — none appear in the footage, so nothing below is "observed," it's a consistency recommendation only:
- Build them with the same nav, color system, serif/sans type pairing, and glass/orange component library from Sections 1–2 so the site feels like one product.
- Don't invent motion specs for these from the video — if you want matching intro/scroll animations for them, treat that as a separate follow-up spec once the content for each page is defined.
- No footer appears in the reference either — recommend a simple dark footer (logo, nav repeat, contact, social) styled per Section 1's tokens, but treat its content as open until specified.

---

## 9. Build Notes for Antigravity

- Use a real animation library (Framer Motion / GSAP), not pure CSS keyframes — several transitions are state-driven (filters, tabs, card cycling) and need JS-controlled timelines.
- Build the hero as one component with an internal phase state (`intro | filter | split`) so phases share layout and animate between each other with shared-element transitions.
- Build the filter/tab component **once** and reuse it identically on Home (Phase 2) and the Projects page (4.1) — the reference implies this is the same component in both places.
- Replace all placeholder Russian labels/project names with the finishing & furniture company's real categories, project names, and copy before shipping.
