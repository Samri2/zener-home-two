import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brand-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-3 group text-left">
      <!-- Left Rectangular Container for Logo Picture -->
      <div class="w-12 h-9 sm:w-14 sm:h-10 rounded-lg bg-transparent p-0 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
        <img 
          src="/images/Zener.png" 
          alt="Zener Home Logo" 
          class="w-full h-full object-cover sm:object-contain"
        />
      </div>

      <!-- Typography Next to Logo: Clean white title & grey subtitle -->
      <div class="flex flex-col justify-center leading-tight">
        <div class="text-lg sm:text-xl font-bold tracking-tight text-white flex items-baseline gap-1.5">
          <span>ZENER</span><span>HOME</span>
        </div>
        <span class="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#E56A2E] font-medium font-sans mt-0.5" style="font-family: 'Inter', sans-serif;">
          Finishing & Furniture P.L.C
        </span>
      </div>
    </div>
  `
})
export class BrandLogoComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
}
