import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar.component';
import { FooterComponent } from './components/footer.component';
import { ProductDetailModalComponent } from './components/product-detail-modal.component';
import { ProjectModalComponent } from './components/project-modal.component';
import { LicenseModalComponent } from './components/license-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    ProductDetailModalComponent,
    ProjectModalComponent,
    LicenseModalComponent
  ],
  template: `
    <div class="min-h-screen bg-[#FDF6F0] dark:bg-[#121212] text-[#1A1A1A] dark:text-white flex flex-col font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">
      
      <!-- 1. Frozen Navigation Bar -->
      <app-navbar></app-navbar>

      <!-- 2. Page Content Rendered Based on Active Route -->
      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>

      <!-- 3. Comprehensive 4-Column Footer -->
      <app-footer></app-footer>

      <!-- 4. Global Modals -->
      <app-product-detail-modal></app-product-detail-modal>
      <app-project-modal></app-project-modal>
      <app-license-modal></app-license-modal>

    </div>
  `
})
export class AppComponent {}
