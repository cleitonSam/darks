import { Component, OnInit, OnDestroy } from '@angular/core';
import { SlideshowService } from '../../service/slideshow.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { Meta, Title, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  animations: [
    trigger('slideFade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(1.1)' }),
        animate('1000ms ease-in', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('1000ms ease-out', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ])
  ]
})
export class HeroComponent implements OnInit, OnDestroy {
  currentSlide: any;
  nextSlide: any;
  isTransitioning = false;

  constructor(
    private slideshowService: SlideshowService,
    private meta: Meta,
    private title: Title,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.setInitialMetaTags();
    this.setStructuredData();
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
          this.updateMetaForCurrentSlide(slide);
        }, 1000);
      }
    });
  }

  private setInitialMetaTags() {
    this.title.setTitle('Dark\'s Gym Santo André - Academia Premium com Estrutura Completa');
    this.meta.addTags([
      { name: 'description', content: 'Academia Dark\'s Gym em Santo André com estrutura premium, mais de 2400m², treinos personalizados e equipamentos de última geração.' },
      { name: 'keywords', content: 'dark gym, darks gym, darksgym, academia santo andré, musculação, fitness, treino, premium, dark gym santo andré' },
      { property: 'og:title', content: 'Dark\'s Gym - A Melhor Academia de Santo André' },
      { property: 'og:description', content: 'Academia premium com a maior estrutura da cidade. Equipamentos modernos, treinos personalizados e ambiente motivador.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://i.postimg.cc/6qgqqXFG/logo-DARK.jpg' },
      { property: 'og:url', content: 'https://www.darksgym.com.br' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }

  private updateMetaForCurrentSlide(slide: any) {
    if (slide?.seoTitle) {
      this.title.setTitle(slide.seoTitle);
      this.meta.updateTag({ property: 'og:title', content: slide.seoTitle });
    }
    if (slide?.seoDescription) {
      this.meta.updateTag({ name: 'description', content: slide.seoDescription });
      this.meta.updateTag({ property: 'og:description', content: slide.seoDescription });
    }
    if (slide?.image) {
      this.meta.updateTag({ property: 'og:image', content: slide.image });
    }
  }

  private setStructuredData() {
    const jsonLD = {
      "@context": "https://schema.org",
      "@type": "HealthClub",
      "name": "Dark's Gym",
      "description": "Academia premium em Santo André com equipamentos de última geração, mais de 2400m² de espaço e planos acessíveis.",
      "image": "https://i.postimg.cc/6qgqqXFG/logo-DARK.jpg",
      "@id": "https://www.darksgym.com.br",
      "url": "https://www.darksgym.com.br",
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
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLD);
    document.head.appendChild(script);
  }

  ngOnDestroy() {
    this.slideshowService.stopSlideshow();
  }

  scrollTo(section: string) {
    this.router.navigate([], { 
      fragment: section,
      queryParamsHandling: 'preserve'
    });
    
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }
}
