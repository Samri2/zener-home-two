import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalService } from '../core/services/modal.service';
import { IconComponent } from '../shared/components/icon.component';
import { ProductItem } from '../core/data/products';
import { BentoCollectionItem } from '../core/data/collections';

@Component({
  selector: 'app-product-detail-modal',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    @if (item(); as itm) {
      <div 
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
        (click)="close()"
      >
        <div 
          class="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl overflow-y-auto shadow-2xl border border-orange-100/60"
          (click)="$event.stopPropagation()"
        >
          <!-- Close Button -->
          <button 
            (click)="close()"
            class="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-transform transform hover:scale-110"
            aria-label="Close modal"
          >
            <app-icon name="x" customClass="w-5 h-5"></app-icon>
          </button>

          <!-- Modal Body Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            <!-- Left: Gallery & Main Image (7 cols) -->
            <div class="lg:col-span-7 p-6 sm:p-8 bg-[#FDF6F0] flex flex-col justify-between">
              <!-- Main Active Image -->
              <div class="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-white shadow-md border border-orange-100 flex items-center justify-center">
                <img 
                  [src]="currentImage || itm.image" 
                  [alt]="getItemTitle(itm)" 
                  class="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              <!-- Thumbnail Strip (if multiple photos) -->
              @if (getGallery(itm).length > 1) {
                <div class="flex items-center gap-3 mt-4 overflow-x-auto pb-2">
                  @for (thumb of getGallery(itm); track thumb; let idx = $index) {
                    <button
                      (click)="currentImage = thumb"
                      class="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all"
                      [ngClass]="(currentImage || itm.image) === thumb ? 'border-orange-500 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'"
                    >
                      <img [src]="thumb" [alt]="'Photo ' + (idx + 1)" class="w-full h-full object-cover" />
                    </button>
                  }
                </div>
              }
            </div>

            <!-- Right: Specs & WhatsApp / Contact Actions (5 cols) -->
            <div class="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
              
              <div class="space-y-4">
                <!-- Tag / Category -->
                <div class="flex items-center justify-between">
                  <span class="inline-block px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 text-xs font-bold uppercase tracking-wider">
                    {{ itm.category || 'Finishing & Furniture' }}
                  </span>
                  @if (isProductItem(itm) && asProduct(itm).tag) {
                    <span class="text-xs font-bold text-gray-500">
                      {{ asProduct(itm).tag }}
                    </span>
                  }
                </div>

                <!-- Title -->
                <h3 class="text-2xl font-bold text-gray-900 leading-tight">
                  {{ getItemTitle(itm) }}
                </h3>

                <!-- Description -->
                <p class="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {{ itm.description }}
                </p>

                <!-- Technical Specs Box (if full product) -->
                @if (isProductItem(itm)) {
                  <div class="bg-[#FDF6F0] rounded-2xl p-4 border border-orange-100/80 space-y-2 text-xs text-gray-700">
                    <div class="flex items-start gap-2">
                      <app-icon name="ruler" customClass="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5"></app-icon>
                      <div>
                        <strong>Dimensions:</strong>
                        <p class="text-gray-600 text-[11px]">{{ asProduct(itm).dimensions }}</p>
                      </div>
                    </div>

                    <div class="flex items-start gap-2">
                      <app-icon name="shield" customClass="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5"></app-icon>
                      <div>
                        <strong>Wood & Core:</strong>
                        <p class="text-gray-600 text-[11px]">{{ asProduct(itm).woodType }}</p>
                      </div>
                    </div>

                    <div class="flex items-start gap-2">
                      <app-icon name="sparkles" customClass="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5"></app-icon>
                      <div>
                        <strong>Finish / Sealant:</strong>
                        <p class="text-gray-600 text-[11px]">{{ asProduct(itm).finish }}</p>
                      </div>
                    </div>

                    @if (asProduct(itm).leadTime) {
                      <div class="flex items-start gap-2">
                        <app-icon name="clock" customClass="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5"></app-icon>
                        <div>
                          <strong>Fabrication Lead Time:</strong>
                          <p class="text-gray-600 text-[11px]">{{ asProduct(itm).leadTime }}</p>
                        </div>
                      </div>
                    }
                  </div>
                }

                <!-- Features list -->
                @if (isProductItem(itm) && asProduct(itm).features) {
                  <div class="space-y-1.5 pt-1">
                    @for (feat of asProduct(itm).features; track feat) {
                      <div class="flex items-center gap-2 text-xs text-gray-700">
                        <app-icon name="check-circle" customClass="w-3.5 h-3.5 text-orange-500 flex-shrink-0"></app-icon>
                        <span class="text-[11px]">{{ feat }}</span>
                      </div>
                    }
                  </div>
                }
              </div>

              <!-- Action Buttons -->
              <div class="pt-6 mt-6 border-t border-gray-100 space-y-2.5">
                <!-- WhatsApp Direct Chat Button -->
                <button
                  (click)="handleWhatsAppInquiry(itm)"
                  class="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 rounded-full text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <app-icon name="message-circle" customClass="w-4 h-4"></app-icon>
                  <span>Inquire & Customize on WhatsApp</span>
                </button>

                <div class="flex gap-2">
                  <a
                    routerLink="/contact"
                    (click)="close()"
                    class="flex-1 bg-[#CC4C0F] hover:bg-[#B33E08] text-white font-semibold py-2.5 rounded-full text-xs shadow-md transition-all text-center flex items-center justify-center"
                  >
                    Inquire via Contact
                  </a>
                  <a
                    href="tel:+251910900931"
                    class="flex items-center justify-center gap-1.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-xs font-semibold transition-all"
                  >
                    <app-icon name="phone" customClass="w-3.5 h-3.5 text-orange-500"></app-icon>
                    <span>Call</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    }
  `
})
export class ProductDetailModalComponent {
  private modalService = inject(ModalService);

  readonly item = this.modalService.selectedProduct;
  currentImage = '';

  close(): void {
    this.currentImage = '';
    this.modalService.closeProductDetail();
  }

  isProductItem(itm: ProductItem | BentoCollectionItem): boolean {
    return 'gallery' in itm || 'woodType' in itm;
  }

  asProduct(itm: ProductItem | BentoCollectionItem): ProductItem {
    return itm as ProductItem;
  }

  getItemTitle(itm: ProductItem | BentoCollectionItem): string {
    if ('title' in itm && itm.title) return itm.title;
    if ('name' in itm && itm.name) return itm.name;
    return 'Furniture Masterpiece';
  }

  getGallery(itm: ProductItem | BentoCollectionItem): string[] {
    if (this.isProductItem(itm) && (itm as ProductItem).gallery) {
      return (itm as ProductItem).gallery;
    }
    return [itm.image];
  }

  handleWhatsAppInquiry(itm: ProductItem | BentoCollectionItem): void {
    const title = this.getItemTitle(itm);
    const message = `Hello Zener Home! I am interested in ordering/customizing: *${title}* from your website. Could you provide current pricing and showroom availability?`;
    window.open(`https://wa.me/251910900931?text=${encodeURIComponent(message)}`, '_blank');
  }
}
