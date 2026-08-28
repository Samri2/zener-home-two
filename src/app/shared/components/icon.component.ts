import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg
      [attr.class]="customClass"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      [ngSwitch]="name"
    >
      <!-- Armchair -->
      <ng-container *ngSwitchCase="'armchair'">
        <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
        <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z" />
        <path d="M5 18v2" />
        <path d="M19 18v2" />
      </ng-container>

      <!-- Sparkles -->
      <ng-container *ngSwitchCase="'sparkles'">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" />
        <path d="M19 17v4" />
        <path d="M3 5h4" />
        <path d="M17 19h4" />
      </ng-container>

      <!-- ArrowRight -->
      <ng-container *ngSwitchCase="'arrow-right'">
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </ng-container>

      <!-- ArrowUpRight -->
      <ng-container *ngSwitchCase="'arrow-up-right'">
        <path d="M7 7h10v10" />
        <path d="M7 17 17 7" />
      </ng-container>

      <!-- ArrowUp -->
      <ng-container *ngSwitchCase="'arrow-up'">
        <path d="m5 12 7-7 7 7" />
        <path d="M12 19V5" />
      </ng-container>

      <!-- Eye -->
      <ng-container *ngSwitchCase="'eye'">
        <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
        <circle cx="12" cy="12" r="3" />
      </ng-container>

      <!-- Ruler -->
      <ng-container *ngSwitchCase="'ruler'">
        <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.4 2.4 0 0 1 0-3.4l2.6-2.6a2.4 2.4 0 0 1 3.4 0Z" />
        <path d="m14.5 12.5 2-2" />
        <path d="m11.5 9.5 2-2" />
        <path d="m8.5 6.5 2-2" />
        <path d="m17.5 15.5 2-2" />
      </ng-container>

      <!-- Shield / ShieldCheck -->
      <ng-container *ngSwitchCase="'shield'">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      </ng-container>
      <ng-container *ngSwitchCase="'shield-check'">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </ng-container>

      <!-- Clock -->
      <ng-container *ngSwitchCase="'clock'">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </ng-container>

      <!-- MessageSquare / MessageCircle -->
      <ng-container *ngSwitchCase="'message-square'">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </ng-container>
      <ng-container *ngSwitchCase="'message-circle'">
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      </ng-container>

      <!-- Phone -->
      <ng-container *ngSwitchCase="'phone'">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </ng-container>

      <!-- Play -->
      <ng-container *ngSwitchCase="'play'">
        <polygon points="6 3 20 12 6 21 6 3" />
      </ng-container>

      <!-- Search -->
      <ng-container *ngSwitchCase="'search'">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </ng-container>

      <!-- Star -->
      <ng-container *ngSwitchCase="'star'">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </ng-container>

      <!-- Award -->
      <ng-container *ngSwitchCase="'award'">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </ng-container>

      <!-- CheckCircle / CheckCircle2 -->
      <ng-container *ngSwitchCase="'check-circle'">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </ng-container>
      <ng-container *ngSwitchCase="'check-circle-2'">
        <circle cx="12" cy="12" r="10" />
        <path d="m9 12 2 2 4-4" />
      </ng-container>

      <!-- MapPin -->
      <ng-container *ngSwitchCase="'map-pin'">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </ng-container>

      <!-- Globe -->
      <ng-container *ngSwitchCase="'globe'">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" x2="22" y1="12" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </ng-container>

      <!-- Menu -->
      <ng-container *ngSwitchCase="'menu'">
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </ng-container>

      <!-- X -->
      <ng-container *ngSwitchCase="'x'">
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </ng-container>

      <!-- Film -->
      <ng-container *ngSwitchCase="'film'">
        <rect width="20" height="20" x="2" y="2" rx="2.18" ry="2.18" />
        <line x1="7" x2="7" y1="2" y2="22" />
        <line x1="17" x2="17" y1="2" y2="22" />
        <line x1="2" x2="22" y1="12" y2="12" />
        <line x1="2" x2="7" y1="7" y2="7" />
        <line x1="2" x2="7" y1="17" y2="17" />
        <line x1="17" x2="22" y1="17" y2="17" />
        <line x1="17" x2="22" y1="7" y2="7" />
      </ng-container>

      <!-- FileText / FileCheck -->
      <ng-container *ngSwitchCase="'file-text'">
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M10 9H8" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
      </ng-container>

      <!-- HardHat / Hammer -->
      <ng-container *ngSwitchCase="'hammer'">
        <path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9" />
        <path d="M17.64 15 22 10.64" />
        <path d="m20.91 3.26-6.5 6.5" />
      </ng-container>

      <!-- Sun / Light Mode -->
      <ng-container *ngSwitchCase="'sun'">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </ng-container>

      <!-- Moon / Dark Mode -->
      <ng-container *ngSwitchCase="'moon'">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </ng-container>

      <!-- Telegram -->
      <ng-container *ngSwitchCase="'telegram'">
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </ng-container>

      <!-- TikTok -->
      <ng-container *ngSwitchCase="'tiktok'">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </ng-container>

      <!-- Facebook -->
      <ng-container *ngSwitchCase="'facebook'">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </ng-container>

      <!-- Instagram -->
      <ng-container *ngSwitchCase="'instagram'">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </ng-container>

      <!-- YouTube -->
      <ng-container *ngSwitchCase="'youtube'">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <polygon points="10 15 15 12 10 9 10 15" />
      </ng-container>

      <!-- Default (Help-circle) -->
      <ng-container *ngSwitchDefault>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" x2="12.01" y1="17" y2="17" />
      </ng-container>
    </svg>
  `
})
export class IconComponent {
  @Input() name: string = '';
  @Input() customClass: string = 'w-5 h-5';
}
