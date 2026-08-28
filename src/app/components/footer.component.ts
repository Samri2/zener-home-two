import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../shared/components/icon.component';
import { BrandLogoComponent } from '../shared/components/brand-logo.component';
import { ModalService } from '../core/services/modal.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, BrandLogoComponent],
  template: `
    <footer class="bg-[#1A1A1A] text-white/80 pt-20 pb-10 border-t border-orange-500/20 relative overflow-hidden">
      
      <!-- Ambient glow -->
      <div class="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        <!-- Top 4-Column Layout -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-white/10">
          
          <!-- Col 1: Brand & Description (4 cols) -->
          <div class="lg:col-span-4 space-y-4">
            <app-brand-logo></app-brand-logo>

            <p class="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
              Creating luxurious, sophisticated interiors and bespoke furniture of timeless quality, extraordinary craftsmanship, and strict budget adherence across Ethiopia.
            </p>

            <!-- Social Icons with SVG -->
            <div class="flex items-center gap-2.5 pt-2">
              @for (s of socialLinks; track s.name) {
                <a
                  [href]="s.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-9 h-9 rounded-full bg-white/10 hover:bg-orange-500 text-white flex items-center justify-center transition-all shadow-sm hover:scale-110"
                  [attr.aria-label]="s.name"
                  [title]="s.name"
                >
                  <app-icon [name]="s.icon" customClass="w-4 h-4"></app-icon>
                </a>
              }
            </div>
          </div>

          <!-- Col 2: Navigation Links (3 cols) -->
          <div class="lg:col-span-3 space-y-3">
            <h4 class="text-sm font-bold uppercase tracking-wider text-white">Explore Pages</h4>
            <ul class="space-y-2 text-xs sm:text-sm text-white/70">
              <li>
                <a routerLink="/" (click)="scrollToTop()" class="hover:text-orange-400 transition-colors">
                  Home (Curated Collections)
                </a>
              </li>
              <li>
                <a routerLink="/furniture" (click)="scrollToTop()" class="hover:text-orange-400 transition-colors">
                  Furniture & Woodworks
                </a>
              </li>
              <li>
                <a routerLink="/projects" (click)="scrollToTop()" class="hover:text-orange-400 transition-colors">
                  Projects & Video Reels
                </a>
              </li>
              <li>
                <a routerLink="/services" (click)="scrollToTop()" class="hover:text-orange-400 transition-colors">
                  Turnkey Finishing Services
                </a>
              </li>
              <li>
                <a routerLink="/about" (click)="scrollToTop()" class="hover:text-orange-400 transition-colors">
                  About Us & Certified License
                </a>
              </li>
              <li>
                <a routerLink="/contact" (click)="scrollToTop()" class="hover:text-orange-400 transition-colors text-orange-400 font-semibold">
                  Get in Touch (Contact)
                </a>
              </li>
            </ul>
          </div>

          <!-- Col 3: Legal & Certifications (2 cols) -->
          <div class="lg:col-span-2 space-y-3">
            <h4 class="text-sm font-bold uppercase tracking-wider text-white">Certifications</h4>
            <ul class="space-y-2 text-xs sm:text-sm text-white/70">
              <li><span>TIN: 0058592635</span></li>
              <li><span>Addis Ababa Trade Bureau</span></li>
              <li><span>License: 14/706/3773177</span></li>
              <li><span>Category 51212 Finishing</span></li>
              <li><span>Commercial Reg: 894954</span></li>
              <li>
                <button
                  (click)="openLicenseModal()"
                  class="text-orange-400 hover:text-orange-300 font-semibold underline text-xs pt-1 block"
                >
                  View License Document →
                </button>
              </li>
            </ul>
          </div>

          <!-- Col 4: Contact & Office (3 cols) -->
          <div class="lg:col-span-3 space-y-3">
            <h4 class="text-sm font-bold uppercase tracking-wider text-white">Head Office</h4>
            <div class="space-y-2 text-xs sm:text-sm text-white/70">
              <p>Lebu / Varnero / Bole, Addis Ababa, Ethiopia</p>
              <p>
                <a href="tel:+251910900931" class="hover:text-orange-400 transition-colors font-medium">
                  +251 910 900 931
                </a>
                <br />
                <a href="tel:+251922166213" class="hover:text-orange-400 transition-colors font-medium">
                  +251 922 166 213
                </a>
              </p>
              <p>
                <a href="mailto:zenerhomeplc@gmail.com" class="hover:text-orange-400 transition-colors">
                  zenerhomeplc&#64;gmail.com
                </a>
              </p>
              <div class="pt-2">
                <a
                  routerLink="/contact"
                  (click)="scrollToTop()"
                  class="bg-[#CC4C0F] hover:bg-[#B33E08] text-white px-5 py-2 rounded-full font-bold text-xs shadow-md transition-all inline-flex items-center gap-1.5"
                >
                  <span>Get in Touch</span>
                  <app-icon name="arrow-right" customClass="w-3 h-3"></app-icon>
                </a>
              </div>
            </div>
          </div>

        </div>

        <!-- Bottom Bar -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© 2026 Zener Home P.L.C. All rights reserved. Addis Ababa, Ethiopia.</p>
          <div class="flex items-center gap-6">
            <span class="hover:text-white/80 transition-colors cursor-pointer" (click)="openLicenseModal()">Official License</span>
            <a routerLink="/contact" (click)="scrollToTop()" class="hover:text-white/80 transition-colors">Contact Support</a>
            <a routerLink="/about" (click)="scrollToTop()" class="hover:text-white/80 transition-colors">About Us</a>
          </div>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {
  private modalService = inject(ModalService);

  readonly socialLinks = [
    { name: 'Telegram', icon: 'telegram', url: 'https://t.me/zenerhome' },
    { name: 'TikTok', icon: 'tiktok', url: 'https://tiktok.com/@zenerhome' },
    { name: 'Facebook', icon: 'facebook', url: 'https://facebook.com/zenerhome' },
    { name: 'Instagram', icon: 'instagram', url: 'https://instagram.com/zenerhome' },
    { name: 'YouTube', icon: 'youtube', url: 'https://youtube.com/@zenerhome' },
  ];

  openLicenseModal(): void {
    this.modalService.openLicenseModal();
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
