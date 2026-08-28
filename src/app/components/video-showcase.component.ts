import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../shared/components/icon.component';
import { VideosService } from '../core/services/videos.service';
import { VideoItem } from '../core/data/videos';

@Component({
  selector: 'app-video-showcase',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <section id="videos" class="py-24 relative overflow-hidden bg-[#151515] text-white">
      <!-- Glow -->
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <app-icon name="film" customClass="w-3.5 h-3.5"></app-icon>
              <span>On-Site Video Walkthroughs</span>
            </div>
            <h2 class="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Featured Project
              <span class="text-orange-500 underline decoration-orange-400/50 underline-offset-8">
                Video Reels
              </span>
            </h2>
          </div>
          <p class="text-white/70 text-sm sm:text-base max-w-md">
            Watch real construction progress, gypsum false ceiling drop details, custom TV slat walls, and turnkey handovers directly on video.
          </p>
        </div>

        <!-- Video Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          @for (video of videos; track video.id) {
            <div
              (click)="activeVideo.set(video)"
              class="bg-[#222222] rounded-3xl overflow-hidden border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <!-- Thumbnail Container -->
              <div class="relative h-64 w-full overflow-hidden bg-black">
                <img
                  [src]="video.thumbnail"
                  [alt]="video.title"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

                <!-- Top Badges -->
                <div class="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span class="bg-black/70 backdrop-blur-md text-orange-400 font-bold text-[11px] px-3 py-1 rounded-full border border-white/10">
                    {{ video.category }}
                  </span>
                  <span class="bg-black/70 backdrop-blur-md text-white font-medium text-[11px] px-2.5 py-1 rounded-full">
                    {{ video.duration }}
                  </span>
                </div>

                <!-- Central Play Button -->
                <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div class="w-14 h-14 rounded-full bg-orange-500/90 text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-orange-500 transition-all duration-300">
                    <app-icon name="play" customClass="w-6 h-6 fill-white ml-1"></app-icon>
                  </div>
                </div>

                <!-- Location -->
                <div class="absolute bottom-4 left-4 right-4 text-xs text-white/80 flex items-center gap-1.5">
                  <app-icon name="map-pin" customClass="w-3.5 h-3.5 text-orange-400"></app-icon>
                  <span>{{ video.location }}</span>
                </div>
              </div>

              <!-- Card Footer -->
              <div class="p-6">
                <h3 class="text-base font-bold text-white group-hover:text-orange-400 transition-colors mb-2 leading-snug">
                  {{ video.title }}
                </h3>
                @if (video.titleAm) {
                  <p class="text-xs text-orange-400 font-medium mb-3">{{ video.titleAm }}</p>
                }
                <p class="text-xs text-white/60 line-clamp-2 leading-relaxed">
                  {{ video.description }}
                </p>

                <div class="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <span class="text-xs text-orange-400 font-semibold flex items-center gap-1">
                    <app-icon name="play" customClass="w-3.5 h-3.5 fill-orange-400"></app-icon> Watch Walkthrough
                  </span>
                  <span class="text-[11px] text-white/40">Zener Media</span>
                </div>
              </div>

            </div>
          }
        </div>

        <!-- Bottom Callout -->
        <div class="mt-16 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0">
              <app-icon name="sparkles" customClass="w-6 h-6"></app-icon>
            </div>
            <div>
              <h4 class="text-base font-bold text-white">Want to see more live progress videos?</h4>
              <p class="text-xs text-white/60 mt-0.5">Follow our daily project reels and finishings on social channels.</p>
            </div>
          </div>
          <div class="flex gap-3">
            <a
              href="https://web.facebook.com/zenerfinishing"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs px-6 py-3 rounded-full shadow-lg transition-all"
            >
              Watch on Facebook
            </a>
            <a
              href="https://t.me/zenerhome"
              target="_blank"
              rel="noopener noreferrer"
              class="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-5 py-3 rounded-full transition-all"
            >
              Telegram Channel
            </a>
          </div>
        </div>

      </div>

      <!-- Video Modal Player -->
      @if (activeVideo(); as vid) {
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div class="bg-[#1C1C1C] rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative border border-white/15">
            <button
              (click)="activeVideo.set(null)"
              class="absolute top-5 right-5 p-2 text-white/60 hover:text-white bg-white/10 rounded-full transition-colors z-20"
              aria-label="Close video player"
            >
              <app-icon name="x" customClass="w-5 h-5"></app-icon>
            </button>

            <div class="mb-4 pr-10">
              <h3 class="text-xl font-bold text-white leading-snug">{{ vid.title }}</h3>
              @if (vid.titleAm) {
                <p class="text-xs text-orange-400 mt-0.5">{{ vid.titleAm }}</p>
              }
            </div>

            <!-- Video Player Container -->
            <div class="relative w-full rounded-2xl overflow-hidden bg-black mb-4 aspect-video flex items-center justify-center">
              <video
                [src]="vid.videoSrc"
                controls
                autoplay
                playsinline
                class="w-full h-full object-contain"
              ></video>
            </div>

            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-white/70">
              <div class="flex items-center gap-2">
                <app-icon name="map-pin" customClass="w-4 h-4 text-orange-500"></app-icon>
                <span>{{ vid.location }}</span>
                <span class="text-white/30">•</span>
                <span>{{ vid.description }}</span>
              </div>
              <a
                [href]="vid.fbVideoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-orange-400 hover:text-orange-300 font-semibold whitespace-nowrap"
              >
                Open Full Reel on Facebook →
              </a>
            </div>

          </div>
        </div>
      }

    </section>
  `
})
export class VideoShowcaseComponent {
  private videosService = inject(VideosService);

  readonly videos = this.videosService.getVideos();
  activeVideo = signal<VideoItem | null>(null);
}
