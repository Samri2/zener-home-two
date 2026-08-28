import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly isDark = signal<boolean>(true);

  constructor() {
    const saved = localStorage.getItem('zener_theme');
    const initialDark = saved ? saved === 'dark' : true; // default to dark theme
    this.isDark.set(initialDark);

    effect(() => {
      const dark = this.isDark();
      if (dark) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
        localStorage.setItem('zener_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
        localStorage.setItem('zener_theme', 'light');
      }
    });
  }

  toggleTheme(): void {
    this.isDark.update(prev => !prev);
  }
}
