import { Component, OnInit, OnDestroy } from '@angular/core';
import { SlideshowService } from '../../service/slideshow.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [
    trigger('slideFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(1.1)' }), // Imagem começa maior
        animate('1000ms ease-in', style({ opacity: 1, transform: 'scale(1)' })) // Efeito de zoom
      ]),
      transition(':leave', [
        animate('1000ms ease-out', style({ opacity: 0, transform: 'scale(0.95)' })) // Imagem diminui na saída
      ])
    ])
  ]
})
export class HeroComponent implements OnInit, OnDestroy {
  currentSlide: any;
  nextSlide: any;
  isTransitioning = false;

  constructor(private slideshowService: SlideshowService) {}

  ngOnInit() {
    this.slideshowService.startSlideshow();
    
    this.slideshowService.currentSlide.subscribe(slide => {
      if (!this.currentSlide) {
        this.currentSlide = slide;
      } else {
        this.nextSlide = slide;
        this.isTransitioning = true;
        setTimeout(() => {
          this.currentSlide = slide;
          this.isTransitioning = false;
        }, 1000); // Tempo igual à duração da animação
      }
    });
  }
  

  ngOnDestroy() {
    this.slideshowService.stopSlideshow();
  }

  scrollTo(section: string) {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}