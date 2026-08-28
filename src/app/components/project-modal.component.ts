import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalService } from '../core/services/modal.service';
import { IconComponent } from '../shared/components/icon.component';
import { ProjectItem } from '../core/data/projects';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    @if (project(); as proj) {
      <div 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        (click)="close()"
      >
        <div 
          class="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-3xl overflow-y-auto shadow-2xl border border-orange-100 flex flex-col justify-between"
          (click)="$event.stopPropagation()"
        >
          <!-- Close Button -->
          <button 
            (click)="close()"
            class="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-transform transform hover:scale-110"
            aria-label="Close modal"
          >
            <app-icon name="x" customClass="w-5 h-5"></app-icon>
          </button>

          <!-- Top Lightbox Stage: Big Image with Arrows -->
          <div class="relative h-[360px] sm:h-[480px] w-full bg-[#1A1A1A] flex items-center justify-center overflow-hidden">
            <img 
              [src]="activeImage() || proj.image" 
              [alt]="proj.title" 
              class="max-h-full max-w-full object-contain transition-all duration-300"
            />

            <!-- Prev Image Arrow -->
            @if (proj.gallery && proj.gallery.length > 1) {
              <button
                (click)="prevImage(proj)"
                class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-orange-500 text-white flex items-center justify-center transition-all shadow-lg"
                aria-label="Previous image"
              >
                ‹
              </button>
              <!-- Next Image Arrow -->
              <button
                (click)="nextImage(proj)"
                class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-orange-500 text-white flex items-center justify-center transition-all shadow-lg"
                aria-label="Next image"
              >
                ›
              </button>
            }

            <!-- Photo Index Badge -->
            <div class="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              Photo {{ currentPhotoIndex() + 1 }} / {{ proj.gallery.length }}
            </div>
          </div>

          <!-- Bottom: Gallery Thumbnails & Project Info -->
          <div class="p-6 sm:p-8 bg-white space-y-6">
            
            <!-- Thumbnail Carousel -->
            @if (proj.gallery && proj.gallery.length > 1) {
              <div>
                <span class="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-3">Project Photo Gallery</span>
                <div class="flex items-center gap-3 overflow-x-auto pb-2">
                  @for (img of proj.gallery; track img; let idx = $index) {
                    <button
                      (click)="setImage(img, idx)"
                      class="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 transition-all"
                      [ngClass]="activeImage() === img ? 'border-orange-500 scale-105 shadow-md ring-2 ring-orange-500/30' : 'border-transparent opacity-70 hover:opacity-100'"
                    >
                      <img [src]="img" [alt]="'Photo ' + (idx + 1)" class="w-full h-full object-cover" />
                    </button>
                  }
                </div>
              </div>
            }

            <!-- Project Details Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-gray-100 items-start">
              
              <div class="lg:col-span-8 space-y-2">
                <div class="flex items-center gap-2">
                  <span class="bg-orange-500/10 text-orange-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {{ proj.categoryLabel }}
                  </span>
                  <span class="text-xs text-gray-500">{{ proj.year }}</span>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 leading-tight">
                  {{ proj.title }}
                </h3>
                @if (proj.titleAm) {
                  <p class="text-sm font-semibold text-orange-600">{{ proj.titleAm }}</p>
                }
                <p class="text-gray-600 text-sm leading-relaxed">
                  {{ proj.description }}
                </p>

                <div class="flex items-center gap-2 text-xs text-gray-500 pt-2">
                  <app-icon name="map-pin" customClass="w-4 h-4 text-orange-500"></app-icon>
                  <span>{{ proj.location }}</span>
                </div>
              </div>

              <!-- Scope & Contact Actions -->
              <div class="lg:col-span-4 bg-[#FDF6F0] p-5 rounded-2xl border border-orange-100 space-y-3">
                <div>
                  <span class="text-[11px] uppercase tracking-wider text-gray-500 font-semibold block">Execution Scope</span>
                  <p class="text-sm font-bold text-gray-900">{{ proj.scope }}</p>
                </div>

                <div class="pt-3 border-t border-orange-200/60 flex flex-col gap-2">
                  <a
                    routerLink="/contact"
                    (click)="close()"
                    class="w-full bg-[#CC4C0F] hover:bg-[#B33E08] text-white py-2.5 rounded-full text-xs font-bold shadow-md transition-all text-center flex items-center justify-center"
                  >
                    Inquire via Contact
                  </a>
                  <a
                    href="tel:+251910900931"
                    class="w-full bg-white hover:bg-orange-50 text-gray-900 py-2 rounded-full text-xs font-semibold border border-orange-200 text-center flex items-center justify-center gap-1.5"
                  >
                    <app-icon name="phone" customClass="w-3.5 h-3.5 text-orange-500"></app-icon>
                    <span>Call Project Engineer</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    }
  `
})
export class ProjectModalComponent {
  private modalService = inject(ModalService);

  readonly project = this.modalService.selectedProject;
  activeImage = signal<string>('');
  currentPhotoIndex = signal<number>(0);

  close(): void {
    this.activeImage.set('');
    this.currentPhotoIndex.set(0);
    this.modalService.closeProjectDetail();
  }

  setImage(img: string, idx: number): void {
    this.activeImage.set(img);
    this.currentPhotoIndex.set(idx);
  }

  prevImage(proj: ProjectItem): void {
    if (!proj.gallery || proj.gallery.length === 0) return;
    const currentIdx = this.currentPhotoIndex();
    const newIdx = currentIdx === 0 ? proj.gallery.length - 1 : currentIdx - 1;
    this.setImage(proj.gallery[newIdx], newIdx);
  }

  nextImage(proj: ProjectItem): void {
    if (!proj.gallery || proj.gallery.length === 0) return;
    const currentIdx = this.currentPhotoIndex();
    const newIdx = (currentIdx + 1) % proj.gallery.length;
    this.setImage(proj.gallery[newIdx], newIdx);
  }
}
