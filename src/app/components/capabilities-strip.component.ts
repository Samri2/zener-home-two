import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-capabilities-strip',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .strip-container {
      background: #FF6B00;
      color: #FFF;
      padding: 1.5rem 0;
      overflow: hidden;
      white-space: nowrap;
      display: flex;
      align-items: center;
    }
    .scroller {
      display: inline-block;
      animation: scroll 20s linear infinite;
      will-change: transform;
    }
    .item {
      display: inline-block;
      font-size: 1.5rem;
      font-family: 'Playfair Display', serif;
      margin-right: 3rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .separator {
      display: inline-block;
      margin-right: 3rem;
      font-size: 1.5rem;
      opacity: 0.5;
    }
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  `],
  template: `
    <div class="strip-container">
      <div class="scroller">
        <span class="item">Custom Joinery</span>
        <span class="separator">&bull;</span>
        <span class="item">Architectural Millwork</span>
        <span class="separator">&bull;</span>
        <span class="item">Bespoke Furniture</span>
        <span class="separator">&bull;</span>
        <span class="item">Turnkey Interiors</span>
        <span class="separator">&bull;</span>
        <span class="item">Acoustic Paneling</span>
        <span class="separator">&bull;</span>
        <!-- Duplicate for seamless loop -->
        <span class="item">Custom Joinery</span>
        <span class="separator">&bull;</span>
        <span class="item">Architectural Millwork</span>
        <span class="separator">&bull;</span>
        <span class="item">Bespoke Furniture</span>
        <span class="separator">&bull;</span>
        <span class="item">Turnkey Interiors</span>
        <span class="separator">&bull;</span>
        <span class="item">Acoustic Paneling</span>
        <span class="separator">&bull;</span>
      </div>
    </div>
  `
})
export class CapabilitiesStripComponent {}
