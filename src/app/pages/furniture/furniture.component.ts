import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../core/services/translation.service';
import { ProductsService } from '../../core/services/products.service';
import { ModalService } from '../../core/services/modal.service';
import { IconComponent } from '../../shared/components/icon.component';
import { ProductItem } from '../../core/data/products';

@Component({
  selector: 'app-furniture-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IconComponent],
  template: `
    <div class="space-y-0 animate-in fade-in duration-300">
      
      <!-- 1. Page Header Banner -->
      <section class="relative py-20 bg-gradient-to-br from-[#1A1A1A] via-[#2D211C] to-[#1A1A1A] text-white overflow-hidden">
        <div class="absolute top-0 right-0 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div class="max-w-3xl">

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {{ isAm() ? 'ለቤትዎ የሚመጥን የቅንጦት ፈርኒቸር' : 'Solid Hardwood & Tactile Custom Furniture' }}
            </h1>
            
          </div>
        </div>
      </section>

      <!-- 2. Product Filter & Search Bar -->
      <section class="py-8 bg-white/95 backdrop-blur-md border-b border-orange-100 sticky top-[105px] z-30 shadow-sm">
        <div class="max-w-7xl mx-auto px-6 sm:px-8">
          <div class="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            <!-- Search Input with Clear Button -->
            <div class="relative w-full lg:w-96 flex-shrink-0">
              <app-icon name="search" customClass="w-4 h-4 text-orange-500 absolute left-4 top-1/2 -translate-y-1/2"></app-icon>
              <input
                type="text"
                placeholder="Search sofas, dining, beds, TV walls..."
                [(ngModel)]="searchQuery"
                class="w-full pl-11 pr-10 py-2.5 rounded-full bg-[#FDF6F0] border border-orange-200/80 text-xs sm:text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              @if (searchQuery) {
                <button
                  (click)="searchQuery = ''"
                  class="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 bg-orange-100 rounded-full"
                  aria-label="Clear search"
                >
                  <app-icon name="x" customClass="w-3 h-3"></app-icon>
                </button>
              }
            </div>

            <!-- Category Filter Pills -->
            <div class="flex flex-wrap items-center gap-2 w-full lg:w-auto overflow-x-auto pb-1">
              @for (cat of categories(); track cat.id) {
                <button
                  (click)="selectedCategory.set(cat.id)"
                  class="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap"
                  [ngClass]="selectedCategory() === cat.id ? 'bg-[#CC4C0F] text-white shadow-md shadow-orange-500/25 ring-1 ring-orange-500' : 'bg-[#FDF6F0] text-gray-700 hover:bg-orange-100/60 border border-orange-200/60'"
                >
                  {{ cat.label }}
                </button>
              }
            </div>

          </div>
        </div>
      </section>

      <!-- 3. Furniture Catalog Grid -->
      <section class="py-16 bg-[#FDF6F0]">
        <div class="max-w-7xl mx-auto px-6 sm:px-8">
          
          <div class="flex items-center justify-between mb-8">
            <p class="text-xs sm:text-sm font-semibold text-gray-500">
              Showing <span class="text-orange-600 font-bold">{{ filteredProducts().length }}</span> handcrafted furniture models
            </p>
            @if (selectedCategory() !== 'all' || searchQuery) {
              <button 
                (click)="selectedCategory.set('all'); searchQuery = ''"
                class="text-xs font-bold text-orange-600 hover:underline"
              >
                Clear all filters
              </button>
            }
          </div>

          @if (filteredProducts().length === 0) {
            <div class="text-center py-20 bg-white rounded-3xl border border-orange-100 p-8 shadow-sm">
              <app-icon name="search" customClass="w-10 h-10 text-orange-400 mx-auto mb-3"></app-icon>
              <h4 class="text-lg font-bold text-gray-900 mb-2">No furniture pieces found</h4>
              <p class="text-gray-500 text-xs sm:text-sm mb-6">No pieces match "{{ searchQuery }}". Try adjusting keywords or category filters.</p>
              <button
                (click)="searchQuery = ''; selectedCategory.set('all')"
                class="bg-[#CC4C0F] hover:bg-[#B33E08] text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-md transition-all"
              >
                Show All 20 Furniture Models
              </button>
            </div>
          } @else {
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              @for (product of filteredProducts(); track product.id) {
                <div
                  (click)="selectProduct(product)"
                  class="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-orange-500/15 border border-orange-100/80 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <!-- Image Area with Category & Photo Badges -->
                    <div class="relative h-64 bg-gray-100 overflow-hidden">
                      <img
                        [src]="product.image"
                        [alt]="product.name"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                      @if (product.tag) {
                        <div class="absolute top-4 left-4 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                          {{ product.tag }}
                        </div>
                      }

                      <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                        {{ product.gallery.length }} Photos
                      </div>

                      <div class="absolute bottom-3 left-4 right-4 text-white text-xs font-medium line-clamp-1">
                        {{ product.categoryLabel }}
                      </div>
                    </div>

                    <!-- Content -->
                    <div class="p-6">
                      <h3 class="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors mb-1.5 leading-snug">
                        {{ product.name }}
                      </h3>
                      @if (product.nameAm) {
                        <p class="text-xs text-orange-600 font-medium mb-3">{{ product.nameAm }}</p>
                      }
                      <p class="text-gray-600 text-xs leading-relaxed line-clamp-2 mb-4">
                        {{ product.description }}
                      </p>

                      <div class="bg-[#FDF6F0] rounded-2xl p-3 text-[11px] text-gray-700 space-y-1 mb-4 border border-orange-100">
                        <div><strong>Wood:</strong> {{ getFirstPart(product.woodType, ',') }}</div>
                        <div><strong>Dimensions:</strong> {{ getFirstPart(product.dimensions, '/') }}</div>
                      </div>
                    </div>
                  </div>

                  <!-- Bottom Bar with Inspect / Contact Button -->
                  <div class="p-6 pt-0 flex items-center justify-between border-t border-gray-100">
                    <div>
                      <span class="text-[10px] text-gray-400 block font-medium">Availability</span>
                      <span class="text-xs sm:text-sm font-bold text-gray-900">Custom Atelier</span>
                    </div>
                    <button
                      (click)="$event.stopPropagation(); selectProduct(product)"
                      class="bg-orange-500/10 hover:bg-orange-500 hover:text-white text-orange-600 px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <app-icon name="eye" customClass="w-3.5 h-3.5"></app-icon>
                      <span>Inspect Details</span>
                    </button>
                  </div>
                </div>
              }
            </div>
          }

        </div>
      </section>

      <!-- 4. Bespoke Carpentry & Custom Furniture Banner -->
      <section class="py-16 bg-white border-t border-orange-100">
        <div class="max-w-7xl mx-auto px-6 sm:px-8">
          <div class="bg-gradient-to-r from-[#D6571D] via-[#CC4C0F] to-[#A83705] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
            <div class="max-w-xl space-y-3">
              <span class="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider inline-block">
                Bespoke Carpentry Atelier
              </span>
              <h3 class="text-2xl sm:text-3xl font-bold">
                Need Custom Dimensions or Hotel Bulk Orders?
              </h3>
              <p class="text-white/90 text-sm leading-relaxed">
                We manufacture bespoke furniture directly for hotels, banquet halls, embassies, and private residences with personalized wood finishes, dimensions, and fabric selections.
              </p>
            </div>
            <div class="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                routerLink="/contact"
                class="bg-white text-gray-900 hover:bg-orange-50 px-7 py-3.5 rounded-full font-bold text-xs sm:text-sm shadow-lg transition-all transform hover:scale-105 inline-flex items-center justify-center"
              >
                Contact Design Team
              </a>
              <a
                href="tel:+251910900931"
                class="inline-flex items-center justify-center gap-2 bg-black/20 hover:bg-black/30 text-white px-6 py-3.5 rounded-full font-semibold text-xs sm:text-sm border border-white/30 transition-all"
              >
                <app-icon name="phone" customClass="w-4 h-4"></app-icon>
                <span>+251 910 900 931</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  `
})
export class FurniturePageComponent {
  private readonly translation = inject(TranslationService);
  private readonly productsService = inject(ProductsService);
  private readonly modalService = inject(ModalService);

