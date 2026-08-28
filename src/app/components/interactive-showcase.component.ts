import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconComponent } from '../shared/components/icon.component';
import { ProductsService } from '../core/services/products.service';
import { ModalService } from '../core/services/modal.service';
import { ProductItem } from '../core/data/products';

@Component({
  selector: 'app-interactive-showcase',
  standalone: true,
  imports: [CommonModule, RouterModule, IconComponent],
  template: `
    <section id="furniture-shop" class="py-24 relative overflow-hidden bg-white">
      <div class="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            
            <h2 class="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              Custom Furniture &
              <span class="text-orange-500 underline decoration-orange-300 underline-offset-8">
                Cabinetry
              </span>
            </h2>
          </div>
          <p class="text-gray-600 text-sm sm:text-base max-w-md">
            Every piece is tailored to your exact floorplan with solid natural hardwoods, quartz solid surfaces, and German soft-close fittings.
          </p>
        </div>

        <!-- Categories Bar -->
        <div class="flex flex-wrap items-center gap-2.5 mb-12">
          @for (cat of categories; track cat.id) {
            <button
              (click)="selectedCategory.set(cat.id)"
              class="px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200"
              [ngClass]="selectedCategory() === cat.id ? 'bg-[#CC4C0F] text-white shadow-md shadow-orange-500/25' : 'bg-[#FDF6F0] text-gray-700 hover:bg-orange-100 hover:text-orange-600 border border-orange-200/50'"
            >
              {{ cat.label }}
            </button>
          }
        </div>

        <!-- Products Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (product of filteredProducts(); track product.id) {
            <div
              (click)="selectProduct(product)"
              class="bg-[#FDF6F0] rounded-3xl overflow-hidden border border-orange-100/80 shadow-md hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <!-- Product Image -->
                <div class="relative h-64 w-full overflow-hidden bg-white/50">
                  <img
                    [src]="product.image"
                    [alt]="product.name"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <!-- Category Badge -->
                  <div class="absolute top-4 left-4">
                    <span class="bg-white/95 text-gray-900 font-bold text-[11px] px-3 py-1 rounded-full shadow-sm">
                      {{ product.categoryLabel }}
                    </span>
                  </div>

                  <!-- View Details Button on Hover -->
                  <div class="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex justify-center">
                    <span class="bg-orange-500 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
                      <app-icon name="eye" customClass="w-3.5 h-3.5"></app-icon> View Specifications & Gallery
                    </span>
                  </div>
                </div>

                <!-- Details -->
                <div class="p-6">
                  <h3 class="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-1.5 leading-snug">
                    {{ product.name }}
                  </h3>
                  @if (product.nameAm) {
                    <p class="text-xs text-orange-600 font-medium mb-3">{{ product.nameAm }}</p>
                  }
                  <p class="text-xs text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                    {{ product.description }}
                  </p>

                  <div class="space-y-2 text-[11px] text-gray-600 bg-white/80 rounded-2xl p-3.5 border border-orange-100">
                    <div class="flex items-center gap-1.5">
                      <app-icon name="ruler" customClass="w-3.5 h-3.5 text-orange-500 flex-shrink-0"></app-icon>
                      <span class="truncate"><strong>Size:</strong> {{ product.dimensions }}</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <app-icon name="shield" customClass="w-3.5 h-3.5 text-orange-500 flex-shrink-0"></app-icon>
                      <span class="truncate"><strong>Core:</strong> {{ product.woodType }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Bar -->
              <div class="px-6 pb-6 pt-2">
                <div class="flex items-center justify-between gap-3">
                  <div class="text-[11px] text-gray-500 font-medium">
                    Lead time: <strong class="text-gray-800">{{ product.leadTime }}</strong>
                  </div>
                  <button
                    (click)="$event.stopPropagation(); selectProduct(product)"
                    class="bg-[#CC4C0F] text-white hover:bg-[#B33E08] px-4 py-2 rounded-full text-xs font-semibold shadow-md transition-all flex items-center gap-1"
                  >
                    <span>Inspect</span>
                    <app-icon name="arrow-right" customClass="w-3 h-3"></app-icon>
                  </button>
                </div>
              </div>

            </div>
          }
        </div>

        <!-- Custom Order Callout -->
        <div class="mt-16 bg-orange-500/10 border border-orange-500/20 rounded-3xl p-8 text-center max-w-4xl mx-auto">
         
          <h3 class="text-2xl font-bold text-gray-900 mb-2">
            Have a custom blueprint or unique dimensions in mind?
          </h3>
          <p class="text-sm text-gray-600 max-w-xl mx-auto mb-6">
            We manufacture bespoke furniture and cabinetry according to your exact room blueprint, fabric choice, and wood species preference.
          </p>
          <a
            routerLink="/contact"
            class="bg-[#CC4C0F] hover:bg-[#B33E08] text-white px-8 py-3.5 rounded-full text-sm font-semibold shadow-lg shadow-orange-500/30 transition-all inline-flex items-center gap-2"
          >
            <span>Send Custom Woodwork Specs</span>
            <app-icon name="arrow-right" customClass="w-4 h-4"></app-icon>
          </a>
        </div>

      </div>
    </section>
  `
})
export class InteractiveShowcaseComponent {
  private productsService = inject(ProductsService);
  private modalService = inject(ModalService);

  readonly selectedCategory = signal<string>('all');

  readonly categories = [
    { id: 'all', label: 'All Furniture' },
    { id: 'living', label: 'Living Room & Sofas' },
    { id: 'dining', label: 'Dining & Salon Sets' },
    { id: 'kitchen', label: 'Modular Kitchens' },
    { id: 'bedroom', label: 'Wardrobes & Vanities' },
    { id: 'doors', label: 'Modern Wood Doors' },
  ];

  readonly filteredProducts = computed(() => {
    const cat = this.selectedCategory();
    const all = this.productsService.getProducts();
    if (cat === 'all') return all;
    return all.filter(p => p.category === cat);
  });

  selectProduct(product: ProductItem): void {
    this.modalService.openProductDetail(product);
  }
}
