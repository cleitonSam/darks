import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  imports: [CommonModule, FormsModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss',
  standalone: true
})
export class NewsletterComponent {
  email: string = '';

  onSubmit() {
    alert(`Obrigado por se cadastrar, ${this.email}! Você receberá nossas novidades em breve.`);
    this.email = '';
  }
}
