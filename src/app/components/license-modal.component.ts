import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../core/services/modal.service';
import { IconComponent } from '../shared/components/icon.component';

@Component({
  selector: 'app-license-modal',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    @if (isOpen()) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <div class="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
          <button
            (click)="close()"
            class="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-900 bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <app-icon name="x" customClass="w-5 h-5"></app-icon>
          </button>

          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <app-icon name="shield-check" customClass="w-6 h-6"></app-icon>
            </div>
            <div>
              <h3 class="text-xl font-bold text-gray-900">Official Business License & Verification</h3>
              <p class="text-xs text-gray-500">Addis Ababa City Administration Trade Bureau</p>
            </div>
          </div>

          <div class="bg-orange-50/50 rounded-2xl p-4 border border-orange-100 mb-6 text-sm text-gray-700 space-y-2">
            <div class="flex justify-between border-b border-orange-200/40 pb-1.5">
              <span class="font-semibold text-gray-900">Company Name:</span>
              <span>Zener Home P.L.C. (Fikadu Worku Belete)</span>
            </div>
            <div class="flex justify-between border-b border-orange-200/40 pb-1.5">
              <span class="font-semibold text-gray-900">Tax Identification (TIN):</span>
              <span class="font-mono text-orange-600 font-bold">0058592635</span>
            </div>
            <div class="flex justify-between border-b border-orange-200/40 pb-1.5">
              <span class="font-semibold text-gray-900">Field of Business:</span>
              <span>Construction Completing & Finishing Contract</span>
            </div>
            <div class="flex justify-between">
              <span class="font-semibold text-gray-900">Registered Office:</span>
              <span>Nifas Silk Lafto / Bole Subcity, Addis Ababa</span>
            </div>
          </div>

          <div class="rounded-xl overflow-hidden border border-gray-200 shadow-md">
            <img 
              src="/images/pages/page-16.jpg" 
              alt="Zener Home Official Addis Ababa Trade Bureau License Certificate" 
              class="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    }
  `
})
export class LicenseModalComponent {
  private modalService = inject(ModalService);
  readonly isOpen = this.modalService.isLicenseOpen;

  close(): void {
    this.modalService.closeLicenseModal();
  }
}

