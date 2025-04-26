import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlideshowService {
  private slides = [
    { 
      image: 'https://i.postimg.cc/tTbhRhFH/Whats-App-Image-2025-03-06-at-15-39-12-1.jpg',
      title: 'ELITE PERFORMANCE',
      description: 'Prepare-se para a inauguração da academia mais exclusiva da cidade. <span class="highlight">Mais de 2.000m²</span> de área premium dedicados ao seu alto desempenho.'
    },
    { 
      image: 'https://i.postimg.cc/1tKD8fKV/Whats-App-Image-2025-03-06-at-15-39-12-2.jpg',
      title: 'TREINAMENTO PERSONALIZADO',
      description: 'Métodos exclusivos adaptados às suas necessidades específicas para resultados extraordinários.'
    },
    { 
      image: 'https://i.postimg.cc/kM1tLrYC/Whats-App-Image-2025-03-06-at-15-39-13-2.jpg',
      title: 'COMUNIDADE ELITE',
      description: 'Junte-se a um grupo seleto de pessoas comprometidas com a excelência física e mental.'
    }
  ];

  private currentIndex = 0;
  private intervalSubscription: Subscription | null = null;
  public currentSlide = new BehaviorSubject<any>(this.slides[0]);

  startSlideshow() {
    this.stopSlideshow();
    
    // Primeira transição após 5 segundos
    setTimeout(() => {
      this.nextSlide();
    }, 5000);
    
    // Configura o intervalo para as próximas transições
    this.intervalSubscription = interval(8000).subscribe(() => {
      this.nextSlide();
    });
  }

  stopSlideshow() {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription = null;
    }
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.currentSlide.next(this.slides[this.currentIndex]);
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.currentSlide.next(this.slides[this.currentIndex]);
  }
}