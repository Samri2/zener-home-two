import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-grid-home',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .project-grid-section {
      background: #0d0d0d;
      padding: 6rem 2rem;
      color: #F7F5F0;
    }
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 30px;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .project-card {
      position: relative;
      border-radius: 20px;
      overflow: hidden;
      aspect-ratio: 4/3;
      cursor: pointer;
    }
    .project-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.45s ease-in-out;
    }
    .project-card:hover img {
      transform: scale(1.04);
    }
    
    /* Overlay */
    .overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 80%);
      transition: background 0.45s ease-in-out;
    }
    .project-card:hover .overlay {
      background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%);
    }
    
    /* Content */
    .content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
    
    .project-title {
      font-family: 'Playfair Display', serif;
      font-size: 2rem;
      margin-bottom: 0.25rem;
    }
    .project-subtitle {
      font-family: 'Inter', sans-serif;
      font-size: 0.8rem;
      color: rgba(247, 245, 240, 0.7);
    }
    
    /* Stats & CTA Container (Hidden by default, reveals on hover) */
    .hover-reveal {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      height: 0;
      opacity: 0;
      overflow: hidden;
      transition: all 0.45s ease-in-out;
    }
    .project-card:hover .hover-reveal {
      height: 90px;
      opacity: 1;
      margin-top: 1rem;
    }
    
    .view-pill {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      padding: 0.5rem 1.25rem;
      background: rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 99px;
      font-size: 0.85rem;
      font-weight: 600;
      color: #fff;
      transition: all 0.3s ease;
    }
    .view-pill:hover {
      background: #FF6B00;
      border-color: #FF6B00;
    }
    
    .stats {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }
    .stat-chip {
      font-family: 'Inter', sans-serif;
      font-size: 0.8rem;
      color: rgba(247, 245, 240, 0.8);
      display: flex;
      align-items: center;
      gap: 0.35rem;
    }
    .stat-chip::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 4px;
      background: #FF6B00;
      border-radius: 50%;
    }

    /* Carousel Arrows (Hover reveal) */
    .arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(0,0,0,0.4);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: all 0.3s ease;
      z-index: 10;
    }
    .arrow:hover {
      background: #FF6B00;
      border-color: #FF6B00;
    }
    .arrow svg { width: 18px; height: 18px; stroke: #fff; fill: none; stroke-width: 2; }
    
    .arrow.left { left: 1rem; }
    .arrow.right { right: 1rem; }
    
    .project-card:hover .arrow {
      opacity: 1;
    }
  `],
  template: `
    <section class="project-grid-section">
      <div class="max-w-7xl mx-auto mb-12 flex justify-between items-end">
        <div>
          <h2 class="text-4xl sm:text-5xl font-serif mb-2">Projects</h2>
          <p class="text-gray-400 text-lg">Explore our finest woodworking and interior finishing.</p>
        </div>
        <!-- Same Filter tabs from Phase 2 could be here, omitted for brevity -->
      </div>
      
      <div class="grid-container">
        
        <!-- Card 1 -->
        <div class="project-card">
          <img src="/images/projects/featured-sites/photo-01.jpg" alt="Albatross">
          <div class="overlay"></div>
          
          <div class="arrow left"><svg viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg></div>
          <div class="arrow right"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></div>
          
          <div class="content">
            <div class="project-title">Albatross</div>
            <div class="project-subtitle">Жилой дом из клееного бруса (Residential)</div>
            <div class="project-subtitle">Residential — Solid Wood Finish</div>
            
            <div class="hover-reveal">
              <div class="view-pill">View Details</div>
              <div class="stats">
                <div class="stat-chip">Floors: 2</div>
                <div class="stat-chip">Area: 584 m²</div>
                <div class="stat-chip">Rooms: 8</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="project-card">
          <img src="/images/projects/featured-sites/photo-03.jpg" alt="Lyubinka">
          <div class="overlay"></div>
          
          <div class="arrow left"><svg viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg></div>
          <div class="arrow right"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></div>
          
          <div class="content">
            <div class="project-title">Lyubinka</div>
            <div class="project-subtitle">Жилой дом из клееного бруса (Residential)</div>
            <div class="project-subtitle">Residential — Solid Wood Finish</div>
            
            <div class="hover-reveal">
              <div class="view-pill">View Details</div>
              <div class="stats">
                <div class="stat-chip">Floors: 3</div>
                <div class="stat-chip">Area: 420 m²</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 3 -->
        <div class="project-card">
          <img src="/images/projects/featured-sites/photo-05.jpg" alt="Saint Tropez">
          <div class="overlay"></div>
          
          <div class="arrow left"><svg viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg></div>
          <div class="arrow right"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></div>
          
          <div class="content">
            <div class="project-title">Saint Tropez</div>
            <div class="project-subtitle">Жилой дом из клееного бруса (Residential)</div>
            <div class="project-subtitle">Residential — Solid Wood Finish</div>
            
            <div class="hover-reveal">
              <div class="view-pill">View Details</div>
              <div class="stats">
                <div class="stat-chip">Floors: 1</div>
                <div class="stat-chip">Area: 310 m²</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 4 -->
        <div class="project-card">
          <img src="/images/projects/featured-sites/photo-01.jpg" alt="San City">
          <div class="overlay"></div>
          
          <div class="arrow left"><svg viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg></div>
          <div class="arrow right"><svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg></div>
          
          <div class="content">
            <div class="project-title">San City</div>
            <div class="project-subtitle">Жилой дом из клееного бруса (Residential)</div>
            <div class="project-subtitle">Residential — Solid Wood Finish</div>
            
            <div class="hover-reveal">
              <div class="view-pill">View Details</div>
              <div class="stats">
                <div class="stat-chip">Floors: 2</div>
                <div class="stat-chip">Area: 650 m²</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `
})
export class ProjectGridHomeComponent {}
