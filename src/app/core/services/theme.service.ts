import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly isDark = signal<boolean>(false);

  constructor() {
    if (typeof window !== 'undefined') {
      // Follow system preference — no manual toggle
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      this.isDark.set(mq.matches);

      // React to system changes at runtime
      mq.addEventListener('change', (e) => {
        this.isDark.set(e.matches);
      });

      effect(() => {
        const dark = this.isDark();
        if (dark) {
          document.documentElement.classList.add('dark');
          document.body.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
          document.body.classList.remove('dark');
        }
      });
    }
  }

  // Keep the method signature for any callers, but it's no-op now
  toggleTheme(): void {}
}