  private readonly furnitureImages: Partial<Record<ProductItem['category'], string[]>> = {
    dining: [
      '/img/furniture/dinner%20tables/480299973_954933783420278_4059268896424422720_n.jpg',
      '/img/furniture/dinner%20tables/480595732_954933596753630_6132239701192075785_n.jpg',
      '/img/furniture/dinner%20tables/480635686_954933580086965_9126484261443232117_n.jpg',
      '/img/furniture/dinner%20tables/505455407_1037282205185435_2805103354904573869_n.jpg',
      '/img/furniture/dinner%20tables/505467471_1037282201852102_9141265167285217426_n.jpg'
    ],
    bedroom: [
      '/img/furniture/dressing/505097096_1037282208518768_6333783260645026840_n.jpg',
      '/img/furniture/dressing/505498688_1037282045185451_4303005874538586769_n.jpg',
      '/img/furniture/dressing/505646020_1037282188518770_4018877894537956610_n.jpg'
    ],
    kitchen: [
      '/img/furniture/kitchen%20cabinet/487795115_986860200227636_3846467532084719529_n.jpg',
      '/img/furniture/kitchen%20cabinet/505101590_1037282125185443_1365941244302220423_n.jpg',
      '/img/furniture/kitchen%20cabinet/505314473_1037281888518800_7633163975674527449_n.jpg',
      '/img/furniture/kitchen%20cabinet/505443433_1037281885185467_7037443109299227580_n.jpg',
      '/img/furniture/kitchen%20cabinet/505527928_1037282031852119_3621411194560081163_n.jpg'
    ],
    living: [
      '/img/furniture/sofa/480662691_954933886753601_5195555920537725057_n.jpg',
      '/img/furniture/sofa/481775742_961178266129163_6096344717881106754_n.jpg',
      '/img/furniture/sofa/482008493_961178249462498_844907421085063382_n.jpg',
      '/img/furniture/sofa/487786759_986863030227353_3352402255649789315_n.jpg',
      '/img/furniture/sofa/487826473_986859320227724_4411590202118822842_n.jpg'
    ],
    'tv-units': [
      '/img/furniture/tv%20wall/491797351_1000452552201734_5425406021212532_n.jpg',
      '/img/furniture/tv%20wall/491798076_1000452422201747_8881232839329127134_n.jpg',
      '/img/furniture/tv%20wall/491834365_1000452578868398_3018263687028542762_n.jpg',
      '/img/furniture/tv%20wall/505310698_1037281898518799_8829021523765007636_n.jpg'
    ]
  };

