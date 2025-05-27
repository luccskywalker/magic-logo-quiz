import { Component, input, Input, OnInit } from '@angular/core';
import { Observable, Subscription, finalize } from 'rxjs';
import { Card, CardService } from '../../services/card.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-cards-zone',
  templateUrl: './cards-zone.component.html',
  styleUrls: ['./cards-zone.component.less'],
  imports: [CardComponent],
})
export class CardsZoneComponent implements OnInit {
  searchURI = input.required<string>();

  @Input() callCard!: Observable<boolean>;
  public setCount!: number;
  public cardSet: Card[] = [];
  public indexArray: number[] = [];
  public cardsToShow: Card[] = [];
  public loading = false;
  public cardQuantity = 5;
  public revealCounter = 0;
  public searchURL = 'https://api.scryfall.com/cards/search?q=';
  private eventsSubscription!: Subscription;
  constructor(private cardService: CardService) {}

  public getRandomArbitrary(min = 1, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getUniqueRandomIndex(min: number, max: number): number {
    const randomIndex = this.getRandomArbitrary(min, max);
    if (
      !this.indexArray.includes(randomIndex) ||
      this.indexArray.length === 0
    ) {
      return randomIndex;
    }

    return this.getUniqueRandomIndex(min, max);
  }

  public addToShowCardsSet() {
    // if (this.indexArray.length === this.setCount) return;
    // this.indexArray.push(randomIndex);
    if (this.cardQuantity > this.setCount) this.cardQuantity = this.setCount;
    for (let i = 0; i < this.cardQuantity; i++) {
      const randomIndex = this.getUniqueRandomIndex(1, this.setCount);
      this.cardsToShow.push({
        id: this.cardSet[randomIndex - 1].id,
        image_uris: this.cardSet[randomIndex - 1].image_uris,
        name: this.cardSet[randomIndex - 1].name,
        revealed: false,
        set_name: this.cardSet[randomIndex - 1].set_name,
      });
    }
  }

  public getSetCards() {
    this.loading = true;
    this.cardService
      .getSet(this.searchURI())
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe((cardSet) => {
        this.cardSet = cardSet.data;
        this.setCount = this.cardSet.length;
        this.addToShowCardsSet();
      });
  }

  ngOnInit() {
    this.getSetCards();
    this.eventsSubscription = this.callCard.subscribe((event: boolean) => {
      if (!event) {
        if (this.setCount) {
          if (this.revealCounter === this.cardQuantity) return;
          this.cardsToShow[this.revealCounter].revealed = true;
          this.revealCounter++;
        }
      }
    });
  }
}
