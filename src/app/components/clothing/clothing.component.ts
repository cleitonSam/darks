import { Component } from '@angular/core';

@Component({
  selector: 'app-clothing',
  imports: [],
  templateUrl: './clothing.component.html',
  styleUrl: './clothing.component.scss'
})
export class ClothingComponent {
// A boolean to track if the modal is currently open. It's false by default.
  isModalOpen = false;

  // Variables to hold the image source and alternative text for the modal.
  currentImageSrc: string = '';
  currentImageAlt: string = '';

  /**
   * Opens the modal and sets the image details.
   * @param imageSrc The URL of the image to display.
   * @param imageAlt The descriptive text for the image.
   */
  openModal(imageSrc: string, imageAlt: string) {
    this.currentImageSrc = imageSrc;
    this.currentImageAlt = imageAlt;
    this.isModalOpen = true;
  }

  /**
   * Closes the modal.
   */
  closeModal() {
    this.isModalOpen = false;
  }
}