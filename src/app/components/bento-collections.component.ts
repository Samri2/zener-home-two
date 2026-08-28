import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../shared/components/icon.component';
import { CollectionsService } from '../core/services/collections.service';
import { ModalService } from '../core/services/modal.service';
import { BentoCollectionItem } from '../core/data/collections';

@Component({
  selector: 'app-bento-collections',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="collections" class="py-24 relative overflow-hidden bg-[#FDF6F0]">
      <!-- Decorative ambient background shape -->
      <div class="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        <!-- Centered Section Heading -->
        <div class="text-center max-w-3xl mx-auto mb-16">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-600 text-xs font-semibold uppercase tracking-wider mb-4">
            <app-icon name="sparkles" customClass="w-3.5 h-3.5"></app-icon>
            <span>Curated Collections</span>
          </div>
          <h2 class="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
            Our
            <span class="relative inline-block text-orange-600">
              Collections
              <span class="absolute bottom-1 left-0 w-full h-2.5 bg-orange-300/50 -z-10 rounded-sm"></span>
            </span>
          </h2>
          <p class="text-base sm:text-lg text-gray-600">
            Real finished villa residences, corporate suites, and bespoke architectural spaces delivered across Ethiopia.
          </p>
        </div>

        <!-- Bento-style Asymmetric Grid made from real project sites -->
        <div class="grid grid-cols-12 gap-6 lg:gap-8">
          
          <!-- Card 1: Large Card (Luxury Villa Salon Finishing) - 7 Cols -->
          @if (outdoorChair) {
            <div 
              (click)="selectItem(outdoorChair)"
              class="col-span-12 lg:col-span-7 bg-gradient-to-br from-[#D6571D] via-[#CC4C0F] to-[#A83705] rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-500 group cursor-pointer min-h-[420px] flex flex-col justify-between"
            >
              <!-- Top Left Content -->
              <div class="relative z-10 max-w-md">
                <span class="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium uppercase tracking-wider mb-3">
                  {{ outdoorChair.badge }}
                </span>
                <h3 class="text-3xl sm:text-4xl font-bold tracking-tight mb-2 leading-tight">
                  {{ outdoorChair.title }}
                </h3>
                <p class="text-white/85 text-sm sm:text-base line-clamp-2">
                  {{ outdoorChair.subtitle }}
                </p>
              </div>

              <!-- Bottom Left Explore Pill Button -->
              <div class="relative z-10 pt-6">
                <button 
                  (click)="$event.stopPropagation(); selectItem(outdoorChair)"
                  class="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-orange-50 px-6 py-2.5 rounded-full text-sm font-semibold shadow-lg transition-all duration-300 transform group-hover:scale-105"
                >
                  <span>{{ outdoorChair.buttonText }}</span>
                </button>
              </div>

              <!-- Real Site Photo Frame -->
              <div class="absolute -bottom-6 -right-6 sm:bottom-4 sm:right-6 w-64 sm:w-80 z-0 pointer-events-none transition-transform duration-500 group-hover:scale-105">
                <div class="rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
                  <img 
                    src="/img/site 8/488678761_986861766894146_4215183907098168181_n.jpg"
                    [alt]="outdoorChair.title" 
                    class="w-full h-48 sm:h-56 object-cover"
                  />
                </div>
              </div>
            </div>
          }

          <!-- Card 2: Tall Card (Architectural Ceilings & Lighting) - 5 Cols -->
          @if (tallPlant) {
            <div 
              (click)="selectItem(tallPlant)"
              class="col-span-12 lg:col-span-5 bg-gradient-to-br from-[#E06B33] via-[#CC4C0F] to-[#9E3203] rounded-3xl p-8 text-white relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-500 group cursor-pointer min-h-[420px] flex flex-col justify-between"
            >
              <!-- Top Bar with Pill Top-Right -->
              <div class="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <span class="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium uppercase tracking-wider mb-2">
                    {{ tallPlant.badge }}
                  </span>
                  <h3 class="text-2xl sm:text-3xl font-bold tracking-tight leading-snug">
                    {{ tallPlant.title }}
                  </h3>
                </div>
                <button 
                  (click)="$event.stopPropagation(); selectItem(tallPlant)"
                  class="inline-flex items-center gap-1.5 bg-white/95 text-gray-900 hover:bg-white px-4 py-2 rounded-full text-xs font-semibold shadow-md whitespace-nowrap transition-all group-hover:scale-105"
                >
                  <span>{{ tallPlant.buttonText }}</span>
                </button>
              </div>

              <!-- Real Site Image Centered -->
              <div class="relative z-0 w-full flex items-center justify-center pt-4 pointer-events-none">
                <div class="w-full h-52 rounded-2xl overflow-hidden shadow-xl border border-white/20">
                  <img 
                    src="/img/site 3/480434063_955559403357716_5191670721321035321_n.jpg"
                    [alt]="tallPlant.title" 
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          }

          <!-- Card 3: Wide Card (Grand Salon Turnkey Finishing) - 12 Cols -->
          @if (modernCouch) {
            <div 
              (click)="selectItem(modernCouch)"
              class="col-span-12 bg-gradient-to-r from-[#DB5F25] via-[#CC4C0F] to-[#942D02] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-500 group cursor-pointer min-h-[360px] flex flex-col justify-center"
            >
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                <!-- Left Details -->
                <div class="lg:col-span-6 relative z-10">
                  <span class="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium uppercase tracking-wider mb-3">
                    {{ modernCouch.badge }}
                  </span>
                  <h3 class="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
                    {{ modernCouch.title }}
                  </h3>
                  <p class="text-white/90 text-sm sm:text-base mb-6 leading-relaxed">
                    {{ modernCouch.description }}
                  </p>
                  <button 
                    (click)="$event.stopPropagation(); selectItem(modernCouch)"
                    class="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-orange-50 px-7 py-3 rounded-full text-sm font-semibold shadow-lg transition-all duration-300 transform group-hover:scale-105"
                  >
                    <span>{{ modernCouch.buttonText }}</span>
                    <app-icon name="arrow-right" customClass="w-4 h-4 text-orange-600"></app-icon>
                  </button>
                </div>

                <!-- Real Site Image Bleeding -->
                <div class="lg:col-span-6 relative z-0 flex items-center justify-center pointer-events-none">
                  <div class="rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 w-full max-w-lg">
                    <img 
                      src="/img/site 8/487826473_986859320227724_4411590202118822842_n.jpg"
                      [alt]="modernCouch.title" 
                      class="w-full h-64 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

              </div>
            </div>
          }

          <!-- Row 3: 3 Equal-Width Smaller Cards - 4 Cols each -->
          <!-- Card 4: EBC Corporate & Media Finishing -->
          @if (modernChair) {
            <div 
              (click)="selectItem(modernChair)"
              class="col-span-12 sm:col-span-6 lg:col-span-4 bg-gradient-to-b from-[#D45318] via-[#CC4C0F] to-[#9C3404] rounded-3xl p-8 text-white relative overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-500 group cursor-pointer flex flex-col justify-between min-h-[400px]"
            >
              <!-- Real Site Photo -->
              <div class="w-full flex items-center justify-center py-2 pointer-events-none">
                <div class="w-full h-44 rounded-2xl overflow-hidden shadow-lg border border-white/20">
                  <img 
                    src="/img/ebc/475411813_941107524802904_3944707393021131757_n.jpg"
                    [alt]="modernChair.title" 
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              <!-- Content & Button -->
              <div class="pt-4 border-t border-white/15">
                <span class="text-[11px] uppercase tracking-wider text-white/75 font-semibold block mb-1">
                  Corporate & Commercial
                </span>
                <h4 class="text-xl font-bold tracking-tight mb-4">EBC Media & Corporate Suites</h4>
                <button 
                  (click)="$event.stopPropagation(); selectItem(modernChair)"
                  class="w-full bg-white text-gray-900 hover:bg-orange-50 py-2.5 rounded-full text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Explore Projects »</span>
                </button>
              </div>
            </div>
          }

          <!-- Card 5: Architectural TV Slat Wall & Woodwork -->
          @if (bambooSwing) {
            <div 
              (click)="selectItem(bambooSwing)"
              class="col-span-12 sm:col-span-6 lg:col-span-4 bg-gradient-to-b from-[#DE652B] via-[#CC4C0F] to-[#A13706] rounded-3xl p-8 text-white relative overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-500 group cursor-pointer flex flex-col justify-between min-h-[400px]"
            >
              <!-- Real Site Photo -->
              <div class="w-full flex items-center justify-center py-2 pointer-events-none">
                <div class="w-full h-44 rounded-2xl overflow-hidden shadow-lg border border-white/20">
                  <img 
                    src="/img/site 6/481096689_963943485852641_7270444137351157105_n.jpg"
                    [alt]="bambooSwing.title" 
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              <!-- Content & Button -->
              <div class="pt-4 border-t border-white/15">
                <span class="text-[11px] uppercase tracking-wider text-white/75 font-semibold block mb-1">
                  Bespoke Woodwork
                </span>
                <h4 class="text-xl font-bold tracking-tight mb-4">Architectural Slat Walls & Units</h4>
                <button 
                  (click)="$event.stopPropagation(); selectItem(bambooSwing)"
                  class="w-full bg-white text-gray-900 hover:bg-orange-50 py-2.5 rounded-full text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Explore Woodwork »</span>
                </button>
              </div>
            </div>
          }

          <!-- Card 6: Villa Master Suite & False Ceilings -->
          @if (hangingLight) {
            <div 
              (click)="selectItem(hangingLight)"
              class="col-span-12 sm:col-span-6 lg:col-span-4 bg-gradient-to-b from-[#E3723B] via-[#CC4C0F] to-[#963002] rounded-3xl p-8 text-white relative overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-orange-500/25 transition-all duration-500 group cursor-pointer flex flex-col justify-between min-h-[400px]"
            >
              <!-- Real Site Photo -->
              <div class="w-full flex items-center justify-center py-2 pointer-events-none">
                <div class="w-full h-44 rounded-2xl overflow-hidden shadow-lg border border-white/20">
                  <img 
                    src="/img/site 10/481801669_963857965861193_5297826181240587484_n.jpg"
                    [alt]="hangingLight.title" 
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
              <!-- Content & Button -->
              <div class="pt-4 border-t border-white/15">
                <span class="text-[11px] uppercase tracking-wider text-white/75 font-semibold block mb-1">
                  Master Bedroom Finishing
                </span>
                <h4 class="text-xl font-bold tracking-tight mb-4">Villa Master Suite Ceilings</h4>
                <button 
                  (click)="$event.stopPropagation(); selectItem(hangingLight)"
                  class="w-full bg-white text-gray-900 hover:bg-orange-50 py-2.5 rounded-full text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Explore Suites »</span>
                </button>
              </div>
            </div>
          }

        </div>

      </div>
    </section>
  `
})
export class BentoCollectionsComponent {
  private collectionsService = inject(CollectionsService);
  private modalService = inject(ModalService);

  readonly outdoorChair = this.collectionsService.getCollectionById('outdoor-lounge-chair');
  readonly tallPlant = this.collectionsService.getCollectionById('tall-botanical-accent');
  readonly modernCouch = this.collectionsService.getCollectionById('modern-couches');
  readonly modernChair = this.collectionsService.getCollectionById('modern-chair');
  readonly bambooSwing = this.collectionsService.getCollectionById('bamboo-swing-chairs');
  readonly hangingLight = this.collectionsService.getCollectionById('hanging-light');

  selectItem(item: BentoCollectionItem): void {
    this.modalService.openProductDetail(item);
  }
}
