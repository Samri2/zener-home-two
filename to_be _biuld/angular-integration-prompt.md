# Replace Homepage — Angular Integration Prompt

You are working in an existing Angular project. Attached/referenced is a static, self-contained HTML file (`oakwell-homepage.html`) that is a fully working, finished prototype of the new homepage — all markup, CSS, and vanilla JS behavior is already correct and final. Your job is **not to redesign anything** — it's to port this exact design, motion, and interactivity into this Angular project as the new homepage, replacing what's there now.

---

## 1. Locate & Replace

- Find the existing homepage route/component (likely `home.component.ts/html/scss` or whatever is mapped to the root path `/` in the routing module).
- Replace its entire template and styles with the ported version below. Remove the old homepage markup, styles, and any now-unused component logic — don't leave dead code behind.
- If the old homepage component is referenced elsewhere (shared layout, lazy-loaded module), keep the component's class name and selector the same so routing/imports don't break — only its internals change.

## 2. Port Structure (HTML → Angular Template)

- Split the single HTML file into the component's `.html` template — keep the DOM structure, class names, and element hierarchy exactly as in the reference file.
- Convert the hardcoded `<nav>`, `<section class="hero">`, `<section class="projects">`, and `<footer>` blocks directly into the template. These are static layout — no need to componentize further unless the project's conventions require it (e.g., if there's already a shared `<app-nav>` or `<app-footer>`, integrate this design's markup into those instead of duplicating nav/footer).
- **Projects grid is data-driven:** move the `PROJECTS` array (currently inline JS in the reference file) into the component class as a typed property:
  ```ts
  interface Project {
    name: string;
    cat: string;
    scope: string;
    area: string;
    dur: string;
    type: 'kenburns' | 'interior' | 'exterior-night';
  }
  projects: Project[] = [ /* ...same 8 entries from the reference file... */ ];
  ```
  Render the grid with `*ngFor="let p of projects; let i = index"` instead of the reference's JS `.forEach` DOM-building — this is the one place you should genuinely translate the approach (imperative → declarative), not just copy-paste.

## 3. Port Behavior (vanilla JS → Angular)

Rebuild each behavior using Angular idioms instead of raw `addEventListener`/`classList`:

| Reference (vanilla JS) | Angular equivalent |
|---|---|
| Hero phase state (`data-phase` attribute + `setPhase()`) | Component property `phase: 'a' \| 'b' \| 'c' = 'a'`, bound via `[attr.data-phase]="phase"` on the hero element; `setTimeout` chain lives in a private method, started in `ngAfterViewInit()` |
| Word-by-word headline reveal | Keep as a small helper method that splits the headline string into words and renders them with `*ngFor="let w of headlineWords; let i = index"` and `[style.animation-delay.s]="i * 0.11"` — same visual effect, Angular-rendered |
| Nav scroll class toggle | `@HostListener('window:scroll')` on the nav component/element, toggling a `scrolled` boolean bound via `[class.scrolled]="scrolled"` |
| Mobile hamburger open/close | Component boolean `menuOpen`, toggled via `(click)`, bound via `[class.open]="menuOpen"` on both the button and the sheet |
| Tab / filter pill clicks | Component state (`activeTab`, `activeRoomStep`, etc.) updated via `(click)` handlers, bound via `[class.active]` — don't leave these as raw DOM class mutations |
| Card hover stat reveal / arrows cycling images | Hover reveal can stay pure CSS (`:hover`), exactly as in the reference — no JS needed there. The prev/next arrow image-cycle needs component state: track a per-card index (e.g., `showAlt: boolean[]` matching the `projects` array, or a small state object per card) and toggle it via `(click)="toggleImage(i)"`, bound via `[class.alt-visible]` or `[style.opacity]` |
| `IntersectionObserver` scroll-reveal on grid cards | Keep as-is via `ElementRef`/`Renderer2` in `ngAfterViewInit()`, using `@ViewChildren` to get all `.card` elements — this is legitimately DOM-API territory, no cleaner Angular-native equivalent. **Remember to `disconnect()` the observer in `ngOnDestroy()`.** |
| `matchMedia('(prefers-reduced-motion: reduce)')` | Same API call, fine to use directly in the component; also disconnect/clear any timers in `ngOnDestroy()` when this is true |

**Cleanup requirement:** every `setTimeout`/`setInterval` and the `IntersectionObserver` must be torn down in `ngOnDestroy()` — the reference file didn't need this (it's a static page that never unmounts), but a routed Angular component does.

## 4. Port Styles (CSS → SCSS)

- Move the `<style>` block into the component's `.scss` file as-is — the CSS itself needs no rewriting, only relocation.
- **Global vs. component-scoped:**
  - The `:root` CSS custom properties (`--bg`, `--ink`, `--accent`, etc.) should move to the project's global stylesheet (`styles.scss`) if other pages/components should share this palette; otherwise keep them under `:host` in the component SCSS so they stay scoped.
  - The Google Fonts `<link>` tags (Fraunces + Inter) belong in `index.html`'s `<head>`, not the component — add them there if they're not already present, and check the project isn't already loading conflicting fonts.
  - `@keyframes` (`wordIn`, `kenburns`) work fine inside a component's SCSS under Angular's default view encapsulation — no special handling needed.
- Double-check the project's global styles don't already set `box-sizing`, `*` margin resets, or a conflicting `:root` — merge rather than duplicate if so.

## 5. What NOT to Change

- Don't "improve" or restyle anything — colors, spacing, timing values (350ms/word, 3.4s/5.2s/6.2s phase durations, etc.), and copy should transfer exactly as they are in the reference file.
- Don't swap the CSS/SVG placeholder "photography" (gradient sky, roofline silhouette, window mullions) for stock images unless real project photos are provided separately — flag this as a follow-up rather than inventing image sources.
- Don't add extra Angular Material / component-library chrome (buttons, cards, dropdowns) — every interactive element should keep its exact current markup and class names so the CSS keeps working unmodified.

## 6. Acceptance Check

Before considering this done, confirm:
- [ ] Hero still auto-cycles through all 3 phases and pauses on mouse-enter, resumes on mouse-leave.
- [ ] Headline still does the word-by-word reveal every time phase `a` plays (including on the loop, not just first load).
- [ ] Mobile breakpoint still collapses nav into the glass dropdown sheet, and grid cards still support tap-to-reveal on touch devices.
- [ ] No console errors on route enter/leave (navigating away and back shouldn't leak timers or throw from a disconnected observer).
- [ ] `prefers-reduced-motion` still disables the ambient zoom and word-stagger, same as the reference file.
