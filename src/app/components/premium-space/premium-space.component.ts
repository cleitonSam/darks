import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-premium-space',
  templateUrl: './premium-space.component.html',
  styleUrls: ['./premium-space.component.scss']
})
export class PremiumSpaceComponent implements AfterViewInit, OnDestroy {
  currentSlide: number = 0;
  slides: HTMLElement[] = [];
  slideshowInterval: any;
  structuredData: any;

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router
  ) {
    this.structuredData = {
      "@context": "https://schema.org",
      "@type": "SportsActivityLocation",
      "name": "Dark's Gym Espaço Premium",
      "description": "Área de 2000m² com equipamentos de última geração em Santo André",
      "image": "https://i.postimg.cc/d0px5SMj/Whats-App-Image-2025-03-06-at-15-39-11-2.jpg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Martim Francisco, 786",
        "addressLocality": "Santo André",
        "addressRegion": "SP",
        "postalCode": "09230-700",
        "addressCountry": "BR"
      },
      "openingHours": "Mo-Su 00:00-23:59",
      "url": "https://www.darksgym.com.br/espaco-premium"
    };
  }

  ngAfterViewInit() {
    this.setMetaTags();
    this.initSlideshow();
  }

  ngOnDestroy() {
    this.clearSlideshowInterval();
  }

  private setMetaTags() {
    this.title.setTitle('Espaço Premium - Dark\'s Gym Santo André | 2000m² de Área');
    this.meta.addTags([
      { name: 'description', content: 'Conheça nosso espaço premium de 2000m² em Santo André com equipamentos importados, áreas exclusivas e ambiente climatizado 24 horas.' },
      { name: 'keywords', content: 'academia premium santo andré, espaço fitness, academia 24h, dark\'s gym estrutura' },
      { property: 'og:title', content: 'Espaço Premium Dark\'s Gym - A Melhor Estrutura de Santo André' },
      { property: 'og:description', content: '2000m² de área com os melhores equipamentos para seu treino' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://i.postimg.cc/d0px5SMj/Whats-App-Image-2025-03-06-at-15-39-11-2.jpg' },
      { property: 'og:url', content: this.router.url },
      { name: 'robots', content: 'index, follow' }
    ]);
  }

  private initSlideshow() {
    this.slides = Array.from(document.querySelectorAll('.image-slide')) as HTMLElement[];
    
    // Inicialmente esconde todos os slides exceto o primeiro
    this.slides.forEach((slide, index) => {
      slide.style.opacity = index === 0 ? '1' : '0';
      slide.setAttribute('role', 'img');
      slide.setAttribute('aria-label', this.getSlideDescription(index));
      slide.setAttribute('aria-hidden', index !== 0 ? 'true' : 'false');
    });

    this.startSlideshow();
  }

  private getSlideDescription(index: number): string {
    const descriptions = [
      'Área de musculação com equipamentos modernos',
      'Sala de spinning com bicicletas profissionais',
      'Área de crossfit com equipamentos diversificados',
      'Vista geral da academia mostrando amplitude do espaço',
      'Área de lutas com tatame profissional'
    ];
    return descriptions[index] || 'Imagem do espaço premium da academia';
  }

  startSlideshow() {
    this.clearSlideshowInterval();
    this.slideshowInterval = setInterval(() => {
      this.changeSlide();
    }, 5000);
  }

  clearSlideshowInterval() {
    if (this.slideshowInterval) {
      clearInterval(this.slideshowInterval);
    }
  }

  changeSlide() {
    // Esconde o slide atual
    this.slides[this.currentSlide].style.opacity = '0';
    this.slides[this.currentSlide].setAttribute('aria-hidden', 'true');

    // Atualiza para o próximo slide
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;

    // Mostra o novo slide
    this.slides[this.currentSlide].style.opacity = '1';
    this.slides[this.currentSlide].setAttribute('aria-hidden', 'false');

    // Atualiza meta tags para a imagem atual
    this.updateMetaForCurrentSlide();
  }

  private updateMetaForCurrentSlide() {
    const currentImage = this.slides[this.currentSlide].style.backgroundImage
      .replace('url("', '').replace('")', '');
    
    this.meta.updateTag({ property: 'og:image', content: currentImage });
  }

  // Método para navegação acessível por teclado
  handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.prevSlide();
    } else if (event.key === 'ArrowRight') {
      this.nextSlide();
    } else if (event.key === ' ') {
      this.toggleSlideshow();
    }
  }

  prevSlide() {
    this.clearSlideshowInterval();
    this.slides[this.currentSlide].style.opacity = '0';
    this.slides[this.currentSlide].setAttribute('aria-hidden', 'true');
    
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    
    this.slides[this.currentSlide].style.opacity = '1';
    this.slides[this.currentSlide].setAttribute('aria-hidden', 'false');
    
    this.startSlideshow();
  }

  nextSlide() {
    this.clearSlideshowInterval();
    this.changeSlide();
    this.startSlideshow();
  }

  toggleSlideshow() {
    if (this.slideshowInterval) {
      this.clearSlideshowInterval();
    } else {
      this.startSlideshow();
    }
  }
}