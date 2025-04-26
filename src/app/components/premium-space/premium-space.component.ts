import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-premium-space',
  templateUrl: './premium-space.component.html',
  styleUrls: ['./premium-space.component.scss']
})
export class PremiumSpaceComponent implements AfterViewInit {
  currentSlide: number = 0;
  slides: HTMLElement[] = [];

  ngAfterViewInit() {
    // Pegue todos os slides (divs com a classe 'image-slide') após a visualização estar pronta
    this.slides = Array.from(document.querySelectorAll('.image-slide')) as HTMLElement[];

    // Comece a transição automática
    this.startSlideshow();
  }

  startSlideshow() {
    setInterval(() => {
      this.changeSlide();
    }, 5000); // Troca de slide a cada 5 segundos
  }

  changeSlide() {
    // Torna o slide atual invisível
    this.slides[this.currentSlide].style.opacity = '0';

    // Atualiza o índice para o próximo slide
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;

    // Torna o próximo slide visível
    this.slides[this.currentSlide].style.opacity = '1';
  }
}