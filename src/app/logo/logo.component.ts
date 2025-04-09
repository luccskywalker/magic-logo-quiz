import { Component, Input } from '@angular/core';
import { Card, CardService } from '../../services/card.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-logo',
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.less',
  standalone: true,
})
export class LogoComponent {
  @Input() setID!: string;
  constructor(private cardService: CardService) {}

  public card!: Card;
  public async getRandomCard() {
    this.cardService.getRandomCard(this.setID).subscribe((card) => {
      this.card = card;
      console.log('carta 2', this.card);
    });
  }
}
