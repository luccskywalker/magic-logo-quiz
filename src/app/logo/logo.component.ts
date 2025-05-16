import { Component, input, Input, OnChanges, OnInit } from '@angular/core';
import { Card, CardService } from '../../services/card.service';
import { CommonModule } from '@angular/common';
import { finalize, Observable, Subscription } from 'rxjs';
import { CardComponent } from '../card/card.component';
@Component({
  selector: 'app-logo',
  imports: [CommonModule, CardComponent],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.less',
  standalone: true,
})
export class LogoComponent implements OnInit {
  // @Input() searchURI!: string;
  searchURI = input.required<string>();
  @Input() setIcon!: string;
  @Input() setCount!: number;
  @Input() callCard!: Observable<boolean>;
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
      console.log('randomIndex', randomIndex);
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

  ngOnInit(): void {
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
    //   this.eventsSubscription = this.callCard.subscribe((event: boolean) => {
    //     if (!event) {
    //       if (this.setCount) {
    //         this.addToShowCardsSet();
    //       }
    //       return;
    //     }
    //   });
  }
}