  private readonly folderCategoryLabels: Partial<Record<ProductItem['category'], string>> = {
    dining: 'Dinner Tables',
    living: 'Sofa',
    'tv-units': 'TV Wall',
    bedroom: 'Dressing',
    kitchen: 'Kitchen Cabinet'
  };

  readonly isAm = this.translation.isAmharic;
  searchQuery = '';
  readonly selectedCategory = signal<string>('all');

  readonly categories = computed(() => {
    const isAm = this.isAm();
    return [
      { id: 'all', label: isAm ? 'ሁሉም ፈርኒቸሮች (20)' : 'All Furniture (20)' },
      { id: 'dining', label: isAm ? 'የመመገቢያ ጠረጴዛዎች' : 'Dinner Tables' },
      { id: 'living', label: isAm ? 'የሳሎን ሶፋዎች' : 'Sofa' },
      { id: 'tv-units', label: isAm ? 'የቲቪ ግድግዳ እና ካቢኔት' : 'TV Wall' },
      { id: 'bedroom', label: isAm ? 'የመኝታ ክፍል አልጋዎች' : 'Dressing' },
      { id: 'kitchen', label: isAm ? 'የወጥ ቤት ካቢኔቶች' : 'Kitchen Cabinet' },
    ];
  });

  readonly filteredProducts = computed(() => {
    const query = this.searchQuery.toLowerCase().trim();
    const cat = this.selectedCategory();
    const all = this.productsService.getProducts();

    const filtered = all.filter((item) => {
      const matchesSearch = !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.categoryLabel?.toLowerCase().includes(query) ||
        item.woodType?.toLowerCase().includes(query);
      const matchesCategory = cat === 'all' || item.category === cat;
      return matchesSearch && matchesCategory;
    });

    const imageIndexes: Partial<Record<ProductItem['category'], number>> = {};
    return filtered.map((item) => {
      const images = this.furnitureImages[item.category];
      if (!images?.length) return item;

      const index = imageIndexes[item.category] ?? 0;
      imageIndexes[item.category] = index + 1;
      return {
        ...item,
        categoryLabel: this.folderCategoryLabels[item.category] ?? item.categoryLabel,
        image: images[index % images.length],
        gallery: images
      };
    });
  });

  getFirstPart(str: string, delimiter: string): string {
    if (!str) return '';
    return str.split(delimiter)[0].trim();
  }

  selectProduct(product: ProductItem): void {
    this.modalService.openProductDetail(product);
  }
}
