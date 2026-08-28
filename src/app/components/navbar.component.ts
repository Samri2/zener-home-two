import { Component, inject, signal, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { TranslationService } from '../core/services/translation.service';
import { ThemeService } from '../core/services/theme.service';
import { IconComponent } from '../shared/components/icon.component';
import { BrandLogoComponent } from '../shared/components/brand-logo.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, BrandLogoComponent],
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
    .navbar-spacer {
      display: block !important;
      height: var(--navbar-height, 76px) !important;
      min-height: var(--navbar-height, 76px) !important;
      width: 100%;
      flex-shrink: 0;
      pointer-events: none;
    }
    @media (max-width: 1023px) {
      .navbar-spacer {
        height: var(--navbar-height, 76px) !important;
        min-height: var(--navbar-height, 76px) !important;
      }
    }
    @media (max-width: 640px) {
      .navbar-spacer {
        height: var(--navbar-height, 76px) !important;
        min-height: var(--navbar-height, 76px) !important;
      }
    }
  `],
  template: `
    <!-- 1. Single Unified Fixed Frozen Glass Header -->
    <header 
      #navbarHeader
      class="navbar-header fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 glass-nav border-b border-[#F0E6DD]/80 shadow-sm"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        
        <!-- Left: Brand Logo & Wordmark -->
        <a 
          routerLink="/"
          (click)="scrollToTop()"
          class="flex items-center text-left focus:outline-none"
        >
          <app-brand-logo></app-brand-logo>
        </a>

        <!-- Center: Navigation Links Pill Container (Desktop) -->
        <nav class="hidden lg:flex items-center p-1.5 rounded-full border border-orange-300/80 bg-[#FDF6F0]/60 dark:bg-white/10 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          @for (link of navLinks(); track link.id) {
            <a
              [routerLink]="link.path"
              [routerLinkActive]="'bg-[#CC4C0F] text-white font-bold shadow-sm'"
              [routerLinkActiveOptions]="{ exact: link.exact }"
              class="px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 text-[#2D3748] dark:text-white hover:text-[#CC4C0F] dark:hover:text-[#FF783E]"
            >
              {{ link.name }}
            </a>
          }
        </nav>

        <!-- Right Controls: Theme, Language, Get in Touch & Mobile Toggle -->
        <div class="flex items-center gap-2.5 sm:gap-4">
          
          <!-- Light / Dark Mode Toggle Button -->
          <button
            (click)="toggleTheme()"
            class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#FDF6F0] dark:bg-[#2A2A2A] hover:bg-orange-100 dark:hover:bg-[#383838] text-gray-800 dark:text-white border border-orange-200/60 dark:border-white/10 transition-colors shadow-sm"
            [attr.aria-label]="isDark() ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            [title]="isDark() ? 'Light Mode' : 'Dark Mode'"
          >
            <app-icon [name]="isDark() ? 'sun' : 'moon'" customClass="w-4 h-4 text-orange-500"></app-icon>
          </button>

          <!-- Language Switcher Pill -->
          <button
            (click)="toggleLang()"
            class="inline-flex items-center gap-1.5 bg-[#FDF6F0] dark:bg-[#2A2A2A] hover:bg-orange-100 dark:hover:bg-[#333333] text-gray-800 dark:text-white px-3 py-1.5 rounded-full text-[11px] font-semibold border border-orange-200/60 dark:border-white/10 transition-colors shadow-sm"
            aria-label="Toggle language"
          >
            <app-icon name="globe" customClass="w-3.5 h-3.5 text-[#CC4C0F]"></app-icon>
            <span>{{ isAm() ? 'English' : 'አማርኛ' }}</span>
          </button>

          <!-- Right Action Button: Get in Touch (Desktop) -->
          <div class="hidden sm:flex items-center">
            <a
              routerLink="/contact"
              class="inline-flex items-center gap-2 bg-[#CC4C0F] hover:bg-[#B33E08] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-md shadow-orange-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <app-icon name="message-square" customClass="w-4 h-4"></app-icon>
              <span>{{ isAm() ? 'ይገናኙን' : 'Get in Touch' }}</span>
            </a>
          </div>

          <!-- Mobile Hamburger Menu Toggle -->
          <button
            (click)="mobileMenuOpen.update(v => !v)"
            class="lg:hidden p-2 text-gray-800 dark:text-white hover:text-[#CC4C0F] rounded-xl hover:bg-orange-50 dark:hover:bg-zinc-800 transition-colors focus:outline-none"
            aria-label="Toggle navigation"
          >
            <app-icon [name]="mobileMenuOpen() ? 'x' : 'menu'" customClass="w-6 h-6"></app-icon>
          </button>
        </div>

      </div>

      <!-- Mobile Menu Dropdown (Absolute overlay) -->
      @if (mobileMenuOpen()) {
        <div class="absolute top-full left-0 right-0 z-50 lg:hidden px-4 pt-1 pb-6">
          <div class="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-orange-100 dark:border-zinc-800 animate-in fade-in slide-in-from-top-4 duration-200">
            <div class="flex flex-col space-y-2">
              @for (link of navLinks(); track link.id) {
                <a
                  [routerLink]="link.path"
                  (click)="mobileMenuOpen.set(false); scrollToTop()"
                  routerLinkActive="bg-[#CC4C0F] text-white"
                  [routerLinkActiveOptions]="{ exact: link.exact }"
                  class="text-left px-4 py-3 rounded-2xl text-sm font-bold text-gray-800 dark:text-white hover:bg-orange-50 dark:hover:bg-zinc-800 hover:text-[#CC4C0F] transition-colors"
                >
                  {{ link.name }}
                </a>
              }

              <a
                routerLink="/contact"
                (click)="mobileMenuOpen.set(false); scrollToTop()"
                routerLinkActive="bg-[#CC4C0F] text-white"
                class="text-left px-4 py-3 rounded-2xl text-sm font-bold text-[#CC4C0F] bg-orange-50 dark:bg-zinc-800 hover:bg-orange-100 transition-colors"
              >
                {{ isAm() ? 'ይገናኙን (Get in Touch)' : 'Get in Touch (Contact)' }}
              </a>

              <!-- Mobile Call Button -->
              <div class="pt-3 flex flex-col gap-2">
                <a
                  href="tel:+251910900931"
                  class="flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#1A1A1A] text-white font-bold text-xs shadow-md"
                >
                  <app-icon name="phone" customClass="w-4 h-4 text-orange-400"></app-icon>
                  <span>Call +251 910 900 931</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      }
    </header>

    <!-- 2. Responsive Layout Spacer (Dynamically matches the exact height of the unified header) -->
    <div class="navbar-spacer"></div>
  `
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('navbarHeader') navbarHeader?: ElementRef<HTMLElement>;

  private translation = inject(TranslationService);
  private themeService = inject(ThemeService);
  private router = inject(Router);

  private resizeObserver?: ResizeObserver;
  private resizeListener?: () => void;

  readonly isAm = this.translation.isAmharic;
  readonly isDark = this.themeService.isDark;
  mobileMenuOpen = signal<boolean>(false);

  readonly socialLinks = [
    { name: 'Telegram', icon: 'telegram', url: 'https://t.me/zenerhome' },
    { name: 'TikTok', icon: 'tiktok', url: 'https://tiktok.com/@zenerhome' },
    { name: 'Facebook', icon: 'facebook', url: 'https://facebook.com/zenerhome' },
    { name: 'Instagram', icon: 'instagram', url: 'https://instagram.com/zenerhome' },
    { name: 'YouTube', icon: 'youtube', url: 'https://youtube.com/@zenerhome' },
  ];

  navLinks = signal<any[]>([]);

  constructor() {
    this.updateNavLinks();
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      this.mobileMenuOpen.set(false);
    });
  }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined' && this.navbarHeader?.nativeElement) {
      const updateHeight = () => {
        const el = this.navbarHeader?.nativeElement;
        if (el) {
          const barHeight = el.offsetHeight;
          if (barHeight > 0) {
            document.documentElement.style.setProperty('--navbar-height', `${barHeight}px`);
          }
        }
      };

      updateHeight();

      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(() => {
          updateHeight();
        });
        this.resizeObserver.observe(this.navbarHeader.nativeElement);
      }

      this.resizeListener = () => updateHeight();
      window.addEventListener('resize', this.resizeListener);
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.resizeListener && typeof window !== 'undefined') {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  updateNavLinks(): void {
    const isAm = this.isAm();
    this.navLinks.set([
      { id: 'home', path: '/', exact: true, name: isAm ? 'መነሻ' : 'Home' },
      { id: 'furniture', path: '/furniture', exact: false, name: isAm ? 'ፈርኒቸር' : 'Furniture' },
      { id: 'projects', path: '/projects', exact: false, name: isAm ? 'ፕሮጀክት' : 'Project' },
      { id: 'services', path: '/services', exact: false, name: isAm ? 'አገልግሎቶች' : 'Services' },
      { id: 'about', path: '/about', exact: false, name: isAm ? 'ስለ እኛ' : 'About Us' },
    ]);
  }

  toggleLang(): void {
    this.translation.toggleLanguage();
    this.updateNavLinks();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
