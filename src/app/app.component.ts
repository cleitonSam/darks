import { Component } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { HighlightsComponent } from './components/highlights/highlights.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { PremiumSpaceComponent } from './components/premium-space/premium-space.component';
import { SlideshowService } from './service/slideshow.service';
import { SupplementComponent } from './components/supplement/supplement.component';
import { ClothingComponent } from './components/clothing/clothing.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, HeroComponent, HighlightsComponent, PremiumSpaceComponent, NewsletterComponent, FooterComponent, SupplementComponent, ClothingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [SlideshowService],
})
export class AppComponent {
  title = 'darks-gym';
}
