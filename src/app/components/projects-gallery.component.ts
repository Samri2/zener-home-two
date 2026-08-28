import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../shared/components/icon.component';
import { ProjectsService } from '../core/services/projects.service';
import { ModalService } from '../core/services/modal.service';
import { ProjectItem } from '../core/data/projects';

@Component({
  selector: 'app-projects-gallery',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="portfolio" class="py-24 relative overflow-hidden bg-[#FDF6F0]">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span class="text-orange-500 font-semibold text-xs uppercase tracking-widest block mb-3">
              Completed Works & Sites
            </span>
            <h2 class="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              Featured
              <span class="text-orange-500 underline decoration-orange-300 underline-offset-8">
                Projects
              </span>
            </h2>
          </div>
          <p class="text-gray-600 text-sm sm:text-base max-w-md">
            Explore our completed residential villas, corporate headquarters, and commercial banquet halls across Addis Ababa and beyond.
          </p>
        </div>

        <!-- Filter Pills -->
        <div class="flex flex-wrap items-center gap-2.5 mb-12">
          @for (cat of categories; track cat.id) {
            <button
              (click)="activeFilter.set(cat.id)"
              class="px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200"
              [ngClass]="activeFilter() === cat.id ? 'bg-[#CC4C0F] text-white shadow-md shadow-orange-500/25' : 'bg-white text-gray-700 hover:bg-orange-50 hover:text-orange-600 border border-orange-200/60'"
            >
              {{ cat.label }}
            </button>
          }
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (project of filteredProjects(); track project.id) {
            <div
              (click)="selectProject(project)"
              class="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-orange-500/20 border border-orange-100 transition-all duration-300 group cursor-pointer flex flex-col"
            >
              <!-- Project Image -->
              <div class="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-100">
                <img
                  [src]="project.image"
                  [alt]="project.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                
                <!-- Top Badge -->
                <div class="absolute top-4 left-4">
                  <span class="bg-white/90 backdrop-blur-md text-orange-600 font-bold text-[11px] px-3 py-1 rounded-full shadow">
                    {{ project.categoryLabel }}
                  </span>
                </div>

                <!-- View Icon Hover -->
                <div class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-gray-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:rotate-45 shadow">
                  <app-icon name="arrow-up-right" customClass="w-5 h-5 text-orange-600"></app-icon>
                </div>

                <!-- Bottom Location Overlay -->
                <div class="absolute bottom-4 left-4 right-4 text-white">
                  <div class="flex items-center gap-1.5 text-xs text-white/90">
                    <app-icon name="map-pin" customClass="w-3.5 h-3.5 text-orange-400"></app-icon>
                    <span>{{ project.location }}</span>
                  </div>
                </div>
              </div>

              <!-- Project Card Body -->
              <div class="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 class="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-2 line-clamp-1">
                    {{ project.title }}
                  </h3>
                  @if (project.titleAm) {
                    <p class="text-xs text-orange-600 font-medium mb-3 line-clamp-1">
                      {{ project.titleAm }}
                    </p>
                  }
                  <p class="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {{ project.scope }}
                  </p>
                </div>

                <div class="pt-4 mt-4 border-t border-orange-100/80 flex items-center justify-between text-xs text-gray-500">
                  <span>Year: <strong>{{ project.year }}</strong></span>
                  <span class="inline-flex items-center gap-1 text-orange-600 font-semibold group-hover:translate-x-1 transition-transform">
                    <app-icon name="eye" customClass="w-3.5 h-3.5"></app-icon>
                    <span>View Gallery ({{ project.gallery.length }} Photos)</span>
                  </span>
                </div>
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `
})
export class ProjectsGalleryComponent {
  private projectsService = inject(ProjectsService);
  private modalService = inject(ModalService);

  readonly activeFilter = signal<string>('all');

  readonly categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Luxury Villas' },
    { id: 'apartment', label: 'Apartments' },
    { id: 'commercial', label: 'Corporate & Commercial' },
    { id: 'hospitality', label: 'Hotels & Banquets' },
  ];

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
