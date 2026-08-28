import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';
import { ProjectsService } from '../../core/services/projects.service';
import { ServicesService } from '../../core/services/services.service';
import { ModalService } from '../../core/services/modal.service';
import { IconComponent } from '../../shared/components/icon.component';
import { HeroComponent } from '../../components/hero.component';
import { BentoCollectionsComponent } from '../../components/bento-collections.component';
import { InteractiveShowcaseComponent } from '../../components/interactive-showcase.component';
import { TestimonialsComponent } from '../../components/testimonials.component';
import { ProjectItem } from '../../core/data/projects';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IconComponent,
    HeroComponent,
    BentoCollectionsComponent,
    InteractiveShowcaseComponent,
    TestimonialsComponent
  ],
  template: `
    <div class="space-y-0 animate-in fade-in duration-300">
      
      <!-- 1. Hero Section -->
      <app-hero (search)="handleSearch($event)"></app-hero>

      <!-- 2. "Our Collections" Bento Section -->
      <app-bento-collections></app-bento-collections>

      <!-- 3. Interactive Room & Lighting Visualizer -->
      <app-interactive-showcase></app-interactive-showcase>

      <!-- 4. Services Teaser / Quick Overview -->
      <section class="py-20 bg-white border-y border-orange-100/80 relative">
        <div class="max-w-7xl mx-auto px-6 sm:px-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 text-orange-600 text-xs font-semibold uppercase tracking-wider mb-3">
                <app-icon name="compass" customClass="w-3.5 h-3.5"></app-icon>
                <span>{{ isAm() ? 'አገልግሎቶቻችን' : 'Our Expertise' }}</span>
              </div>
              <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                {{ isAm() ? 'የፊኒሺንግ እና ዲዛይን አገልግሎቶች' : 'Turnkey Design & Finishing Services' }}
              </h2>
            </div>
            <a
              routerLink="/services"
              (click)="scrollToTop()"
              class="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 group self-start md:self-auto"
            >
              <span>{{ isAm() ? 'ሁሉንም አገልግሎቶች ይመልከቱ' : 'View All Services' }}</span>
              <app-icon name="arrow-right" customClass="w-4 h-4 transition-transform group-hover:translate-x-1"></app-icon>
            </a>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @for (service of featuredServices; track service.id; let idx = $index) {
              <div 
                class="bg-[#FDF6F0] rounded-3xl p-8 border border-orange-100 hover:border-orange-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div class="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold text-lg mb-6 shadow-md shadow-orange-500/20 group-hover:scale-110 transition-transform">
                    {{ idx + 1 }}
                  </div>
                  <h3 class="text-xl font-bold text-gray-900 mb-3">{{ service.title }}</h3>
                  <p class="text-gray-600 text-sm leading-relaxed mb-6">{{ service.shortDesc }}</p>
                </div>
                <div class="pt-4 border-t border-orange-200/60 flex items-center justify-between">
                  <span class="text-xs font-semibold text-orange-600">
                    {{ service.details.length }} Core Capabilities
                  </span>
                  <a
                    routerLink="/services"
                    (click)="scrollToTop()"
                    class="text-xs font-bold text-gray-900 hover:text-orange-600 transition-colors"
                  >
                    Learn more →
                  </a>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- 5. Projects Teaser -->
      <section class="py-24 bg-[#FDF6F0] relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span class="text-orange-500 font-semibold text-xs uppercase tracking-widest block mb-2">
                {{ isAm() ? 'የተሰሩ ስራዎች' : 'Real Ethiopian Job Sites' }}
              </span>
              <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                {{ isAm() ? 'ተለይተው የቀረቡ ፕሮጀክቶች' : 'Featured Architectural Portfolio' }}
              </h2>
            </div>
            
            <div class="flex items-center gap-3">
              <a
                routerLink="/projects"
                (click)="scrollToTop()"
                class="inline-flex items-center gap-2 bg-white hover:bg-orange-50 text-gray-900 border border-orange-200 px-5 py-2.5 rounded-full text-xs font-bold shadow-sm transition-all"
              >
                <app-icon name="film" customClass="w-3.5 h-3.5 text-orange-500"></app-icon>
                <span>{{ isAm() ? 'ቪዲዮዎችን እና ፕሮጀክቶችን ይመልከቱ' : 'Watch Reels & Projects' }}</span>
              </a>

              <a
                routerLink="/projects"
                (click)="scrollToTop()"
                class="inline-flex items-center gap-2 bg-[#CC4C0F] hover:bg-[#B33E08] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md hover:shadow-orange-500/25 transition-all"
              >
                <span>{{ isAm() ? 'ሁሉንም ይመልከቱ' : 'Explore All' }}</span>
                <app-icon name="arrow-right" customClass="w-3.5 h-3.5"></app-icon>
              </a>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            @for (project of featuredProjects; track project.id) {
              <div
                (click)="selectProject(project)"
                class="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-orange-500/20 border border-orange-100 transition-all duration-300 group cursor-pointer flex flex-col"
              >
                <div class="relative h-64 w-full overflow-hidden bg-gray-100">
                  <img
                    [src]="project.image"
                    [alt]="project.title"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
                  <div class="absolute top-4 left-4">
                    <span class="bg-white/90 backdrop-blur-md text-orange-600 font-bold text-[11px] px-3 py-1 rounded-full shadow">
                      {{ project.categoryLabel }}
                    </span>
                  </div>
                  <div class="absolute bottom-4 left-4 right-4 text-white">
                    <h3 class="font-bold text-lg leading-tight mb-1">{{ project.title }}</h3>
                    <p class="text-xs text-white/80">{{ project.location }}</p>
                  </div>
                </div>
                <div class="p-6 flex-1 flex flex-col justify-between">
                  <p class="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-4">
                    {{ project.description }}
                  </p>
                  <div class="flex items-center justify-between pt-3 border-t border-gray-100 text-xs font-semibold text-orange-600">
                    <span>{{ project.scope }}</span>
                    <span>View Details →</span>
                  </div>
                </div>
              </div>
            }
          </div>

        </div>
      </section>

      <!-- 6. Testimonials Section -->
      <app-testimonials></app-testimonials>

      <!-- 7. Quick Get In Touch Banner -->
      <section class="py-20 bg-gradient-to-br from-[#1A1A1A] via-[#2A2320] to-[#1A1A1A] text-white relative overflow-hidden">
        <div class="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div class="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div class="lg:col-span-8 space-y-4">
              
              <h2 class="text-3xl sm:text-4xl font-bold tracking-tight">
                {{ isAm() ? 'የህልም ቤትዎን አብረን እንገንባ' : 'Ready to Transform Your Villa or Commercial Space?' }}
              </h2>
              <p class="text-white/70 text-sm sm:text-base max-w-2xl leading-relaxed">
                Contact our Addis Ababa team for turnkey finishing quotations, bespoke furniture fabrication, and site visits in Lebu, Bole, and across Ethiopia.
              </p>
            </div>
            <div class="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <a
                routerLink="/contact"
                (click)="scrollToTop()"
                class="inline-flex items-center justify-center gap-2 bg-[#CC4C0F] hover:bg-[#B33E08] text-white px-8 py-4 rounded-full font-bold text-sm shadow-xl shadow-orange-500/30 transition-all transform hover:-translate-y-0.5"
              >
                <span>{{ isAm() ? 'አድራሻ እና መልዕክት' : 'Get in Touch' }}</span>
                <app-icon name="arrow-right" customClass="w-4 h-4"></app-icon>
              </a>
              <a
                href="tel:+251910900931"
                class="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-full font-semibold text-sm border border-white/20 transition-all"
              >
                <app-icon name="phone" customClass="w-4 h-4 text-orange-400"></app-icon>
                <span>Call +251 910 900 931</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  `
})
export class HomePageComponent {
  private translation = inject(TranslationService);
  private projectsService = inject(ProjectsService);
  private servicesService = inject(ServicesService);
  private modalService = inject(ModalService);

  readonly isAm = this.translation.isAmharic;
  readonly featuredProjects = this.projectsService.getProjects().slice(0, 3);
  readonly featuredServices = this.servicesService.getServices().slice(0, 3);

  handleSearch(_term: string): void {
    const elem = document.getElementById('collections');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  }

  selectProject(project: ProjectItem): void {
    this.modalService.openProjectDetail(project);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

