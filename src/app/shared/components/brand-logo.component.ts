import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brand-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center gap-3 group text-left">
      <!-- Left Squircle with Official Logo Picture -->
      <div class="w-11 h-11 rounded-2xl bg-white dark:bg-[#2A2B33] p-1 flex items-center justify-center shadow-md border border-orange-200/60 dark:border-white/10 overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
        <img 
          src="/images/zener-logo.png" 
          alt="Zener Home Logo" 
          class="w-full h-full object-contain"
        />
      </div>

      <!-- Typography Next to Logo: Balanced bold title & clean grey subtitle -->
      <div class="flex flex-col justify-center leading-tight">
        <div class="text-xl font-bold tracking-tight text-[#0D1117] dark:text-white flex items-baseline">
          <span>ZENER</span><span class="text-[#CC4C0F] text-2xl font-black leading-none mx-[1.5px]">.</span><span>HOME</span>
        </div>
        <span class="text-[9px] sm:text-[9.5px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold mt-0.5">
          FINISHING & FURNITURE P.L.C.
        </span>
      </div>
    </div>
  `
})
export class BrandLogoComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
}
