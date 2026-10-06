import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-split-showcase',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .split-showcase {
      position: relative;
      width: 100%;
      height: 100vh;
      background: #0d0d0d;
      color: #F7F5F0;
      overflow: hidden;
      display: flex;
    }
    .panel {
      flex: 1;
      position: relative;
      height: 100%;
      overflow: hidden;
      transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .left-panel {
      background-image: url('/images/projects/featured-sites/photo-01.jpg');
      background-size: cover;
      background-position: center;
      width: 100%;
    }
    .content-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 5rem;
    }
    .sidebar {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 420px;
      padding: 3rem 2rem;
      background: rgba(13, 13, 13, 0.65);
      backdrop-filter: blur(30px);
      -webkit-backdrop-filter: blur(30px);
      border-left: 1px solid rgba(255, 255, 255, 0.14);
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      overflow-y: auto;
    }
    /* Mobile styles */
    @media (max-width: 1024px) {
      .split-showcase { flex-direction: column; height: auto; }
      .left-panel { height: 60vh; }
      .sidebar { position: relative; width: 100%; border-left: none; padding: 2rem; }
    }
    
    .sidebar-card {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 1rem;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      transition: all 0.4s ease-in-out;
    }
    .sidebar-card:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
    }
    
    .card-img-container {
      position: relative;
      width: 100%;
      height: 180px;
      border-radius: 12px;
      overflow: hidden;
    }
    .card-img-container img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease-in-out;
    }
    .sidebar-card:hover .card-img-container img {
      transform: scale(1.08);
    }
    .img-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0);
      transition: background 0.4s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .sidebar-card:hover .img-overlay {
      background: rgba(0,0,0,0.35);
    }
    
    /* Circular View Button */
    .view-btn {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transform: scale(0.8);
      transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .sidebar-card:hover .view-btn {
      opacity: 1;
      transform: scale(1);
    }
    .view-btn svg {
      width: 20px;
      height: 20px;
      fill: none;
      stroke: #fff;
      stroke-width: 2;
    }

    .card-title {
      font-family: 'Playfair Display', serif;
      font-size: 1.25rem;
      color: #F7F5F0;
    }
    .card-link {
      font-family: 'Inter', sans-serif;
      font-size: 0.85rem;
      color: rgba(247, 245, 240, 0.6);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: color 0.3s ease;
    }
    .sidebar-card:hover .card-link {
      color: #FF6B00;
    }
  `],
  template: `
    <section class="split-showcase">
      <!-- Left Hero Image -->
      <div class="panel left-panel">
        <div class="content-overlay">
          <h2 class="text-4xl sm:text-6xl font-serif mb-4 leading-tight max-w-lg">Mastering Luxury Spaces</h2>
          <p class="text-lg text-gray-300 max-w-md">Bespoke solid-wood treatments and refined architectural finishes.</p>
        </div>
      </div>
      
      <!-- Right Sidebar (Glass) -->
      <div class="sidebar">
        <div class="sidebar-card">
          <div class="card-img-container">
            <img src="/images/projects/featured-sites/photo-05.jpg" alt="Woodland finish">
            <div class="img-overlay">
              <div class="view-btn">
                <svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          </div>
          <div>
            <div class="card-title">Larch Wood Homes</div>
            <div class="card-link">Learn more &rarr;</div>
          </div>
        </div>
        
        <div class="sidebar-card">
          <div class="card-img-container">
            <img src="/images/projects/featured-sites/photo-03.jpg" alt="Glulam">
            <div class="img-overlay">
              <div class="view-btn">
                <svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          </div>
          <div>
            <div class="card-title">Glulam Timber Homes</div>
            <div class="card-link">Learn more &rarr;</div>
          </div>
        </div>

        <div class="sidebar-card">
          <div class="card-img-container">
            <img src="/images/projects/featured-sites/photo-01.jpg" alt="Pine finish">
            <div class="img-overlay">
              <div class="view-btn">
                <svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>
            </div>
          </div>
          <div>
            <div class="card-title">Pine Wood Homes</div>
            <div class="card-link">Learn more &rarr;</div>
          </div>
        </div>
        
      </div>
    </section>
  `
})
export class SplitShowcaseComponent {
}
