import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
})
export class HeaderComponent {
  
  isScrolled = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Remover classe active de todos os links
        const links = document.querySelectorAll('.menu-item');
        links.forEach(link => link.classList.remove('active'));

        // Adicionar classe active ao link clicado
        const activeLink = document.querySelector(`a[href='#${section}']`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    }
  }
}
