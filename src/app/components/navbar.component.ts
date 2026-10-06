import {
  Component, inject, signal, ViewChild, ElementRef,
  AfterViewInit, OnDestroy, HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { TranslationService } from '../core/services/translation.service';
import { BrandLogoComponent } from '../shared/components/brand-logo.component';
import { filter } from 'rxjs/operators';
import { liquidGlass } from '../core/utils/liquid-glass';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, BrandLogoComponent],
  styles: [`
    /* =========================================
       HORIZONTAL NAV LINKS (Always visible in navbar)
       ========================================= */
    .nav-item {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 6px 12px;
      border-radius: 9999px;
      color: rgba(255, 255, 255, 0.92);
      font-size: 0.85rem;
      font-weight: 600;
      white-space: nowrap;
      text-decoration: none;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.85), 0 0 10px rgba(0, 0, 0, 0.6);
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      flex-shrink: 0;
    }

    @media (min-width: 640px) {
      .nav-item {
        padding: 6px 14px;
        font-size: 0.875rem;
      }
    }

    @media (min-width: 1024px) {
      .nav-item {
        padding: 7px 16px;
        font-size: 0.92rem;
      }
    }

    .nav-item:hover {
      color: #FF8C42;
      background: rgba(255, 255, 255, 0.12);
      transform: translateY(-1px);
    }

    /* Active page: orange text with glowing badge highlight */
    .nav-item.active-link {
      color: #FF7A3D;
      background: rgba(255, 122, 61, 0.18);
      box-shadow: inset 0 0 0 1px rgba(255, 122, 61, 0.4), 0 2px 10px rgba(255, 122, 61, 0.25);
      font-weight: 700;
    }

    /* Tap / Click state feedback */
    .nav-item:active {
      transform: scale(0.94);
      filter: brightness(1.2);
      box-shadow: 0 0 14px rgba(255, 122, 61, 0.6);
    }

    /* =========================================
       INTERACTIVE BUTTON FEEDBACK
       ========================================= */
    .btn-feedback {
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }
    .btn-feedback:hover {
      transform: translateY(-1px);
    }
    .btn-feedback:active {
      transform: scale(0.93) !important;
      filter: brightness(1.25);
    }

    .btn-cta {
      background: linear-gradient(135deg, #CC4C0F 0%, #E55C1A 100%);
      color: #FFFFFF;
      box-shadow: 0 6px 18px rgba(204, 76, 15, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.2);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
    }
    .btn-cta:hover {
      background: linear-gradient(135deg, #E55C1A 0%, #FF7A3D 100%);
      box-shadow: 0 8px 22px rgba(229, 92, 26, 0.55), inset 0 1px 1px rgba(255, 255, 255, 0.6);
    }
    .btn-cta:active {
      box-shadow: 0 0 18px rgba(255, 122, 61, 0.8) !important;
    }

    /* =========================================
       LANGUAGE DROPDOWN
       ========================================= */
    .lang-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      min-width: 140px;
      border-radius: 18px;
      overflow: hidden;
      padding: 6px;
      z-index: 200;
      animation: glassSlideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .lang-option {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      font-size: 13px;
      font-weight: 600;
      color: rgba(255, 255, 255, 0.9);
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.18s ease;
      white-space: nowrap;
      text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
    }
    .lang-option:hover {
      background: rgba(255, 255, 255, 0.14);
      color: #FFFFFF;
      transform: translateX(2px);
    }
    .lang-option.active {
      color: #FF7A3D;
      background: rgba(255, 122, 61, 0.18);
      font-weight: 700;
    }
    .lang-option:active {
      transform: scale(0.96);
    }

    @keyframes glassSlideIn {
      from {
        opacity: 0;
        transform: translateY(-8px) scale(0.97);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
  `],
  template: `
    <!-- Floating Frosted Glass Navbar Wrapper -->
    <header
      class="fixed top-0 left-0 right-0 z-50 w-full pt-3 sm:pt-4 px-2 sm:px-6 lg:px-12"
      style="pointer-events: none;"
    >
      <!-- Main Frosted Glass Pill with Horizontal Layout -->
      <div
        #glassContainer
        class="liquid-glass rounded-full px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between max-w-7xl mx-auto relative gap-2 sm:gap-4"
        style="pointer-events: auto;"
      >
        <!-- ── Left: Brand Logo ── -->
        <a
          routerLink="/"
          (click)="scrollToTop()"
          class="flex items-center flex-shrink-0 btn-feedback"
          style="text-decoration: none;"
        >
          <app-brand-logo></app-brand-logo>
        </a>

        <!-- ── Center: Horizontal Navigation Links (Always on Navbar) ── -->
        <nav class="flex items-center gap-1 sm:gap-2 lg:gap-3 flex-1 justify-center overflow-x-auto scrollbar-none mx-1 sm:mx-3 py-0.5">
          @for (link of navLinks; track link.id) {
            <a
              [routerLink]="link.path"
              routerLinkActive="active-link"
              [routerLinkActiveOptions]="{ exact: link.exact }"
              class="nav-item"
            >
              {{ isAm() ? link.nameAm : link.nameEn }}
            </a>
          }
        </nav>

        <!-- ── Right: Language Dropdown + CTA ── -->
        <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">

          <!-- Language Selector Dropdown -->
          <div class="relative">
            <button
              (click)="langOpen.update(v => !v)"
              class="btn-feedback flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-md cursor-pointer"
              style="text-shadow: 0 1px 3px rgba(0,0,0,0.8);"
              aria-label="Language selector"
            >
              <span class="text-[#FF7A3D] font-extrabold">•</span>
              <span>{{ isAm() ? 'AM' : 'EN' }}</span>
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                [style.transform]="langOpen() ? 'rotate(180deg)' : 'rotate(0)'"
                style="transition: transform 0.22s ease; margin-left: 2px;"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>

            <!-- Language Dropdown Panel -->
            @if (langOpen()) {
              <div class="lang-dropdown liquid-glass">
                <div
                  class="lang-option"
                  [class.active]="!isAm()"
                  (click)="setLang('en')"
                >
                  <span class="text-base">🇺🇸</span>
                  <span>English</span>
                </div>
                <div
                  class="lang-option"
                  [class.active]="isAm()"
                  (click)="setLang('am')"
                >
                  <span class="text-base">🇪🇹</span>
                  <span>አማርኛ</span>
                </div>
              </div>
            }
          </div>

          <!-- Get in Touch CTA Button -->
          <a
            routerLink="/contact"
            class="inline-flex items-center gap-1.5 sm:gap-2 btn-feedback btn-cta text-xs sm:text-sm font-bold px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-full whitespace-nowrap"
            style="text-decoration: none;"
          >
            <span>{{ isAm() ? 'ይገናኙን' : 'Get in Touch' }}</span>
            <svg class="w-3.5 h-3.5 hidden sm:inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </a>

        </div>
      </div>

    </header>
  `
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  private translation = inject(TranslationService);
  private router      = inject(Router);

  @ViewChild('glassContainer') glassContainer!: ElementRef<HTMLElement>;
  private glassInstance: any;

  readonly isAm      = this.translation.isAmharic;
  readonly langOpen   = signal<boolean>(false);

  readonly navLinks = [
    { id: 'home',      path: '/',          exact: true,  nameEn: 'Home',      nameAm: 'መነሻ'       },
    { id: 'furniture', path: '/furniture', exact: false, nameEn: 'Furniture', nameAm: 'ፈርኒቸር'    },
    { id: 'projects',  path: '/projects',  exact: false, nameEn: 'Projects',  nameAm: 'ፕሮጀክቶች'   },
    { id: 'services',  path: '/services',  exact: false, nameEn: 'Services',  nameAm: 'አገልግሎቶች' },
    { id: 'about',     path: '/about',     exact: false, nameEn: 'About Us',  nameAm: 'ስለ እኛ'    },
  ];

  constructor() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0 });
        this.langOpen.set(false);
      });
  }

  ngAfterViewInit(): void {
    if (this.glassContainer) {
      this.glassInstance = liquidGlass(this.glassContainer.nativeElement, {
        scale: -140,
        blur: 12,
        saturate: 2.2,
        fallbackBlur: 36
      });
    }
  }

  ngOnDestroy(): void {
    this.glassInstance?.destroy();
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent): void {
    const el = e.target as HTMLElement;
    if (!el.closest('.relative') && !el.closest('[aria-label="Language selector"]')) {
      this.langOpen.set(false);
    }
  }

  setLang(lang: 'en' | 'am'): void {
    this.translation.setLanguage(lang);
    this.langOpen.set(false);
  }

  scrollToTop(): void { window.scrollTo({ top: 0, behavior: 'smooth' }); }
}
