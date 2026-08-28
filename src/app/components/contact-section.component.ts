import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../shared/components/icon.component';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <section id="contact-section" class="py-24 relative overflow-hidden bg-white border-t border-orange-100">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        <div class="text-center max-w-2xl mx-auto mb-16">
          <span class="text-orange-500 font-semibold text-xs uppercase tracking-widest block mb-3">
            Contact & Site Consultation
          </span>
          <h2 class="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-4">
            Visit Our Office or
            <span class="text-orange-500 underline decoration-orange-300 underline-offset-8">
              Call Directly
            </span>
          </h2>
          <p class="text-gray-600 text-sm sm:text-base">
            Reach out for project consultations, site visits, or custom furniture fabrication inquiries in Addis Ababa and surrounding regions.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <!-- Left Column: Contact Cards & Office Details -->
          <div class="lg:col-span-5 space-y-6">
            
            <!-- Card 1: Office Location -->
            <div class="bg-[#FDF6F0] rounded-3xl p-6 border border-orange-100/80 shadow-md">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-500/30">
                  <app-icon name="map-pin" customClass="w-6 h-6"></app-icon>
                </div>
                <div>
                  <h4 class="text-base font-bold text-gray-900 mb-1">Head Office & Workshop</h4>
                  <p class="text-sm text-gray-700 leading-relaxed">
                    Addis Ababa, Nifas Silk Lafto Subcity, Lebu Area / Bole Subcity
                  </p>
                  <p class="text-xs text-orange-600 font-medium mt-1">
                    Near German Square / Gabriel Church Area
                  </p>
                </div>
              </div>
            </div>

            <!-- Card 2: Phone Numbers -->
            <div class="bg-[#FDF6F0] rounded-3xl p-6 border border-orange-100/80 shadow-md">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-500/30">
                  <app-icon name="phone" customClass="w-6 h-6"></app-icon>
                </div>
                <div>
                  <h4 class="text-base font-bold text-gray-900 mb-1">Direct Phone Lines</h4>
                  <div class="flex flex-col gap-1 text-sm font-semibold text-gray-800">
                    <a href="tel:+251910900931" class="hover:text-orange-600 transition-colors">
                      +251 910 900 931
                    </a>
                    <a href="tel:+251922166213" class="hover:text-orange-600 transition-colors">
                      +251 922 166 213
                    </a>
                  </div>
                  <div class="flex items-center gap-1 text-xs text-gray-500 mt-2">
                    <app-icon name="clock" customClass="w-3.5 h-3.5 text-orange-500"></app-icon>
                    <span>Monday - Saturday: 8:30 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card 3: Email & WhatsApp -->
            <div class="bg-[#FDF6F0] rounded-3xl p-6 border border-orange-100/80 shadow-md">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-500/30">
                  <app-icon name="mail" customClass="w-6 h-6"></app-icon>
                </div>
                <div>
                  <h4 class="text-base font-bold text-gray-900 mb-1">Email Inquiry</h4>
                  <a href="mailto:zenerfinishingzf@gmail.com" class="text-sm font-semibold text-gray-800 hover:text-orange-600 transition-colors break-all">
                    zenerfinishingzf@gmail.com
                  </a>
                  <p class="text-xs text-gray-500 mt-1">
                    Replies within 24 hours with engineer review.
                  </p>
                </div>
              </div>
            </div>

            <!-- WhatsApp Quick CTA -->
            <a
              href="https://wa.me/251910900931"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-full text-sm shadow-lg shadow-green-600/25 transition-all flex items-center justify-center gap-2.5 transform hover:-translate-y-0.5"
            >
              <app-icon name="message-square" customClass="w-5 h-5"></app-icon>
              <span>Chat Directly on WhatsApp (+251 910 900 931)</span>
            </a>

          </div>

          <!-- Right Column: Interactive Schedule & Consultation Form -->
          <div class="lg:col-span-7 bg-[#FDF6F0] rounded-3xl p-8 sm:p-10 border border-orange-100/80 shadow-xl">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">
              Send an Inquiry or Schedule a Site Visit
            </h3>
            <p class="text-sm text-gray-600 mb-6 leading-relaxed">
              Fill in your project requirements and our lead finishing engineer will schedule an on-site evaluation.
            </p>

            @if (submitted) {
              <div class="text-center py-10">
                <div class="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                  <app-icon name="check-circle-2" customClass="w-8 h-8"></app-icon>
                </div>
                <h4 class="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h4>
                <p class="text-sm text-gray-600 max-w-md mx-auto mb-6">
                  Thank you! Your project details have been received. We will contact you shortly.
                </p>
                <button
                  (click)="submitted = false"
                  class="bg-orange-500 text-white px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-orange-600 transition-all"
                >
                  Send Another Inquiry
                </button>
              </div>
            } @else {
              <form (ngSubmit)="handleSubmit()" class="space-y-4">
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Abebe Kebede"
                      [(ngModel)]="name"
                      name="name"
                      class="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0911 000 000"
                      [(ngModel)]="phone"
                      name="phone"
                      class="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white"
                    />
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Project Type
                    </label>
                    <select
                      [(ngModel)]="projectType"
                      name="projectType"
                      class="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white"
                    >
                      <option value="residential">Residential Villa Finishing</option>
                      <option value="apartment">Apartment Finishing</option>
                      <option value="commercial">Commercial / Corporate Office</option>
                      <option value="hospitality">Hotel / Banquet / Spa</option>
                      <option value="furniture">Custom Furniture / Kitchen Only</option>
                    </select>
                  </div>

                  <div>
                    <label class="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                      Site Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bole, Bulbula, Lebu, CMC"
                      [(ngModel)]="location"
                      name="location"
                      class="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Project Requirements & Scope *
                  </label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Describe your space dimensions, gypsum requirements, lighting preferences, or custom woodwork..."
                    [(ngModel)]="message"
                    name="message"
                    class="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 bg-white"
                  ></textarea>
                </div>

                <div class="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    class="flex-1 bg-[#CC4C0F] hover:bg-[#B33E08] text-white font-semibold py-3.5 px-6 rounded-full text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <app-icon name="send" customClass="w-4 h-4"></app-icon>
                    <span>Submit Project Details</span>
                  </button>
                </div>

              </form>
            }

          </div>

        </div>

      </div>
    </section>
  `
})
export class ContactSectionComponent {
  name = '';
  phone = '';
  projectType = 'residential';
  location = '';
  message = '';
  submitted = false;

  handleSubmit(): void {
    const text = `Hello Zener Home!\n\n*Name:* ${this.name}\n*Phone:* ${this.phone}\n*Project Type:* ${this.projectType}\n*Site Location:* ${this.location || 'Addis Ababa'}\n*Requirements:* ${this.message}`;
    window.open(`https://wa.me/251910900931?text=${encodeURIComponent(text)}`, '_blank');
    this.submitted = true;
  }
}
