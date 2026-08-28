import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalService } from '../core/services/modal.service';
import { IconComponent } from '../shared/components/icon.component';

@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <section id="about" class="py-24 relative overflow-hidden bg-gradient-to-b from-[#FDF6F0] via-white/80 to-[#FDF6F0]">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <!-- Left Column: Story, Values, Verified Credibility -->
          <div class="lg:col-span-6 flex flex-col items-start">
            
            <span class="text-orange-500 font-semibold text-sm uppercase tracking-widest mb-3">
              About Us
            </span>
            
            <h2 class="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6 leading-tight">
              Creating sophisticated interiors of
              <span class="text-orange-500">timeless quality</span> and comfort.
            </h2>

            <p class="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
              We have achieved a reputation for more than <strong>8+ years</strong> on the market for our ability to create luxurious, sophisticated interiors of extraordinary design and functionality, infused with our clients’ personal style and desires.
            </p>

            <p class="text-sm sm:text-base text-gray-600 mb-8 leading-relaxed">
              Specializing in providing turnkey interior design solutions, bespoke woodworks, and precision construction for high-end residential luxury homes, villas, corporate offices, and hospitality projects. Most importantly, we strictly respect our client’s budget and established timeline.
            </p>

            <!-- Credibility Checklist -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
              <div class="flex items-start gap-3">
                <app-icon name="check-circle-2" customClass="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5"></app-icon>
                <span class="text-sm font-medium text-gray-800">Licensed Finishing Contractor</span>
              </div>
              <div class="flex items-start gap-3">
                <app-icon name="check-circle-2" customClass="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5"></app-icon>
                <span class="text-sm font-medium text-gray-800">Direct In-House Carpentry Factory</span>
              </div>
              <div class="flex items-start gap-3">
                <app-icon name="check-circle-2" customClass="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5"></app-icon>
                <span class="text-sm font-medium text-gray-800">Photorealistic 3D Spatial Plans</span>
              </div>
              <div class="flex items-start gap-3">
                <app-icon name="check-circle-2" customClass="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5"></app-icon>
                <span class="text-sm font-medium text-gray-800">Strict Budget & On-Time Guarantee</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center gap-4">
              <a
                routerLink="/about"
                class="inline-flex items-center gap-2 bg-[#CC4C0F] text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[#B33E08] shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Explore more</span>
                <app-icon name="arrow-right" customClass="w-4 h-4"></app-icon>
              </a>

              <button
                (click)="openLicense()"
                class="inline-flex items-center gap-2 bg-white text-gray-800 border border-orange-200 px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-orange-50 transition-all"
              >
                <app-icon name="file-text" customClass="w-4 h-4 text-orange-500"></app-icon>
                <span>View Official License</span>
              </button>
            </div>

          </div>

          <!-- Right Column: Atmosphere Photo Card -->
          <div class="lg:col-span-6 relative">
            
            <div class="absolute -inset-4 bg-gradient-to-tr from-orange-500 to-amber-400 rounded-[2.5rem] opacity-20 blur-xl transform -rotate-1 pointer-events-none"></div>

            <div class="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-orange-100/80 group">
              <div class="relative h-[480px] sm:h-[520px] w-full overflow-hidden">
                <img 
                  src="/images/pages/page-02.jpg" 
                  alt="Zener Home Luxury Dining and Interior Atmosphere" 
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
                
                <!-- Floating Bottom Card Details -->
                <div class="absolute bottom-6 left-6 right-6 text-white">
                  <div class="glass-card text-gray-900 p-5 rounded-2xl border border-white/60 shadow-xl">
                    <div class="flex items-center justify-between gap-4">
                      <div>
                        <div class="flex items-center gap-1.5 text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
                          <app-icon name="award" customClass="w-4 h-4"></app-icon>
                          <span>Zener Home P.L.C.</span>
                        </div>
                        <p class="text-sm font-bold text-gray-900">Addis Ababa, Nifas Silk Lafto / Lebu Area</p>
                        <p class="text-xs text-gray-500 mt-0.5">8+ Years Turnkey Excellence</p>
                      </div>
                      <div class="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                        <app-icon name="shield-check" customClass="w-6 h-6"></app-icon>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  `
})
export class AboutSectionComponent {
  private modalService = inject(ModalService);

  openLicense(): void {
    this.modalService.openLicenseModal();
  }
}
