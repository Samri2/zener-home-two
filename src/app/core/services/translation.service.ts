import { Injectable, signal, computed } from '@angular/core';

export type Language = 'en' | 'am';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = signal<Language>('en');

  readonly lang = this.currentLang.asReadonly();
  readonly isAmharic = computed(() => this.currentLang() === 'am');

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
  }

  toggleLanguage(): void {
    this.currentLang.update(prev => (prev === 'en' ? 'am' : 'en'));
  }
}

