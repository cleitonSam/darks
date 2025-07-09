import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  currentRoute = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private meta: Meta,
    private title: Title,
    private router: Router
  ) {}

  ngOnInit() {
    this.setInitialMetaTags();
    this.trackRouteChanges();
  }

  private setInitialMetaTags() {
    this.title.setTitle('Dark\'s Gym - Academia Premium em Santo André');
    this.meta.addTags([
      { name: 'description', content: 'Academia Dark\'s Gym em Santo André - Treinamento de alto nível com equipamentos premium e espaços exclusivos. Venha conhecer!' },
      { name: 'keywords', content: 'academia, santo andré, musculação, fitness, treino, dark\'s gym' },
      { property: 'og:title', content: 'Dark\'s Gym - Academia Premium em Santo André' },
      { property: 'og:description', content: 'Academia premium com os melhores equipamentos e estrutura de Santo André' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://www.darksgym.com.br' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }

  private trackRouteChanges() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
        this.updateMetaForCurrentRoute();
      });
  }

  private updateMetaForCurrentRoute() {
    const routeMeta = this.getRouteMeta(this.currentRoute);
    if (routeMeta) {
      this.title.setTitle(routeMeta.title);
      this.meta.updateTag({ name: 'description', content: routeMeta.description });
      this.meta.updateTag({ property: 'og:title', content: routeMeta.title });
      this.meta.updateTag({ property: 'og:description', content: routeMeta.description });
      this.meta.updateTag({ property: 'og:url', content: `https://www.darksgym.com.br${this.currentRoute}` });
    }
  }

  private getRouteMeta(route: string): { title: string; description: string } | null {
    const metaMap: { [key: string]: { title: string; description: string } } = {
      '/about': {
        title: 'Sobre a Dark\'s Gym - Nossa Estrutura e História',
        description: 'Conheça a história e a estrutura premium da Dark\'s Gym, a academia mais completa de Santo André'
      },
      '/space': {
        title: 'Espaço Premium - Dark\'s Gym Santo André',
        description: 'Mais de 2400m² de área premium com os melhores equipamentos para seu treino'
      },
      '/contact': {
        title: 'Contato - Dark\'s Gym Santo André',
        description: 'Entre em contato com a Dark\'s Gym e venha fazer parte da melhor academia de Santo André'
      }
    };

    return metaMap[route] || null;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.scrollY > 100;
    }
  }

  scrollTo(section: string) {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(section);
      if (element) {
        // Atualiza a URL sem recarregar a página
        this.router.navigate([], { fragment: section });
        
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Atualiza meta tags para a seção
        this.updateMetaForSection(section);

        // Atualiza classe active dos links
        this.updateActiveLink(section);
      }
    }
  }

  private updateMetaForSection(section: string) {
    const sectionMeta = this.getSectionMeta(section);
    if (sectionMeta) {
      this.title.setTitle(sectionMeta.title);
      this.meta.updateTag({ name: 'description', content: sectionMeta.description });
    }
  }

  private getSectionMeta(section: string): { title: string; description: string } | null {
    const metaMap: { [key: string]: { title: string; description: string } } = {
      'about': {
        title: 'Sobre Nós - Dark\'s Gym Santo André',
        description: 'Conheça nossa história, estrutura e diferenciais como a melhor academia de Santo André'
      },
      'space': {
        title: 'Nosso Espaço Premium - Dark\'s Gym',
        description: 'Fotos e detalhes da nossa estrutura de 2400m² com equipamentos de última geração'
      },
      'contact': {
        title: 'Fale Conosco - Dark\'s Gym Santo André',
        description: 'Endereço, horários e formas de contato da Dark\'s Gym em Santo André'
      }
    };

    return metaMap[section] || null;
  }

  private updateActiveLink(section: string) {
    const links = document.querySelectorAll('.menu-item');
    links.forEach(link => link.classList.remove('active'));
    
    const activeLink = document.querySelector(`a[href='#${section}']`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
}