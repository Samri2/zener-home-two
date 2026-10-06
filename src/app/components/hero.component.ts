import { Component, OnInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    :host {
      display: block;
      height: 200vh; /* Scroll space for Phase 3 */
      position: relative;
    }

    .sticky-container {
      position: sticky;
      top: 0;
      width: 100%;
      height: 100vh;
      background: #0d0d0d;
      overflow: hidden;
    }

    /* =========================================
       PHASE 1 & 2 (Initial Hero & Filters)
       ========================================= */
    .phase12-layer {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s ease;
    }
    
    .sticky-container.phase-3 .phase12-layer {
      transform: translateX(-40%); /* Parallax slide out to the left */
      opacity: 0;
      pointer-events: none;
    }

    .hero-bg-wrapper {
      position: absolute;
      inset: 0;
      z-index: 1;
      overflow: hidden;
    }
    .hero-bg {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform-origin: center;
    }
    .sticky-container.phase-1 .hero-bg {
      animation: kenBurns 12s linear infinite alternate;
    }
    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6) 100%);
      z-index: 2;
    }

    @keyframes kenBurns {
      0% { transform: scale(1); }
      100% { transform: scale(1.06); }
    }

    .content-layer-12 {
      position: relative;
      z-index: 10;
      width: 100%;
      max-width: 1200px;
      padding: 0 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 10vh; /* Push content slightly down */
    }

    .headline-12 {
      font-family: 'Playfair Display', serif;
      font-size: 4.5rem;
      color: #F7F5F0;
      line-height: 1.1;
      text-align: center;
      margin-bottom: 2.5rem;
      transition: font-size 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .sticky-container.phase-2 .headline-12 {
      font-size: 3.5rem;
    }
    
    .word-mask { overflow: hidden; display: inline-block; vertical-align: bottom; }
    .word { display: inline-block; opacity: 0; transform: translateY(14px); animation: revealWord 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    @keyframes revealWord { to { opacity: 1; transform: translateY(0); } }

    .hero-category-bar {
      display: flex;
      justify-content: center;
      gap: 2rem;
      padding: 0.5rem 1rem 0;
      z-index: 10;
      position: relative;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
      pointer-events: none;
    }
    .sticky-container.phase-2 .hero-category-bar {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
      transition-delay: 0.2s;
    }
    .hero-category-tab {
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.12);
      color: rgba(255,255,255,0.8);
      padding: 0.7rem 1.3rem;
      border-radius: 9999px;
      font-size: 0.9rem;
      font-weight: 600;
      letter-spacing: 0.03em;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    .hero-category-tab.active {
      background: rgba(255,255,255,0.95);
      color: #111;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
    }

    /* =========================================
       PHASE 3 (Slide-in Split Layout)
       ========================================= */
    .phase3-layer {
      position: absolute;
      inset: 0;
      z-index: 20;
      display: flex;
      transform: translateX(100%);
      transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
      box-shadow: -20px 0 50px rgba(0,0,0,0.5);
    }
    .sticky-container.phase-3 .phase3-layer {
      transform: translateX(0);
    }

    .p3-left {
      flex: 1; /* Takes remaining space (~75%) */
      position: relative;
      background-image: url('/images/projects/featured-sites/photo-05.jpg'); /* New interior image */
      background-size: cover;
      background-position: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 4rem;
    }
    .p3-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 60%, transparent 100%);
    }
    
    .p3-content {
      position: relative;
      z-index: 2;
      max-width: 600px;
    }
    .p3-headline {
      font-family: 'Playfair Display', serif;
      font-size: 4rem;
      color: #fff;
      line-height: 1.15;
      margin-bottom: 1.5rem;
    }
    .p3-tagline {
      font-family: 'Inter', sans-serif;
      font-size: 1rem;
      color: rgba(255,255,255,0.8);
      letter-spacing: 0.02em;
    }

    .p3-phone {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-family: 'Inter', sans-serif;
      color: #fff;
      font-weight: 500;
      font-size: 1.1rem;
      position: absolute;
      bottom: 2rem;
      left: 4rem;
      z-index: 2;
    }
    .p3-phone svg { width: 20px; height: 20px; stroke: #fff; stroke-width: 2; fill: none; }

    .p3-sidebar {
      width: 400px; /* Fixed width sidebar */
      background: #FFFFFF;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 2rem;
      gap: 1.5rem;
      overflow-y: auto;
    }
    
    .sidebar-card-white {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      cursor: pointer;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid #eaeaea;
    }
    .sidebar-card-white:last-child { border-bottom: none; }
    .sidebar-card-white img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      border-radius: 8px;
      transition: transform 0.4s ease;
    }
    .sc-img-wrapper {
      overflow: hidden;
      border-radius: 8px;
    }
    .sidebar-card-white:hover img { transform: scale(1.05); }
    
    .sc-title { font-family: 'Playfair Display', serif; font-size: 1.25rem; color: #111; font-weight: 600; }
    .sc-link { font-family: 'Inter', sans-serif; font-size: 0.85rem; color: #666; display: flex; align-items: center; gap: 0.25rem; }
    
    /* Mobile responsive adjustments */
    @media (max-width: 1024px) {
      .phase3-layer { flex-direction: column; }
      .p3-left { padding: 3rem 2rem; }
      .p3-headline { font-size: 2.5rem; }
      .p3-footer { left: 2rem; bottom: 1rem; }
      .p3-sidebar { width: 100%; padding: 2rem; }
      .filter-bar-outline { flex-direction: column; gap: 1rem; padding: 1rem; }
      .filter-section:not(:last-child) { padding-right: 0; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.15); padding-bottom: 1rem; width: 100%; justify-content: space-between; }
    }
  `],
  template: `
    <div class="sticky-container" [ngClass]="'phase-' + phase">
      
      <!-- =========================================
           PHASE 1 & 2 (Initial Hero & Filters)
           ========================================= -->
      <div class="phase12-layer">
        <div class="hero-bg-wrapper">
          <img [src]="heroBackgroundImage" class="hero-bg" alt="Hero Background">
          <div class="hero-overlay"></div>
        </div>

        <div class="content-layer-12">
          <h1 class="headline-12">
            @for (word of headlineWords; track $index) {
              <span class="word-mask">
                <span class="word" [style.animation-delay]="($index * 120) + 'ms'">
                  {{ word }}&nbsp;
                </span>
              </span>
            }
          </h1>

          <div class="hero-category-bar" role="tablist" aria-label="Project categories">
            @for (item of categoryCards; track item.id) {
              <button
                type="button"
                class="hero-category-tab"
                [class.active]="selectedCategory === item.id"
                (click)="selectHeroCategory(item.id)"
              >
                {{ item.title }}
              </button>
            }
          </div>
        </div>
      </div>

      <div class="phase3-layer">
        <div class="p3-left" [style.background-image]="'url(' + activeCategory.image + ')'">
          <div class="p3-overlay"></div>

          <div class="p3-content">
            <h1 class="p3-headline">{{ activeCategory.title }} projects</h1>
            <p class="p3-tagline">{{ activeCategory.subtitle }}</p>
          </div>

          <div class="p3-phone">
            <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
            0910900931
          </div>
        </div>

        <div class="p3-sidebar">
          @for (item of categoryCards; track item.id) {
            <div class="sidebar-card-white" (click)="selectHeroCategory(item.id)">
              <div class="sc-img-wrapper">
                <img [src]="item.image" [alt]="item.title">
              </div>
              <div>
                <div class="sc-title">{{ item.title }}</div>
                <div class="sc-link">View projects &rsaquo;</div>
              </div>
            </div>
          }
        </div>
      </div>

    </div>
  `
})
export class HeroComponent implements OnInit, OnDestroy {
  headlineText = "We don't just finish spaces, we build a better life";
  headlineWords = this.headlineText.split(' ');

  readonly categoryCards = [
    {
      id: 'residence',
      title: 'Residence',
      subtitle: 'Luxury residential villas and apartment finishes',
      image: '/img/site%201/475309774_940883151492008_1253919612611226890_n.jpg'
    },
    {
      id: 'commercial',
      title: 'Commercial',
      subtitle: 'Corporate, office, and public-facing interiors',
      image: '/img/site%202/475657750_943204924593164_535887438606507841_n.jpg'
    },
    {
      id: 'hotel',
      title: 'Hotel',
      subtitle: 'Boutique hospitality and banquet spaces',
      image: '/img/site%2010/481999700_963857619194561_5057454708152355117_n.jpg'
    }
  ];

  selectedCategory = 'residence';
  heroBackgroundImage = '/img/site%209/481668492_962375772676079_6746289166109479958_n.jpg';

  get activeCategory() {
    return this.categoryCards.find(item => item.id === this.selectedCategory) ?? this.categoryCards[0];
  }

  phase = 1;
  private timeoutId: any;
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  selectHeroCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
    this.heroBackgroundImage = this.categoryCards.find(item => item.id === categoryId)?.image ?? this.heroBackgroundImage;
    this.phase = 3;

    if (this.isBrowser) {
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.timeoutId = setTimeout(() => {
        if (this.phase === 1) {
          this.phase = 2;
        }
      }, 3000);
    }
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (!this.isBrowser) return;

    if (window.scrollY > 50) {
      this.phase = 3;
    } else if (this.phase === 3) {
      this.phase = 2;
    }
  }

  ngOnDestroy() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
