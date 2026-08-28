import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServicesService } from '../core/services/services.service';
import { IconComponent } from '../shared/components/icon.component';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <section id="services" class="py-24 bg-white relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 text-orange-600 text-xs font-semibold uppercase tracking-wider mb-4">
              <app-icon name="compass" customClass="w-3.5 h-3.5"></app-icon>
              <span>Our Services</span>
            </div>
            <h2 class="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              Turnkey Interior Execution &
              <span class="text-orange-500 underline decoration-orange-300 underline-offset-8">
                Finishing
              </span>
            </h2>
          </div>
          <p class="text-gray-600 text-base max-w-md">
            Complete design-to-build finishing for residential luxury homes, boutique hotels, and corporate commercial spaces.
          </p>
        </div>

        <!-- 6-Grid Services Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (service of services; track service.id; let idx = $index) {
            <div class="bg-[#FDF6F0] rounded-3xl p-8 border border-orange-100/80 hover:border-orange-300 hover:shadow-2xl hover:shadow-orange-500/15 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div class="flex items-center justify-between mb-6">
                  <div class="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-orange-500/20 group-hover:scale-110 transition-transform">
                    0{{ idx + 1 }}
                  </div>
                  <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Zener Atelier
                  </span>
                </div>

                <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {{ service.title }}
                </h3>
                @if (service.titleAm) {
                  <p class="text-xs text-orange-600 font-medium mb-3">{{ service.titleAm }}</p>
                }

                <p class="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
                  {{ service.shortDesc }}
                </p>

                <!-- Bullet Capabilities -->
                <div class="space-y-2 mb-6">
                  @for (detail of service.details.slice(0, 3); track detail) {
                    <div class="flex items-center gap-2 text-xs text-gray-700">
                      <app-icon name="check-circle" customClass="w-3.5 h-3.5 text-orange-500 flex-shrink-0"></app-icon>
                      <span class="truncate">{{ detail }}</span>
                    </div>
                  }
                </div>
              </div>

              <div class="pt-4 border-t border-orange-200/60 flex items-center justify-between">
                <a
                  routerLink="/services"
                  class="text-xs font-bold text-gray-900 hover:text-orange-600 transition-colors"
                >
                  Learn more →
                </a>
                <a
                  routerLink="/contact"
                  class="bg-orange-500/10 hover:bg-orange-500 hover:text-white text-orange-600 text-xs font-semibold px-4 py-2 rounded-full transition-all"
                >
                  Inquire
                </a>
              </div>
            </div>
          }
        </div>

        <!-- Finishing Guarantee Banner -->
        <div class="mt-16 bg-gradient-to-r from-[#1A1A1A] via-[#2E231E] to-[#1A1A1A] text-white rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div class="max-w-xl space-y-3">
            <span class="bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider inline-block">
              Turnkey Finishing Guarantee
            </span>
            <h3 class="text-2xl sm:text-3xl font-bold">
              100% Fixed-Budget & Milestone Handover Contracts
            </h3>
            <p class="text-white/80 text-xs sm:text-sm leading-relaxed">
              We eliminate unexpected finishing budget surges with pre-agreed BOQs, registered company warranties, and transparent milestone payment structures.
            </p>
          </div>
          <div class="flex-shrink-0">
            <a
              routerLink="/contact"
              class="bg-[#CC4C0F] hover:bg-[#B33E08] text-white px-8 py-4 rounded-full font-bold text-xs sm:text-sm shadow-xl shadow-orange-500/30 transition-all inline-block"
            >
              Contact Engineering Team
            </a>
          </div>
        </div>

      </div>
    </section>
  `
})
export class ServicesSectionComponent {
  private servicesService = inject(ServicesService);

  readonly services = this.servicesService.getServices();
}
