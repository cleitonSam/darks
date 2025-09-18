import { NgFor } from '@angular/common';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-premium-space',
   standalone: true,
  imports: [NgFor],
  templateUrl: './premium-space.component.html',
  styleUrls: ['./premium-space.component.scss']
})
export class PremiumSpaceComponent implements AfterViewInit, OnDestroy {
  // Índice do slide atualmente visível
  currentSlide: number = 0;
  // Variável para controlar o intervalo do slideshow
  slideshowInterval: any;

  // Array de dados com as informações de cada slide
  slidesData = [
    { url: 'https://raw.githubusercontent.com/fluxodigitaltech/img-darks2/refs/heads/main/DSC01457.jpg', description: 'Área de musculação com equipamentos modernos' },
    { url: 'https://raw.githubusercontent.com/fluxodigitaltech/img-darks2/refs/heads/main/DSC01476.jpg', description: 'Sala de spinning com bicicletas profissionais' },
    { url: 'https://raw.githubusercontent.com/fluxodigitaltech/img-darks/refs/heads/main/DSC01472.jpg', description: 'Área de crossfit com equipamentos diversificados' },
    { url: 'https://raw.githubusercontent.com/fluxodigitaltech/img-darks2/refs/heads/main/DSC01486.jpg', description: 'Vista geral da academia mostrando amplitude do espaço' },
    { url: 'https://raw.githubusercontent.com/fluxodigitaltech/img-darks2/refs/heads/main/DSC01494.jpg', description: 'Área de lutas com tatame profissional' },
    { url: 'https://raw.githubusercontent.com/fluxodigitaltech/img-darks2/refs/heads/main/DSC01507.jpg', description: 'Área de lutas com tatame profissional' }
  ];

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router
  ) {}

  /**
   * Ciclo de vida: executado após a inicialização da view.
   * Define meta tags e inicia o slideshow.
   */
  ngAfterViewInit(): void {
    this.setMetaTags();
    this.startSlideshow();
  }

  /**
   * Ciclo de vida: executado antes do componente ser destruído.
   * Limpa o intervalo do slideshow para evitar vazamento de memória.
   */
  ngOnDestroy(): void {
    this.clearSlideshowInterval();
  }

  /**
   * Define as meta tags para a rota, melhorando o SEO.
   */
  private setMetaTags(): void {
    const metaTitle = 'Espaço Premium - Dark\'s Gym Santo André | Academia 2400m²';
    const metaDescription = 'Conheça o espaço premium da Dark\'s Gym em Santo André: 2400m² de equipamentos modernos, áreas climatizadas e estrutura de alto padrão.';
    const metaKeywords = 'academia premium santo andré, dark gym estrutura, espaço fitness, academia com crossfit, darksgym';
    
    this.title.setTitle(metaTitle);
    this.meta.addTags([
      { name: 'description', content: metaDescription },
      { name: 'keywords', content: metaKeywords },
      { property: 'og:title', content: metaTitle },
      { property: 'og:description', content: metaDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: `https://www.darksgym.com.br${this.router.url}` },
      { name: 'robots', content: 'index, follow' }
    ]);
  }

  /**
   * Inicia o slideshow automático com um intervalo de 5 segundos.
   */
  startSlideshow(): void {
    this.clearSlideshowInterval();
    this.slideshowInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slidesData.length;
    }, 5000);
  }

  /**
   * Limpa o intervalo para parar o slideshow.
   */
  clearSlideshowInterval(): void {
    if (this.slideshowInterval) {
      clearInterval(this.slideshowInterval);
    }
  }

  /**
   * Navega para um slide específico ao clicar em um ponto.
   * @param index O índice do slide para o qual navegar.
   */
  goToSlide(index: number): void {
    this.currentSlide = index;
    this.clearSlideshowInterval();
    this.startSlideshow();
  }

  /**
   * Navega para o slide anterior.
   */
  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slidesData.length) % this.slidesData.length;
    this.clearSlideshowInterval();
    this.startSlideshow();
  }

  /**
   * Navega para o próximo slide.
   */
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slidesData.length;
    this.clearSlideshowInterval();
    this.startSlideshow();
  }
}