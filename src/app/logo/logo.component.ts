import { Component } from '@angular/core';
import { Card, CardService } from '../../services/card.service';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.less',
  standalone: true,
})
export class LogoComponent {
  constructor(private cardService: CardService) {}

  public card!: Card;
  public async getRandomCard() {
    this.cardService.getRandomCard('a').subscribe((card) => {
      this.card = card;
      console.log('carta 2', this.card);
    });
  }
}
