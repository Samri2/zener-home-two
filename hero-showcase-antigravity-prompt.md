# Hero + Project Showcase — Antigravity Build Prompt
*Reference: architecture/timber-construction site motion reel ("woodland"). Rebuild this exact layout, motion, and interaction system — content swapped for a finishing & furniture company.*

---

## 1. Project Overview

Build a 2-phase hero section that morphs on load from a full-bleed cinematic intro into a filterable search/showcase state, followed by a scroll-triggered split-screen "about" state with a sticky category sidebar, and finally a hover-rich project grid. The whole system is built around **slow, confident motion** (400–900ms eases, nothing snappy), **serif display type over photography**, and **hover states that reveal information progressively** rather than showing it all at once.

Do not simplify this into a static hero with a CSS `:hover`. The reference is a *sequenced motion system* — build it with a timeline (GSAP, Framer Motion, or CSS animations chained with `animation-delay`) so the phases play in order on load and hover states are fully interactive afterward.

---

## 2. Global Style System

| Token | Value | Notes |
|---|---|---|
| Background | `#0d0d0d` – `#161616` | Near-black, photography does the color work |
| Text primary | `#F7F5F0` (warm off-white) | Used over dark photo overlays |
| Headline font | Serif (e.g. "Playfair Display", "Fraunces", or "GT Super") | Large, elegant, NOT bold-sans |
| Body/UI font | Clean sans (e.g. "Inter", "Neue Haas") | Nav, buttons, filters, captions |
| Accent (brand) | `#FF6B00` / `#FF7A3D` | Reserved for CTA, active filter state, active dot indicators, hover glows |
| Glass surfaces | `backdrop-filter: blur(24–30px) saturate(180%)`, `background: rgba(255,255,255,0.06)`, `border: 1px solid rgba(255,255,255,0.14)` | Used for nav pill, filter dropdowns, sidebar cards |
| Overlay gradient (readability) | `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 45%, transparent 75%)` | Behind all text-over-image |
| Corner radius | 14–20px cards, 999px pills/buttons | |
| Motion easing | `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-expo) for entrances; `ease-in-out` for hover | |

---

## 3. Section A — Navigation Bar

- Fixed/sticky, transparent over hero, transitions to glass-blurred background after ~40px scroll.
- Left: logo (wordmark).
- Center-right: horizontal menu — About / Services / Projects / Journal / Contact.
- Right: search icon + a filled pill CTA button ("Start a Project") in accent orange — **this button only appears once Phase 2 (filter state) begins**, see timeline below.
- On load, nav fades in first (`opacity 0→1`, `translateY(-12px→0)`, 500ms, delay 0ms).

---

## 4. Section B — Hero Phase 1: Cinematic Intro (0.0s – 3.0s)

**Layout:** Full-bleed background photo (finished project — exterior shot, dusk/golden-hour lighting). No split yet. Headline is large, left-aligned, vertically centered-low.

**Motion sequence (play once on page load):**
1. `0.0s` — Background image is already visible (subtle slow-zoom `scale(1.0 → 1.06)` over 8s, continuous, `linear`, running the whole time the image is on screen — a Ken Burns ambient effect).
2. `0.3s` — Nav fades/slides in (see above).
3. `0.6s` — Headline begins a **word-by-word reveal**: each word of the headline fades up (`opacity 0→1`, `translateY(14px→0)`, 350ms per word, `~120ms stagger` between words) until the full line is built, e.g.: "We" → "We don't" → "We don't finish" → "...spaces. We build a better life." Do this with a `<span>` per word, animate each span's transform/opacity individually.
4. `~2.4s` — Headline fully assembled and holds.

---

## 5. Section B — Hero Phase 2: Filter / Search State (3.0s – 8.0s)

**Trigger:** immediately follows Phase 1 headline completion (same hero, no scroll needed).

**Motion sequence:**
1. `3.0s` — Headline smoothly **re-centers** (from left-aligned-low to horizontally centered, slightly higher) — animate `transform: translate` over 500ms, ease-out-expo. Font-size may reduce slightly (e.g. 64px → 48px) to make room below.
2. `3.4s` — The "Start a Project" pill button fades/scales into the nav (`opacity 0→1`, `scale 0.9→1`, 300ms).
3. `3.6s` — A **category tab row** fades/slides up beneath the headline: pill-style tabs — `All / Interiors / Furniture / Custom Finishes` — with the 2nd tab pre-selected (underline or filled-pill active state in accent orange).
4. `4.0s` — A **filter bar** (glass pills) slides/fades in directly under the tabs, left-to-right stagger (~80ms between each pill):
   - `Style` dropdown (e.g. "Modern Minimalist")
   - `Area / Scope` dropdown (e.g. "50–150 m²")
   - `Rooms` — numeric stepper pills `1 2 [3] 4 5`, active number filled in accent orange
   - `Timeline` — numeric stepper pills `1 [2] 3`, same active-fill treatment
5. `4.6s` — Two preview cards **crossfade + slide up** (`translateY(20px→0)`, `opacity 0→1`, 500ms, 100ms stagger between the two) directly below the filter bar, side-by-side, showing two project results matching the active filters. These should visually **swap with a crossfade (400ms) whenever a filter/tab changes** — build this as a live-feeling filter, not just a decorative animation.

**Interactivity (persists after intro finishes):**
- Hovering a filter pill: border brightens to accent orange, subtle `box-shadow: 0 0 16px rgba(255,107,0,0.35)`.
- Clicking a numeric stepper (Rooms/Timeline): active state animates the filled pill sliding to the new number (`transform: translateX`, 250ms ease) rather than an abrupt swap.
- Clicking a category tab: underline/fill indicator slides to the new tab position (shared-element transition, 300ms), preview cards crossfade to new results.

---

## 6. Section C — Split Showcase + Sidebar (scroll-triggered, or 8.0s–12.0s if auto-playing)

**Trigger:** on scroll into view (IntersectionObserver, threshold 0.3) OR as the natural continuation if this is a looping showcase reel.

**Layout change:**
- Background image **morphs from full-bleed to a two-panel split**: left panel = exterior night shot (dramatic uplighting), right panel = interior detail shot (hallway/showroom/finish detail). Use a wipe or crossfade transition (600ms) between the two image states — a vertical seam divides them, seam can be a soft 2–4px light diffusion line, not a hard edge.
- Headline drops to a smaller left-aligned position over the left panel; a **tagline line** fades in beneath it (e.g. "Custom finishing & furniture, made to fit your space").
- Bottom-left: contact info (phone/email icon + text). Bottom-center: social icons, low-opacity (`0.6`) until hovered (`1.0` + `scale(1.1)`).
- **Right-edge sidebar** slides in from the right (`translateX(40px→0)`, `opacity 0→1`, 500ms, ease-out-expo): a vertical stack of **3 category cards**, each = thumbnail image + label (e.g. "Solid Wood Finishes") + "Learn more →" link. Stagger each card's entrance by 100ms.

**Sidebar hover interaction (this is the key interactive moment from the reference):**
- On hovering a sidebar thumbnail: image scales `1.0 → 1.08` (400ms ease), a circular glass button fades in centered on the thumbnail reading "View" (`opacity 0→1`, `scale(0.8→1)`, 250ms), and a soft dark overlay (`rgba(0,0,0,0.25)`) fades over the image so the button and label stay legible.
- Clicking navigates to that category's project list.

---

## 7. Section D — Project Grid (below the hero, standard scroll section)

**Layout:** 2-column grid (1-column on mobile) of large project cards. Each card:
- Full-bleed project photo, `object-fit: cover`, fixed aspect ratio (e.g. 4:3).
- Bottom gradient overlay for legibility.
- Project name in the serif display font, bottom-left (e.g. "Saint Tropez").
- Subtitle beneath it in small sans caps (e.g. "Custom Finish — Residential").

**Hover interaction (exact reference behavior — build this precisely):**
1. On hover, the card image scales `1.0 → 1.04` (450ms ease) and darkens slightly (overlay opacity `0.3 → 0.5`).
2. Three data chips **fade up** from the bottom (`translateY(10px→0)`, `opacity 0→1`, staggered 60ms apart): e.g. `Floors: 2` · `Area: 584 m²` · `Rooms: 3`.
3. A pill button **"View Details"** fades in above the chips (outlined style, glassy background, fills solid orange on its own hover).
4. Left/right **arrow icons** fade in at the card's vertical center-edges — clicking them cycles through 2–3 alternate images of that *same* project in place (crossfade, 350ms) without navigating away or reloading the grid.
5. On mouse-leave: everything reverses in the same durations (don't just cut it — reverse the transition).

**Grid behavior:** infinite-scroll or "Load more" pagination; new cards entering the viewport fade/slide up (`translateY(30px→0)`, `opacity 0→1`, IntersectionObserver-triggered, 500ms, staggered by column).

---

## 8. Motion Timing Reference Table

| Element | Trigger | Property | Duration | Easing |
|---|---|---|---|---|
| Hero bg | on load, continuous | `scale 1→1.06` | 8s loop | linear |
| Headline words | on load | `opacity, translateY` | 350ms/word, 120ms stagger | ease-out-expo |
| Headline re-center | after intro | `translate, font-size` | 500ms | ease-out-expo |
| Filter bar pills | after headline | `opacity, translateY` | 400ms, 80ms stagger | ease-out-expo |
| Preview card swap | filter change | `opacity crossfade` | 400ms | ease-in-out |
| Split panel morph | scroll-in | `clip-path or crossfade` | 600ms | ease-in-out |
| Sidebar entrance | scroll-in | `opacity, translateX` | 500ms, 100ms stagger | ease-out-expo |
| Sidebar thumb hover | hover | `scale, overlay opacity` | 400ms | ease-in-out |
| Grid card hover | hover | `scale, chip translateY` | 450ms, 60ms stagger | ease-in-out |
| Grid card unhover | mouse-leave | reverse of above | 350ms | ease-in-out |

---

## 9. Responsive Behavior

- **Desktop (lg+):** all phases/layouts as described.
- **Tablet:** split-screen collapses to a single dominant image with sidebar moving below it (horizontal scroll row instead of vertical stack).
- **Mobile:** 
  - Nav collapses into the liquid-glass dropdown menu (existing navbar spec).
  - Filter bar becomes a horizontally swipeable strip (no wrap).
  - Sidebar cards become a horizontally swipeable carousel.
  - Grid becomes 1 column; hover interactions convert to **tap-to-reveal** (first tap shows the info overlay, second tap on the CTA navigates).

---

## 10. Build Notes for Antigravity

- Use a real animation library (Framer Motion / GSAP) rather than pure CSS keyframes — several of these transitions are state-driven (filter results, tab switching) and need JS-controlled timelines, not just on-load CSS.
- Structure the hero as a single component with an internal phase state (`intro | filter | split`) so the three phases share layout and can animate between each other with shared-element transitions.
- Respect `prefers-reduced-motion`: disable the continuous Ken Burns zoom and word-by-word stagger, replace with a simple 300ms crossfade.
- Replace all placeholder Russian labels with the finishing & furniture company's actual category names, project names, and copy before shipping.
