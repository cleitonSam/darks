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

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.setMetaTags();
    this.setStructuredData();
    this.initSlideshow();
  }

  ngOnDestroy() {
    this.clearSlideshowInterval();
  }

  // 🎯 SEO inicial para rota /espaco-premium
  private setMetaTags() {
    this.title.setTitle('Espaço Premium - Dark\'s Gym Santo André | Academia 2400m²');
    this.meta.addTags([
      { name: 'description', content: 'Conheça o espaço premium da Dark\'s Gym em Santo André: 2400m² de equipamentos modernos, áreas climatizadas e estrutura de alto padrão.' },
      { name: 'keywords', content: 'academia premium santo andré, dark gym estrutura, espaço fitness, academia com crossfit, darksgym' },
      { property: 'og:title', content: 'Espaço Premium Dark\'s Gym - Academia em Santo André' },
      { property: 'og:description', content: 'Academia com 2400m², estrutura climatizada e os melhores equipamentos de treino em Santo André.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://i.postimg.cc/d0px5SMj/Whats-App-Image-2025-03-06-at-15-39-11-2.jpg' },
      { property: 'og:url', content: `https://www.darksgym.com.br${this.router.url}` },
      { name: 'robots', content: 'index, follow' }
    ]);
  }

  // 🧠 Structured Data para SEO local e resultados enriquecidos
  private setStructuredData() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HealthClub",
      "name": "Dark's Gym - Espaço Premium",
      "description": "Espaço premium com 2400m² de estrutura completa, climatização 24h, equipamentos de última geração e áreas funcionais.",
      "image": "https://i.postimg.cc/d0px5SMj/Whats-App-Image-2025-03-06-at-15-39-11-2.jpg",
      "@id": "https://www.darksgym.com.br/espaco-premium",
      "url": "https://www.darksgym.com.br/espaco-premium",
      "telephone": "+55-11-99999-9999",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Martim Francisco, 786",
        "addressLocality": "Santo André",
        "addressRegion": "SP",
        "postalCode": "09230-700",
        "addressCountry": "BR"
      },
      "openingHours": "Mo-Su 00:00-23:59"
    });
    document.head.appendChild(script);
  }

  // 🎞️ Inicia o slideshow com acessibilidade
  private initSlideshow() {
    this.slides = Array.from(document.querySelectorAll('.image-slide')) as HTMLElement[];

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

  private updateMetaForCurrentSlide() {
    const currentImage = this.slides[this.currentSlide].style.backgroundImage
      .replace('url("', '').replace('")', '');
    this.meta.updateTag({ property: 'og:image', content: currentImage });
  }

  // 🎮 Controle de slides
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
    this.slides[this.currentSlide].style.opacity = '0';
    this.slides[this.currentSlide].setAttribute('aria-hidden', 'true');

    this.currentSlide = (this.currentSlide + 1) % this.slides.length;

    this.slides[this.currentSlide].style.opacity = '1';
    this.slides[this.currentSlide].setAttribute('aria-hidden', 'false');

    this.updateMetaForCurrentSlide();
  }

  // ⌨️ Navegação por teclado
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

    this.updateMetaForCurrentSlide();
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
