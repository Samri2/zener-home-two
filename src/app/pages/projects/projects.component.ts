import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';
import { ProjectsService } from '../../core/services/projects.service';
import { ModalService } from '../../core/services/modal.service';
import { IconComponent } from '../../shared/components/icon.component';
import { VideoShowcaseComponent } from '../../components/video-showcase.component';
import { ProjectItem } from '../../core/data/projects';

type ProjectCategory = 'residence' | 'commercial' | 'hotel';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, VideoShowcaseComponent],
  template: `
    <div class="space-y-0 animate-in fade-in duration-300">
      
      <!-- 1. Category-led portfolio hero -->
      <section class="relative min-h-[560px] overflow-hidden bg-gradient-to-br from-[#1A1A1A] via-[#2D211C] to-[#1A1A1A] text-white sm:min-h-[620px]">
        <img
          [src]="activeHeroImage()"
          [alt]="activeCategory().label + ' project'"
          class="absolute inset-0 h-full w-full object-cover opacity-20 transition-opacity duration-500"
        />
        <div class="absolute inset-0 bg-gradient-to-br from-[#1A1A1A]/75 via-[#2D211C]/70 to-[#1A1A1A]/80"></div>
        <div class="absolute top-0 right-0 h-96 w-96 rounded-full bg-orange-500/15 blur-3xl pointer-events-none"></div>

        <div class="relative mx-auto flex min-h-[560px] max-w-7xl flex-col justify-between px-6 py-12 sm:min-h-[620px] sm:px-8 sm:py-16">
          <div class="max-w-2xl pt-8 sm:pt-12">
            <h1 class="mb-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {{ activeCategory().label }} Projects
            </h1>
            <p class="max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
              Explore our {{ activeCategory().label.toLowerCase() }} work across Addis Ababa and beyond.
            </p>
          </div>

          <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div class="flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
              @for (category of categories(); track category.id) {
                <button
                  type="button"
                  role="tab"
                  [attr.aria-selected]="activeFilter() === category.id"
                  (click)="selectCategory(category.id)"
                  class="border px-5 py-3 text-sm font-semibold transition-colors"
                  [ngClass]="activeFilter() === category.id ? 'border-white bg-white text-[#171714]' : 'border-white/50 bg-black/20 text-white hover:bg-white/15'"
                >
                  {{ category.label }}
                </button>
              }
            </div>

            @if (activeCategory().slides.length > 1) {
              <div class="flex items-center gap-2 self-end" aria-label="Hero image controls">
                <button
                  type="button"
                  (click)="changeHeroSlide(-1)"
                  aria-label="Previous project image"
                  class="flex h-11 w-11 items-center justify-center border border-white/60 bg-black/20 text-xl transition-colors hover:bg-white hover:text-black"
                >
                  &#8592;
                </button>
                <span class="min-w-12 text-center text-xs font-semibold tabular-nums">
                  {{ heroSlideIndex() + 1 }} / {{ activeCategory().slides.length }}
                </span>
                <button
                  type="button"
                  (click)="changeHeroSlide(1)"
                  aria-label="Next project image"
                  class="flex h-11 w-11 items-center justify-center border border-white/60 bg-black/20 text-xl transition-colors hover:bg-white hover:text-black"
                >
                  &#8594;
                </button>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- 2. Filterable Projects Gallery -->
      <section class="py-16 bg-[#FDF6F0]">
        <div class="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span class="text-orange-500 font-semibold text-xs uppercase tracking-widest block mb-1">{{ activeCategory().label }}</span>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">
                {{ activeCategory().label }} Projects
              </h2>
            </div>
          </div>

          <!-- Grid of Projects -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (project of filteredProjects(); track project.id) {
              <div
                (click)="selectProject(project)"
                class="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-orange-500/20 border border-orange-100 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <!-- Project Image -->
                  <div class="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-100">
                    <img
                      [src]="project.image"
                      [alt]="project.title"
                      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity"></div>
                    
                    <!-- Top Badge -->
                    <div class="absolute top-4 left-4">
                      <span class="bg-white/90 backdrop-blur-md text-orange-600 font-bold text-[11px] px-3 py-1 rounded-full shadow">
                        {{ project.categoryLabel }}
                      </span>
                    </div>

                    <!-- Gallery Count -->
                    <div class="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                      <app-icon name="sparkles" customClass="w-3 h-3 text-orange-400"></app-icon>
                      <span>{{ project.gallery.length }} Photos</span>
                    </div>

                    <!-- Bottom Location Overlay -->
                    <div class="absolute bottom-4 left-4 right-4 text-white">
                      <div class="flex items-center gap-1.5 text-xs text-white/90 font-medium">
                        <app-icon name="map-pin" customClass="w-3.5 h-3.5 text-orange-400"></app-icon>
                        <span>{{ project.location }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Body Content -->
                  <div class="p-6">
                    <h3 class="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors mb-1 leading-snug">
                      {{ project.title }}
                    </h3>
                    @if (project.titleAm) {
                      <p class="text-xs text-orange-600 font-medium mb-3">{{ project.titleAm }}</p>
                    }
                    <p class="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
                      {{ project.description }}
                    </p>
                  </div>
                </div>

                <!-- Card Footer -->
                <div class="p-6 pt-0">
                  <div class="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span class="font-semibold text-gray-700 line-clamp-1 max-w-[180px]">{{ project.year }}</span>
                    <span class="font-bold text-orange-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Inspect Project ({{ project.gallery.length }}) →
                    </span>
                  </div>
                </div>
              </div>
            }
          </div>

        </div>
      </section>

      <!-- 3. Dedicated Video Showcase / Reels Section -->
      <app-video-showcase></app-video-showcase>

      <!-- 4. Project Consultation CTA -->
      <section class="py-16 bg-white border-t border-orange-100">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <div class="max-w-2xl mx-auto space-y-4">
            <h3 class="text-2xl sm:text-3xl font-bold text-gray-900">
              {{ isAm() ? 'ለፕሮጀክትዎ ግምት እና ዲዛይን ይፈልጋሉ?' : 'Have a Similar Villa, Apartment, or Hotel Project in Mind?' }}
            </h3>
            <p class="text-gray-600 text-sm sm:text-base">
              Our architectural and engineering finishing team provides on-site measurements, 3D renders, and turnkey contracts across Ethiopia.
            </p>
            <div class="pt-4 flex flex-wrap items-center justify-center gap-4">
              <a
                routerLink="/contact"
                class="inline-flex items-center gap-2 bg-[#CC4C0F] hover:bg-[#B33E08] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-orange-500/25 transition-all"
              >
                <span>Contact Project Team</span>
                <app-icon name="arrow-right" customClass="w-4 h-4"></app-icon>
              </a>
              <a
                href="tel:+251910900931"
                class="inline-flex items-center gap-2 bg-orange-50 hover:bg-orange-100 text-orange-700 px-6 py-3.5 rounded-full font-semibold text-sm border border-orange-200 transition-all"
              >
                <app-icon name="phone" customClass="w-4 h-4"></app-icon>
                <span>Call +251 910 900 931</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  `
})
export class ProjectsPageComponent {
  private readonly translation = inject(TranslationService);
  private readonly projectsService = inject(ProjectsService);
  private readonly modalService = inject(ModalService);

