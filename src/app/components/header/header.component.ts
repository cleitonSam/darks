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
  isMobileMenuOpen = false;

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
  this.title.setTitle('Dark\'s Gym Santo André - Academia Premium com Estrutura Completa');
  this.meta.addTags([
    { name: 'description', content: 'Dark\'s Gym em Santo André — academia premium com mais de 2400m², equipamentos de última geração e planos acessíveis. Venha conhecer!' },
    { name: 'keywords', content: 'dark gym, darks gym, darksgym, dark gym santo andré, academia em santo andré, musculação, fitness, treino, premium' },
    { property: 'og:title', content: 'Dark\'s Gym Santo André - Academia Premium' },
    { property: 'og:description', content: 'A academia mais completa de Santo André. Estrutura premium, equipamentos top e ambiente motivador. Agende sua visita!' },
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
      description: 'Conheça a história e a estrutura premium da Dark\'s Gym, a academia mais completa de Santo André.'
    },
    '/space': {
      title: 'Espaço Premium - Dark\'s Gym Santo André',
      description: 'Mais de 2400m² de área premium com os melhores equipamentos para seu treino.'
    },
    '/contact': {
      title: 'Contato - Dark\'s Gym Santo André',
      description: 'Entre em contato com a Dark\'s Gym e venha fazer parte da melhor academia de Santo André.'
    },
    '/dark-gym-santo-andre': {
      title: 'Dark Gym Santo André - A Melhor Academia da Região',
      description: 'Encontre a Dark Gym em Santo André. Estrutura premium, aulas diferenciadas e plano acessível.'
    },
    '/galeria': {
      title: 'Imagens da Academia Dark\'s Gym em Santo André',
      description: 'Veja fotos da estrutura premium da Dark\'s Gym - treine em alto nível em Santo André!'
    },
    '/faq': {
      title: 'Perguntas Frequentes - Dark\'s Gym Santo André',
      description: 'Tire suas dúvidas sobre localização, planos e diferenciais da Dark\'s Gym, a academia premium de Santo André.'
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
        this.router.navigate([], { fragment: section });
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.updateMetaForSection(section);
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
      description: 'Conheça nossa história, estrutura e diferenciais como a melhor academia de Santo André.'
    },
    'space': {
      title: 'Nosso Espaço Premium - Dark\'s Gym',
      description: 'Fotos e detalhes da nossa estrutura de 2400m² com equipamentos de última geração.'
    },
    'contact': {
      title: 'Fale Conosco - Dark\'s Gym Santo André',
      description: 'Endereço, horários e formas de contato da Dark\'s Gym em Santo André.'
    },
    'faq': {
      title: 'FAQ - Dúvidas sobre a Dark\'s Gym Santo André',
      description: 'Perguntas frequentes sobre planos, funcionamento, localização e estrutura da academia.'
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
 

  // Novo método para abrir/fechar o menu mobile
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : 'auto';
    }
  }

  // Novo método para rolar e fechar o menu mobile
  scrollToAndClose(section: string) {
    this.scrollTo(section);
    this.toggleMobileMenu();
  }

 
}