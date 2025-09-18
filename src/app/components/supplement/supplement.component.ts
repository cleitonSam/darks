import { Component } from '@angular/core';

@Component({
  selector: 'app-supplement',
  imports: [],
  templateUrl: './supplement.component.html',
  styleUrl: './supplement.component.scss'
})
export class SupplementComponent {
isModalOpen: boolean = false;
  currentImageSrc: string = '';
  currentImageAlt: string = '';

  openModal(src: string, alt: string): void {
    this.currentImageSrc = src;
    this.currentImageAlt = alt;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden'; // Evita scroll na página quando o modal está aberto
  }

  closeModal(): void {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto'; // Restaura o scroll da página
  }
}

