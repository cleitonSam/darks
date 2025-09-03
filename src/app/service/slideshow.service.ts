import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SlideshowService {
  private slides = [
    { 
      image: 'https://raw.githubusercontent.com/fluxodigitaltech/img-darks/refs/heads/main/%40leafar_photographer-23.jpg',
      title: 'ELITE PERFORMANCE',
      description: 'Prepare-se para a inauguração da academia mais exclusiva da cidade. <span class="highlight">Mais de 2.400m²</span> de área premium dedicados ao seu alto desempenho.'
    },
    { 
      image: 'https://raw.githubusercontent.com/fluxodigitaltech/img-darks/refs/heads/main/%40leafar_photographer-31.jpg',
      title: 'TREINAMENTO PERSONALIZADO',
      description: 'Métodos exclusivos adaptados às suas necessidades específicas para resultados extraordinários.'
    },
    { 
      image: 'https://raw.githubusercontent.com/fluxodigitaltech/img-darks/refs/heads/main/%40leafar_photographer-37.jpg',
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