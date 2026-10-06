import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Existing Imports
import { HeroComponent } from '../../components/hero.component';
import { BentoCollectionsComponent } from '../../components/bento-collections.component';
import { InteractiveShowcaseComponent } from '../../components/interactive-showcase.component';
import { ProjectsGalleryComponent } from '../../components/projects-gallery.component';
import { ServicesSectionComponent } from '../../components/services-section.component';
import { TestimonialsComponent } from '../../components/testimonials.component';

// Recovered Components
import { ProjectGridHomeComponent } from '../../components/project-grid-home.component';
import { CapabilitiesStripComponent } from '../../components/capabilities-strip.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeroComponent,
    BentoCollectionsComponent,
    InteractiveShowcaseComponent,
    ServicesSectionComponent,
    TestimonialsComponent,
    ProjectGridHomeComponent,
    CapabilitiesStripComponent
  ],
  template: `
    <div class="space-y-0 animate-in fade-in duration-300">
      
      <!-- 1. Hero System (Intro -> Filter -> Split) -->
      <app-hero></app-hero>

      <!-- 2. Collections -->
      <app-bento-collections></app-bento-collections>

      <!-- 4. Interactive Showcase -->
      <app-interactive-showcase></app-interactive-showcase>

      <!-- 5. Capabilities Strip -->
      <app-capabilities-strip></app-capabilities-strip>

      <!-- 6. Project Grid Home -->
      <app-project-grid-home></app-project-grid-home>

      <!-- 7. Services -->
      <app-services-section></app-services-section>

      <!-- 8. Testimonials -->
      <app-testimonials></app-testimonials>

      <!-- 9. Consultation Form (Dark Mode Style) -->
      <section class="py-24 relative overflow-hidden" id="contact" style="background: radial-gradient(circle at top right, rgba(255,107,0,0.1), transparent 40%), #0d0d0d;">
        <div class="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
          <div class="text-center mb-12">
            <h2 class="font-serif text-4xl sm:text-5xl font-bold text-white mb-4">Start Your Project</h2>
            <p class="text-gray-400">Request a consultation or turnkey finishing proposal.</p>
          </div>
          
          <form class="space-y-6 bg-white/5 p-8 sm:p-10 rounded-3xl border border-white/10 backdrop-blur-xl">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input type="text" placeholder="Full Name" class="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] transition-colors" />
              <input type="email" placeholder="Email Address" class="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] transition-colors" />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input type="tel" placeholder="Phone Number" class="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] transition-colors" />
              <select class="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-gray-400 focus:outline-none focus:border-[#FF6B00] transition-colors appearance-none">
                <option value="" disabled selected>Project Type</option>
                <option value="residential">Residential Villa</option>
                <option value="commercial">Commercial / Office</option>
                <option value="hospitality">Hospitality / Hotel</option>
              </select>
            </div>
            <textarea placeholder="Tell us about your project..." rows="4" class="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#FF6B00] transition-colors resize-none"></textarea>
            <button type="button" class="w-full bg-[#FF6B00] text-white font-bold rounded-xl px-5 py-4 hover:bg-[#e66000] transition-all transform hover:-translate-y-1 shadow-lg shadow-[#FF6B00]/25">
              Submit Request
            </button>
          </form>
        </div>
      </section>

    </div>
  `
})
export class HomePageComponent {
}
