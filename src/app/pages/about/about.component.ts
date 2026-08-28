import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';
import { ModalService } from '../../core/services/modal.service';
import { IconComponent } from '../../shared/components/icon.component';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <div class="space-y-0 animate-in fade-in duration-300">
      
      <!-- 1. Hero Banner -->
      <section class="relative py-20 bg-gradient-to-br from-[#1A1A1A] via-[#2D211C] to-[#1A1A1A] text-white overflow-hidden">
        <div class="absolute top-0 right-0 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div class="max-w-3xl">
            
            
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {{ isAm() ? '8+ ዓመታት በታማኝነት እና በጥራት' : '8+ Years Crafting Timeless Interiors in Ethiopia' }}
            </h1>
            
            <p class="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">
              We design and craft custom furniture and complete interior finishes for luxury homes, boutique hotels, and offices across Ethiopia.
            </p>
          </div>
        </div>
      </section>

      <!-- 2. Core Value Pillars: Uncompromising Quality, Timeline & Budget, Full Legal Licensing -->
      

      <!-- 3. Story & Identity -->
      <section class="py-20 bg-[#FDF6F0] dark:bg-[#262830]">
        <div class="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <!-- Story Text -->
            <div class="lg:col-span-6 space-y-6">
              <span class="text-orange-500 font-semibold text-xs uppercase tracking-widest block">
                Our Story & Promise
              </span>
              <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                "We treat your home and budget with total respect."
              </h2>
              <p class="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                At Zener Home P.L.C., we believe great interiors should be both stunning and practical. For over 8 years, our craftspeople, architects, and project managers have transformed empty structures into warm, functional homes tailored to how you actually live.
              </p>
              <p class="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                Based in Addis Ababa with ongoing projects across Lebu, Bole, Tafo CCD, and Bishoftu, we combine local mastery with world-class materials — from solid Wanza and Oak timber to precision German hardware.
              </p>

              <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4">
                <div class="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm">
                  <span class="text-2xl font-bold text-orange-600 block">8+</span>
                  <span class="text-xs text-gray-600">Years Experience</span>
                </div>
                <div class="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm">
                  <span class="text-2xl font-bold text-orange-600 block">150+</span>
                  <span class="text-xs text-gray-600">Completed Projects</span>
                </div>
                <div class="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm">
                  <span class="text-2xl font-bold text-orange-600 block">100%</span>
                  <span class="text-xs text-gray-600">Timeline Guarantee</span>
                </div>
              </div>
            </div>

            <!-- Official Credentials Box -->
            <div class="lg:col-span-6">
              <div class="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-orange-100 relative">
                
                <div class="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                  <div class="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
                    <app-icon name="file-text" customClass="w-6 h-6"></app-icon>
                  </div>
                  <div>
                    <h3 class="font-bold text-lg text-gray-900">Verified Business Registration</h3>
                    <p class="text-xs text-gray-500">Federal Democratic Republic of Ethiopia</p>
                  </div>
                </div>

                <div class="space-y-3.5 text-xs text-gray-700">
                  <div class="flex justify-between py-2 border-b border-gray-50">
                    <span class="font-semibold text-gray-500">Company Name:</span>
                    <span class="font-bold text-gray-900">ZENER HOME P.L.C. (ዜነር ሆም)</span>
                  </div>
                  <div class="flex justify-between py-2 border-b border-gray-50">
                    <span class="font-semibold text-gray-500">General Manager:</span>
                    <span class="font-bold text-gray-900">Fikadu Worku Belete</span>
                  </div>
                  <div class="flex justify-between py-2 border-b border-gray-50">
                    <span class="font-semibold text-gray-500">TIN Number:</span>
                    <span class="font-bold font-mono text-orange-600">0058592635</span>
                  </div>
                  <div class="flex justify-between py-2 border-b border-gray-50">
                    <span class="font-semibold text-gray-500">Trade License No:</span>
                    <span class="font-bold font-mono text-gray-900">14/706/3773177/2014</span>
                  </div>
                  <div class="flex justify-between py-2 border-b border-gray-50">
                    <span class="font-semibold text-gray-500">Commercial Registration:</span>
                    <span class="font-bold font-mono text-gray-900">KK/AA/14/706/894954/2010</span>
                  </div>
                  <div class="flex justify-between py-2">
                    <span class="font-semibold text-gray-500">Authorized Scope:</span>
                    <span class="font-bold text-gray-900 text-right">Finishing Contractor (51212) & Carpentry</span>
                  </div>
                </div>

                <div class="mt-8 pt-6 border-t border-gray-100 flex flex-wrap items-center gap-4">
                  <button
                    (click)="openLicenseModal()"
                    class="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all shadow-md flex items-center gap-1.5"
                  >
                    <app-icon name="eye" customClass="w-3.5 h-3.5"></app-icon>
                    <span>View License Certificate Document</span>
                  </button>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>
      <section class="py-16 bg-white border-b border-orange-100">
        <div class="max-w-7xl mx-auto px-6 sm:px-8">
          <div class="text-center max-w-2xl mx-auto mb-12">
            <span class="text-orange-600 font-bold text-xs uppercase tracking-widest block mb-2">
              Our Core Standards
            </span>
            <h2 class="text-3xl font-bold text-gray-900">
              Built on Precision, Integrity & Guarantee
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <!-- Card 1: Uncompromising Quality -->
            <div class="bg-[#FDF6F0] rounded-3xl p-8 border border-orange-200/80 shadow-sm hover:shadow-xl hover:border-orange-400 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div class="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center mb-6 shadow-md shadow-orange-500/20 group-hover:scale-110 transition-transform">
                  <app-icon name="award" customClass="w-6 h-6"></app-icon>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  Uncompromising Quality
                </h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  We employ high-density moisture resistant cores, German hardware fittings, certified electrical fixtures, and weather-proof exterior treatments.
                </p>
              </div>
              <div class="pt-6 mt-6 border-t border-orange-200/60 flex items-center gap-2 text-xs font-bold text-orange-600">
                <app-icon name="check-circle" customClass="w-4 h-4"></app-icon>
                <span>German Soft-Close & Certified Materials</span>
              </div>
            </div>

            <!-- Card 2: Timeline & Budget Respect -->
            <div class="bg-[#FDF6F0] rounded-3xl p-8 border border-orange-200/80 shadow-sm hover:shadow-xl hover:border-orange-400 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div class="w-12 h-12 rounded-2xl bg-[#1A1A1A] text-white flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                  <app-icon name="clock" customClass="w-6 h-6 text-orange-400"></app-icon>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  Timeline & Budget Respect
                </h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  Transparent bill of quantities (BOQ) with fixed milestone delivery schedules to ensure on-time and within-budget completions.
                </p>
              </div>
              <div class="pt-6 mt-6 border-t border-orange-200/60 flex items-center gap-2 text-xs font-bold text-orange-600">
                <app-icon name="check-circle" customClass="w-4 h-4"></app-icon>
                <span>Fixed Milestone Delivery Schedules</span>
              </div>
            </div>

            <!-- Card 3: Full Legal Licensing -->
            <div class="bg-[#FDF6F0] rounded-3xl p-8 border border-orange-200/80 shadow-sm hover:shadow-xl hover:border-orange-400 transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div class="w-12 h-12 rounded-2xl bg-orange-600 text-white flex items-center justify-center mb-6 shadow-md shadow-orange-500/20 group-hover:scale-110 transition-transform">
                  <app-icon name="shield-check" customClass="w-6 h-6"></app-icon>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  Full Legal Licensing
                </h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                  Formally registered under Category 51212 with complete documentation and clear warranty protocols.
                </p>
              </div>
              <div class="pt-6 mt-6 border-t border-orange-200/60 flex items-center gap-2 text-xs font-bold text-orange-600">
                <app-icon name="check-circle" customClass="w-4 h-4"></app-icon>
                <span>Registered Trade Category 51212</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- 4. Factory & On-Site Consultation -->
      <section class="py-16 bg-white border-t border-orange-100">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <div class="max-w-2xl mx-auto space-y-4">
            <h3 class="text-2xl sm:text-3xl font-bold text-gray-900">
              Visit Our Factory Atelier & Design Showroom
            </h3>
            <p class="text-gray-600 text-sm sm:text-base">
              Schedule an in-person meeting with our principal architect and timber specialists at our Addis Ababa facilities.
            </p>
            <div class="pt-4 flex flex-wrap items-center justify-center gap-4">
              <a
                routerLink="/contact"
                class="bg-[#CC4C0F] hover:bg-[#B33E08] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-orange-500/25 transition-all inline-flex items-center justify-center"
              >
                Contact Design Team
              </a>
              <a
                href="tel:+251910900931"
                class="bg-orange-50 hover:bg-orange-100 text-orange-700 px-6 py-3.5 rounded-full font-semibold text-sm border border-orange-200 transition-all"
              >
                Call +251 910 900 931
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  `
})
export class AboutPageComponent {
  private translation = inject(TranslationService);
  private modalService = inject(ModalService);

  readonly isAm = this.translation.isAmharic;

  openLicenseModal(): void {
    this.modalService.openLicenseModal();
  }
}
