import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../shared/components/icon.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IconComponent],
  template: `
    <section id="home" class="hero-section relative min-h-screen flex flex-col justify-between overflow-hidden pb-12">
      <!-- Large Organic Orange Blob Shape in Background -->
      <div 
        class="absolute -top-32 -left-20 w-[600px] sm:w-[750px] lg:w-[950px] h-[600px] sm:h-[750px] lg:h-[950px] pointer-events-none z-0"
        style="background: radial-gradient(circle at 40% 40%, #D6571D 0%, #CC4C0F 45%, #A83705 85%, transparent 100%); border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%; filter: blur(20px); opacity: 0.94;"
      ></div>

      <!-- Secondary ambient warm glow -->
      <div 
        class="absolute top-1/3 right-0 w-[450px] h-[450px] pointer-events-none z-0"
        style="background: radial-gradient(circle, rgba(255, 90, 31, 0.15) 0%, transparent 70%); border-radius: 50%; filter: blur(40px);"
      ></div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full flex-1 flex flex-col justify-center my-auto">
        <!-- Two-column Hero Layout: Image Left, Text Right on Desktop -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <!-- Left Column: Visual Product Showcase with Hanging Light & Floating Search -->
          <div class="lg:col-span-6 relative order-2 lg:order-1 flex flex-col items-center justify-center">
            
            <!-- Hanging Pendant Light Overlapping Blob -->
            <div class="absolute -top-20 left-6 sm:left-12 z-20 w-28 sm:w-36 pointer-events-none animate-float-slow">
              <img 
                src="/images/hero/hero-pendant-light.png" 
                alt="Hanging Pendant Light" 
                class="w-full drop-shadow-2xl"
              />
            </div>

            <!-- Floating Luxury Tag Badge -->
            <div class="absolute top-8 right-2 sm:right-6 z-20 glass-card px-4 py-2 rounded-2xl shadow-xl border border-white/60 flex items-center gap-2">
              <div class="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">
                <app-icon name="sparkles" customClass="w-3.5 h-3.5"></app-icon>
              </div>

            </div>

            <!-- Hero Main Furniture Asset -->
            <div class="relative w-full max-w-lg mx-auto py-8">
              <div class="relative z-10 group">
                <img
                  src="/images/hero/hero-sofa.png"
                  alt="Zener Home Luxury Curved Lounge Seating"
                  class="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <!-- Floating Search Bar Card overlapping the hero image edge -->
              <div class="relative -mt-6 sm:-mt-10 z-30 w-full max-w-md mx-auto">
                <form 
                  (ngSubmit)="handleSearchSubmit()"
                  class="bg-white rounded-full p-2 pl-6 shadow-2xl border border-orange-100 flex items-center justify-between gap-3 hover:shadow-orange-500/20 transition-all duration-300"
                >
                  <div class="flex items-center gap-3 flex-1">
                    <app-icon name="search" customClass="w-5 h-5 text-orange-500 flex-shrink-0"></app-icon>
                    <input
                      type="text"
                      placeholder="What are you looking for? (e.g. Sofa, Dining, Gypsum)"
                      [(ngModel)]="searchInput"
                      name="searchInput"
                      class="w-full bg-transparent text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    class="bg-[#CC4C0F] text-white p-3 rounded-full hover:bg-[#B33E08] transition-colors flex-shrink-0 shadow-md"
                    aria-label="Search"
                  >
                    <app-icon name="arrow-right" customClass="w-4 h-4"></app-icon>
                  </button>
                </form>
              </div>

            </div>

          </div>

          <!-- Right Column: Copy & Actions -->
          <div class="lg:col-span-6 order-1 lg:order-2 flex flex-col items-start text-left">
            
            <!-- Pill Accent -->
            

            <!-- Headline -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.15] mb-6">
              Make you feel <br class="hidden sm:inline" />
              <span class="relative inline-block">
                <span class="relative z-10 text-orange-600">luxury</span>
                <span class="absolute bottom-2 left-0 w-full h-3 bg-orange-200/60 -z-0 rounded-sm"></span>
              </span> in every space.
            </h1>

            <!-- Subtitle Paragraph -->
            <p class="text-base sm:text-lg text-gray-600 max-w-lg mb-8 leading-relaxed">
              Experience the pinnacle of sophisticated living. From bespoke solid-wood salon furniture to complete turnkey architectural finishing for luxury residences and hotels across Ethiopia.
            </p>

            <!-- CTA Group -->
            <div class="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="#collections"
                class="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#CC4C0F] text-white font-semibold text-base hover:bg-[#B33E08] shadow-xl hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Shop now</span>
                <app-icon name="arrow-right" customClass="w-5 h-5"></app-icon>
              </a>

              <a
                routerLink="/contact"
                class="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white text-gray-900 font-semibold text-base hover:bg-orange-50 border border-orange-200/80 shadow-sm transition-all duration-300"
              >
                <span>Contact Us</span>
              </a>
            </div>

          </div>

        </div>
      </div>

      <!-- Trust Strip Below Hero -->
      <div class="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 w-full mt-4 sm:mt-6 pt-0">
        <div class="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-3xl p-5 sm:p-6 shadow-xl border border-orange-100/70 dark:border-white/10">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-orange-100">
            
            <!-- Stat 1: Reviews & Experience -->
            <div class="flex items-center gap-4 sm:gap-5 pb-4 md:pb-0">
              <div class="flex -space-x-3">
                <div class="w-11 h-11 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center border-2 border-white text-sm shadow">
                  8+
                </div>
                <div class="w-11 h-11 rounded-full bg-[#1A1A1A] text-white font-bold flex items-center justify-center border-2 border-white text-xs shadow">
                  ★5.0
                </div>
              </div>
              <div>
                <p class="text-2xl font-bold text-gray-900">8+ Years</p>
                <p class="text-xs text-gray-500 font-medium">Trusted Market Experience</p>
              </div>
            </div>

            <!-- Stat 2: Active Projects -->
            <div class="flex items-center gap-4 sm:gap-5 pt-4 md:pt-0 md:pl-8">
              <div class="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold text-lg border border-orange-500/20">
                150+
              </div>
              <div>
                <p class="text-2xl font-bold text-gray-900">150+ Projects</p>
                <p class="text-xs text-gray-500 font-medium">Villas, Hotels & Apartments</p>
              </div>
            </div>

            <!-- Stat 3: Turnkey Timeline -->
            <div class="flex items-center gap-4 sm:gap-5 pt-4 md:pt-0 md:pl-8">
              <div class="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold text-lg border border-orange-500/20">
                100%
              </div>
              <div>
                <p class="text-2xl font-bold text-gray-900">Turnkey Precision</p>
                <p class="text-xs text-gray-500 font-medium">Budget & Timeline Guarantee</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  `
})
export class HeroComponent {
  @Output() search = new EventEmitter<string>();
  searchInput = '';

  handleSearchSubmit(): void {
    if (this.searchInput.trim()) {
      this.search.emit(this.searchInput.trim());
      const collectionsSection = document.getElementById('collections');
      if (collectionsSection) {
        collectionsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}

