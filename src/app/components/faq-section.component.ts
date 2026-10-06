import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    .faq-section {
      background: #0d0d0d;
      padding: 6rem 2rem;
      color: #F7F5F0;
    }
    .faq-item {
      border-bottom: 1px solid rgba(255,255,255,0.14);
      padding: 2rem 0;
      cursor: pointer;
      transition: border-color 0.3s ease;
    }
    .faq-item:hover {
      border-color: rgba(255, 107, 0, 0.5);
    }
    .faq-question {
      font-family: 'Playfair Display', serif;
      font-size: 1.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: color 0.3s ease;
    }
    .faq-item:hover .faq-question {
      color: #FF6B00;
    }
    .faq-answer {
      font-family: 'Inter', sans-serif;
      color: #999;
      margin-top: 1.5rem;
      line-height: 1.7;
      font-size: 1.05rem;
      display: none;
      max-width: 800px;
    }
    .faq-item.active .faq-answer {
      display: block;
      animation: fadeIn 0.4s ease-out;
    }
    .faq-item.active .icon {
      transform: rotate(45deg);
      color: #FF6B00;
    }
    .icon {
      transition: all 0.3s ease;
      font-size: 1.8rem;
      font-weight: 300;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `],
  template: ``
})
export class FaqSectionComponent {
  activeIndex = signal<number | null>(null);

  toggle(index: number) {
    this.activeIndex.set(this.activeIndex() === index ? null : index);
  }
}
