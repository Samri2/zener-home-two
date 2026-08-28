import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';
import { ProjectsService } from '../../core/services/projects.service';
import { ModalService } from '../../core/services/modal.service';
import { IconComponent } from '../../shared/components/icon.component';
import { VideoShowcaseComponent } from '../../components/video-showcase.component';
import { ProjectItem } from '../../core/data/projects';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent, VideoShowcaseComponent],
  template: `
    <div class="space-y-0 animate-in fade-in duration-300">
      
      <!-- 1. Page Header Banner -->
      <section class="relative py-20 bg-gradient-to-br from-[#1A1A1A] via-[#2A221E] to-[#1A1A1A] text-white overflow-hidden">
        <div class="absolute top-0 right-0 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute bottom-0 left-1/4 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div class="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div class="max-w-3xl">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {{ isAm() ? 'የተከናወኑ የፊኒሺንግ እና ዲዛይን ፕሮጀክቶች' : 'Architectural Precision & Luxury Finishing' }}
            </h1>
            
            <p class="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mb-8">
              Explore our 150+ completed luxury villa residences, corporate headquarters (EBC), hotel banquets (Menanda Hotel Bishoftu), high-rise apartments, and live on-site construction walkthroughs across Ethiopia.
            </p>

            <div class="flex flex-wrap items-center gap-4 text-xs font-medium text-white/90">
              <div class="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/15">
                <app-icon name="shield-check" customClass="w-4 h-4 text-orange-400"></app-icon>
                <span>8+ Years Verified Experience</span>
              </div>
              <div class="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/15">
                <app-icon name="check-circle-2" customClass="w-4 h-4 text-orange-400"></app-icon>
                <span>150+ Handed-over Sites</span>
              </div>
              <div class="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/15">
                <app-icon name="hammer" customClass="w-4 h-4 text-orange-400"></app-icon>
                <span>Real Job Site Construction Progress</span>
              </div>
              <div class="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/15">
                <app-icon name="film" customClass="w-4 h-4 text-orange-400"></app-icon>
                <span>Job Site Video Reels</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. Filterable Projects Gallery -->
      <section class="py-16 bg-[#FDF6F0]">
        <div class="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span class="text-orange-500 font-semibold text-xs uppercase tracking-widest block mb-1">
                {{ isAm() ? 'ምድቦች' : 'Portfolio Filter' }}
              </span>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">
                {{ isAm() ? 'የፕሮጀክቶች ማውጫ' : 'Browse Completed Sites & Active Projects' }}
              </h2>
            </div>

            <!-- Filter Pills -->
            <div class="flex flex-wrap items-center gap-2">
              @for (cat of categories(); track cat.id) {
                <button
                  (click)="activeFilter.set(cat.id)"
                  class="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
                  [ngClass]="activeFilter() === cat.id ? 'bg-[#CC4C0F] text-white shadow-md shadow-orange-500/25' : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 border border-orange-200/60'"
                >
                  {{ cat.label }}
                </button>
              }
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
  private translation = inject(TranslationService);
  private projectsService = inject(ProjectsService);
  private modalService = inject(ModalService);

  readonly isAm = this.translation.isAmharic;
  readonly activeFilter = signal<string>('all');

  readonly categories = computed(() => {
    const isAm = this.isAm();
    return [
      { id: 'all', label: isAm ? 'ሁሉም ፕሮጀክቶች (12)' : 'All Projects (12)' },
      { id: 'residential', label: isAm ? 'የመኖሪያ ቪላዎች' : 'Luxury Villas' },
      { id: 'commercial', label: isAm ? 'ኮርፖሬት እና ኢቢሲ' : 'Corporate & Media' },
      { id: 'hospitality', label: isAm ? 'ሆቴሎች እና አዳራሾች' : 'Hotels & Banquets' },
      { id: 'apartment', label: isAm ? 'አፓርታማዎች' : 'Apartments' },
      { id: 'construction', label: isAm ? 'የስራ ሂደት ፎቶዎች' : 'On-Site Construction' },
    ];
  });

  readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    const all = this.projectsService.getProjects();
    if (filter === 'all') return all;
    return all.filter(p => p.category === filter);
  });

  selectProject(project: ProjectItem): void {
    this.modalService.openProjectDetail(project);
  }
}
