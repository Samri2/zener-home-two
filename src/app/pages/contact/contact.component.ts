import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../core/services/translation.service';
import { IconComponent } from '../../shared/components/icon.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <div class="space-y-0 animate-in fade-in duration-300">
      
      <!-- 1. Hero Banner -->
      <section class="relative py-20 bg-gradient-to-br from-[#1A1A1A] via-[#2D211C] to-[#1A1A1A] text-white overflow-hidden">
        <div class="absolute top-0 right-0 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div class="max-w-3xl">
           
            
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {{ isAm() ? 'የህልም ቤትዎን አብረን እንገንባ' : "Let's Craft Your Next Masterpiece." }}
            </h1>
            
            <p class="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">
              Whether you are finishing a private luxury villa, a multi-story hotel, or seeking bespoke hardwood furniture, our specialized team is ready to assist you.
            </p>
          </div>
        </div>
      </section>

      <!-- 2. Main Contact Grid -->
      <section class="py-20 bg-[#FDF6F0]">
        <div class="max-w-7xl mx-auto px-6 sm:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <!-- Left: Contact Info & Direct Channels (5 Cols) -->
            <div class="lg:col-span-5 space-y-8">
              <div>
                <span class="text-orange-500 font-semibold text-xs uppercase tracking-widest block mb-2">
                  {{ isAm() ? 'የቀጥታ ግንኙነት' : 'Direct Channels' }}
                </span>
                <h2 class="text-3xl font-bold text-gray-900 mb-4">
                  {{ isAm() ? 'የቢሮ እና የጣቢያ አድራሻ' : 'Headquarters & Workshops' }}
                </h2>
                <p class="text-gray-600 text-sm leading-relaxed">
                  Visit our office in Addis Ababa or call our engineering team for prompt site evaluations and material samples.
                </p>
              </div>

              <!-- Direct Info Cards -->
              <div class="space-y-4">
                
                <!-- Phone -->
                <div class="bg-white p-6 rounded-3xl shadow-sm border border-orange-100/80 flex items-start gap-4 hover:border-orange-300 transition-colors">
                  <div class="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center flex-shrink-0">
                    <app-icon name="phone" customClass="w-5 h-5"></app-icon>
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900 text-sm mb-1">{{ isAm() ? 'ስልክ ቁጥር' : 'Direct Phone Lines' }}</h3>
                    <p class="text-xs text-gray-500 mb-2">Mon - Sat from 8:30 AM to 6:30 PM</p>
                    <div class="flex flex-col gap-1 font-semibold text-sm text-gray-800">
                      <a href="tel:+251910900931" class="hover:text-orange-600 transition-colors">
                        +251 910 900 931
                      </a>
                      <a href="tel:+251922166213" class="hover:text-orange-600 transition-colors">
                        +251 922 166 213
                      </a>
                    </div>
                  </div>
                </div>

                <!-- Email -->
                <div class="bg-white p-6 rounded-3xl shadow-sm border border-orange-100/80 flex items-start gap-4 hover:border-orange-300 transition-colors">
                  <div class="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center flex-shrink-0">
                    <app-icon name="mail" customClass="w-5 h-5"></app-icon>
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900 text-sm mb-1">{{ isAm() ? 'ኢሜይል' : 'Email Address' }}</h3>
                    <p class="text-xs text-gray-500 mb-2">Send CAD drawings & tenders</p>
                    <a href="mailto:zenerfinishingzf@gmail.com" class="font-semibold text-sm text-orange-600 hover:underline">
                      zenerfinishingzf@gmail.com
                    </a>
                  </div>
                </div>

                <!-- Location -->
                <div class="bg-white p-6 rounded-3xl shadow-sm border border-orange-100/80 flex items-start gap-4 hover:border-orange-300 transition-colors">
                  <div class="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center flex-shrink-0">
                    <app-icon name="map-pin" customClass="w-5 h-5"></app-icon>
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900 text-sm mb-1">{{ isAm() ? 'ዋና ቢሮ' : 'Office Location' }}</h3>
                    <p class="text-xs text-gray-600 leading-relaxed font-medium">
                      Addis Ababa, Nifas Silk Lafto Subcity, Lebu Area / Bole, Ethiopia
                    </p>
                    <p class="text-[11px] text-gray-400 mt-1">Licensed by Addis Ababa Trade Bureau</p>
                  </div>
                </div>

                <!-- WhatsApp Quick Chat -->
                <div class="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-6 rounded-3xl shadow-md flex items-center justify-between">
                  <div class="space-y-1">
                    <h4 class="font-bold text-sm">Instant WhatsApp Assistance</h4>
                    <p class="text-xs text-white/90">Chat directly with our project manager</p>
                  </div>
                  <a
                    href="https://wa.me/251910900931"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="bg-white text-emerald-700 hover:bg-emerald-50 px-4 py-2 rounded-full font-bold text-xs shadow transition-all"
                  >
                    Open Chat
                  </a>
                </div>

              </div>

              <!-- Social Channels -->
              <div class="bg-white p-6 rounded-3xl border border-orange-100/80">
                <h4 class="font-bold text-xs uppercase tracking-wider text-gray-500 mb-3">Official Social Channels</h4>
                <div class="flex flex-wrap gap-2">
                  <a
                    href="https://facebook.com/zenerhome"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-5 py-1.5 rounded-full bg-orange-50 hover:bg-orange-500 hover:text-white text-orange-700 text-ls font-semibold transition-colors"
                  >
                    Facebook
                  </a>
                  <a
                    href="https://instagram.com/zener_interior_solution"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-5 py-1.5 rounded-full bg-orange-50 hover:bg-orange-500 hover:text-white text-orange-700 text-ls font-semibold transition-colors"
                  >
                  Instagram
                  </a>
                  <a
                    href="https://tiktok.com/@zenerhome"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-5 py-1.5 rounded-full bg-orange-50 hover:bg-orange-500 hover:text-white text-orange-700 text-ls font-semibold transition-colors"
                  >
                   Tiktok
                  </a>
                </div>
              </div>

            </div>


          </div>
        </div>
      </section>

      <!-- 3. Location & Trust Strip -->
      <section class="py-16 bg-white border-t border-orange-100">
        <div class="max-w-7xl mx-auto px-6 sm:px-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h4 class="font-bold text-gray-900 text-sm mb-1">On-Site Measurement</h4>
                <p class="text-xs text-gray-600">Our engineers inspect and take precise 3D measurements of your property.</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h4 class="font-bold text-gray-900 text-sm mb-1">3D Visualization & BOQ</h4>
                <p class="text-xs text-gray-600">We produce realistic interior renders and an itemized transparent bill of materials.</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h4 class="font-bold text-gray-900 text-sm mb-1">Turnkey Execution</h4>
                <p class="text-xs text-gray-600">Precision fabrication, installation, and on-time handover guaranteed by contract.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  `
})
export class ContactPageComponent {
  private translation = inject(TranslationService);
  readonly isAm = this.translation.isAmharic;

  formState = {
    name: '',
    phone: '',
    email: '',
    projectType: 'Residential Villa',
    location: 'Addis Ababa',
    areaSize: '',
    timeline: 'Within 1-3 Months',
    message: '',
  };

  isSubmitted = false;
  loading = false;

  get whatsappUrl(): string {
    const text = `Hello Zener Home, I would like to request an estimate for a ${this.formState.projectType} in ${this.formState.location || 'Addis Ababa'}. My phone is ${this.formState.phone}.`;
    return `https://wa.me/251910900931?text=${encodeURIComponent(text)}`;
  }

  handleSubmit(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.isSubmitted = true;
    }, 500);
  }

  resetForm(): void {
    this.isSubmitted = false;
    this.formState = {
      name: '',
      phone: '',
      email: '',
      projectType: 'Residential Villa',
      location: 'Addis Ababa',
      areaSize: '',
      timeline: 'Within 1-3 Months',
      message: '',
    };
  }
}

