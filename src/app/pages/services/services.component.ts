import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';
import { ServicesService } from '../../core/services/services.service';
import { IconComponent } from '../../shared/components/icon.component';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <div class="space-y-0 animate-in fade-in duration-300">
      
      <!-- 1. Page Header Banner -->
      <section class="relative py-20 bg-gradient-to-br from-[#1A1A1A] via-[#2D211C] to-[#1A1A1A] text-white overflow-hidden">
        <div class="absolute top-0 right-0 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div class="max-w-3xl">
          
            
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {{ isAm() ? 'የተሟላ የቤት ፊኒሺንግ እና ዲዛይን' : 'End-to-End Turnkey Interior Execution' }}
            </h1>
            
            <p class="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">
              From 3D architectural spatial planning and gypsum false ceilings to bespoke carpentry, quartz surfaces, and certified electrical & sanitary installations.
            </p>
          </div>
        </div>
      </section>

      <!-- 2. Services Deep Dive List -->
      <section class="py-20 bg-[#FDF6F0]">
        <div class="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div class="space-y-16">
            @for (service of services; track service.id; let index = $index) {
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white p-8 sm:p-12 rounded-3xl border border-orange-100 shadow-md">
                
                <div [ngClass]="index % 2 === 0 ? 'order-1' : 'order-1 lg:order-2'" class="lg:col-span-6 space-y-6">
                  <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 text-xs font-bold uppercase tracking-wider">
                    Service 0{{ index + 1 }}
                  </div>

                  <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                    {{ service.title }}
                  </h3>
                  @if (service.titleAm) {
                    <p class="text-sm font-semibold text-orange-600 -mt-3">{{ service.titleAm }}</p>
                  }

                  <p class="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {{ service.shortDesc }}
                  </p>

                  <div class="space-y-3 pt-2">
                    <h4 class="text-xs font-bold uppercase tracking-wider text-gray-500">Key Capabilities & Deliverables:</h4>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      @for (item of service.details; track item) {
                        <div class="flex items-center gap-2 text-xs text-gray-800">
                          <app-icon name="check-circle" customClass="w-4 h-4 text-orange-500 flex-shrink-0"></app-icon>
                          <span>{{ item }}</span>
                        </div>
                      }
                    </div>
                  </div>

                  <div class="pt-4 flex items-center gap-4">
                    <a
                      routerLink="/contact"
                      class="bg-[#CC4C0F] hover:bg-[#B33E08] text-white px-6 py-3 rounded-full text-xs font-bold shadow-md shadow-orange-500/20 transition-all flex items-center gap-2"
                    >
                      <span>Inquire Service</span>
                      <app-icon name="arrow-right" customClass="w-4 h-4"></app-icon>
                    </a>
                  </div>
                </div>

                <div [ngClass]="index % 2 === 0 ? 'order-2' : 'order-2 lg:order-1'" class="lg:col-span-6">
                  <div class="relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3] bg-gray-100 group">
                    <img 
                      [src]="service.image" 
                      [alt]="service.title" 
                      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <div class="absolute bottom-4 left-6 right-6 text-white text-xs font-semibold">
                      {{ service.title }} • Executed by Zener Home P.L.C.
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>

        </div>
      </section>

      <!-- 3. The 5-Step Turnkey Process -->
      <section class="py-20 bg-white border-t border-orange-100">
        <div class="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div class="text-center max-w-2xl mx-auto mb-16">
            <span class="text-orange-500 font-semibold text-xs uppercase tracking-widest block mb-2">
              Our Methodology
            </span>
            <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">
              How We Deliver Flawless Execution
            </h2>
            <p class="text-gray-600 text-sm sm:text-base">
              A disciplined, milestone-driven workflow ensuring on-time handover, fixed budget adherence, and superior craftsmanship.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-5 gap-6">
            @for (step of executionSteps; track step.step) {
              <div class="bg-[#FDF6F0] p-6 rounded-3xl border border-orange-200/60 relative flex flex-col justify-between">
                <div>
                  <span class="text-3xl font-black text-orange-400/60 block mb-4 font-mono">{{ step.step }}</span>
                  <h3 class="font-bold text-base text-gray-900 mb-2">{{ step.title }}</h3>
                  <p class="text-gray-600 text-xs leading-relaxed">{{ step.desc }}</p>
                </div>
              </div>
            }
          </div>

        </div>
      </section>

      <!-- 4. Consultation CTA -->
      <section class="py-16 bg-[#FDF6F0] border-t border-orange-100">
        <div class="max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <div class="max-w-2xl mx-auto space-y-4">
            <h3 class="text-2xl sm:text-3xl font-bold text-gray-900">
              Need a Customized Finishing Proposal?
            </h3>
            <p class="text-gray-600 text-sm sm:text-base">
              Send us your architectural drawings or schedule an on-site visit in Addis Ababa.
            </p>
            <div class="pt-4 flex flex-wrap items-center justify-center gap-4">
              <a
                routerLink="/contact"
                class="bg-[#CC4C0F] hover:bg-[#B33E08] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-lg transition-all"
              >
                Contact Engineering Team
              </a>
              <a
                href="tel:+251910900931"
                class="bg-white hover:bg-orange-50 text-gray-900 border border-orange-200 px-6 py-3.5 rounded-full font-semibold text-sm transition-all"
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
export class ServicesPageComponent {
  private translation = inject(TranslationService);
  private servicesService = inject(ServicesService);

  readonly isAm = this.translation.isAmharic;
  readonly services = this.servicesService.getServices();

  readonly executionSteps = [
    { step: '01', title: 'Consultation & Site Survey', desc: 'Precise on-site laser measurements, floorplan analysis, and initial client aesthetic preferences.' },
    { step: '02', title: '3D Photorealistic Render', desc: 'Material, lighting, and spatial visualization before a single hammer strikes.' },
    { step: '03', title: 'Transparent BOQ & Contract', desc: 'Itemized material specs, fixed pricing, and legal milestone delivery schedule.' },
    { step: '04', title: 'Atelier & On-Site Construction', desc: 'In-house carpentry fabrication paired with certified on-site finishing crews.' },
    { step: '05', title: 'Handover & Warranty', desc: 'Full quality check, deep clean, and certificate of warranty handover.' },
  ];
}
