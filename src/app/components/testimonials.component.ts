import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../shared/components/icon.component';
import { ServicesService } from '../core/services/services.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section class="py-20 relative overflow-hidden bg-white border-t border-orange-100/60">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        <div class="text-center max-w-2xl mx-auto mb-16">
          <span class="text-orange-500 font-semibold text-xs uppercase tracking-widest block mb-2">
            Client Testimonials
          </span>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            Trusted by Luxury Homeowners & Developers
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          @for (review of reviews; track review.id) {
            <div
              class="bg-[#FDF6F0] rounded-3xl p-8 border border-orange-100/80 shadow-md relative flex flex-col justify-between"
            >
              <div class="text-orange-400/40 absolute top-6 right-6">
                <app-icon name="quote" customClass="w-8 h-8"></app-icon>
              </div>
              <div>
                <div class="flex items-center gap-1 mb-4">
                  @for (star of [1,2,3,4,5]; track $index) {
                    <app-icon name="star" customClass="w-4 h-4 fill-orange-500 text-orange-500"></app-icon>
                  }
                </div>
                <p class="text-sm text-gray-700 leading-relaxed italic mb-6">
                  "{{ review.comment }}"
                </p>
              </div>

              <div class="flex items-center gap-3 pt-4 border-t border-orange-200/50">
                <div class="w-10 h-10 rounded-full bg-orange-500 text-white font-bold text-xs flex items-center justify-center shadow">
                  {{ review.avatar }}
                </div>
                <div>
                  <h4 class="text-sm font-bold text-gray-900">{{ review.name }}</h4>
                  <p class="text-xs text-gray-500">{{ review.role }}</p>
                </div>
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `
})
export class TestimonialsComponent {
  private servicesService = inject(ServicesService);
  readonly reviews = this.servicesService.getReviews();
}