  readonly isAm = this.translation.isAmharic;
  readonly activeFilter = signal<ProjectCategory>('residence');
  readonly heroSlideIndex = signal(0);

  readonly categories = computed(() => {
    const isAm = this.isAm();
    return [
      {
        id: 'residence' as const,
        label: isAm ? 'መኖሪያ' : 'Residence',
        slides: ['/img/site%201/475309774_940883151492008_1253919612611226890_n.jpg']
      },
      {
        id: 'commercial' as const,
        label: isAm ? 'ንግድ' : 'Commercial',
        slides: [
          '/img/site%202/475657750_943204924593164_535887438606507841_n.jpg',
          '/img/489050096_992303353016654_2276759780354741544_n.jpg'
        ]
      },
      {
        id: 'hotel' as const,
        label: isAm ? 'ሆቴል' : 'Hotel',
        slides: [
          '/img/site%2010/481999700_963857619194561_5057454708152355117_n.jpg',
          '/img/490081170_992303406349982_3268294090849058908_n.jpg'
        ]
      },
    ];
  });

  readonly activeCategory = computed(() => this.categories().find(category => category.id === this.activeFilter())!);
  readonly activeHeroImage = computed(() => this.activeCategory().slides[this.heroSlideIndex()]);

  readonly filteredProjects = computed(() => {
    const projectIds: Record<ProjectCategory, string[]> = {
      residence: [
        'bole-bulbula-residential-site-01',
        'chichinia-area-residential-site-03',
        'megenagna-luxury-apartment-site-06',
        'site-08-flagship-villa-estate',
        'addisu-gebeya-family-apartment-site-09'
      ],
      commercial: ['ebc-headquarters-atrium', 'bulbula-mazoria-villa-site-02'],
      hotel: ['mahi-spa-beauty-salon-site-10']
    };
    const projectsById = new Map(this.projectsService.getProjects().map(project => [project.id, project]));
    return projectIds[this.activeFilter()]
      .map(id => projectsById.get(id))
      .filter((project): project is ProjectItem => project !== undefined);
  });

  selectCategory(category: ProjectCategory): void {
    this.activeFilter.set(category);
    this.heroSlideIndex.set(0);
  }

  changeHeroSlide(direction: number): void {
    const slideCount = this.activeCategory().slides.length;
    this.heroSlideIndex.update(index => (index + direction + slideCount) % slideCount);
  }

  selectProject(project: ProjectItem): void {
    this.modalService.openProjectDetail(project);
  }
}
