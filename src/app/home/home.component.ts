import { Component, OnInit, output } from '@angular/core';
import { CardService, Set } from '../../services/card.service';
import { JsonPipe } from '@angular/common';
import { OptionComponent } from '../option/option.component';
import { LogoComponent } from '../logo/logo.component';
import { finalize, Subject } from 'rxjs';
import { CardsZoneComponent } from '../cards-zone/cards-zone.component';

const STANDARD_QUESTIONS_QUANTITY = 5;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  standalone: true,
  imports: [OptionComponent, LogoComponent, CardsZoneComponent],
})
export class HomeComponent implements OnInit {
  constructor(private cardService: CardService) {}

  public hasStartedGame = false;
  public loading = false;
  public length = 0;
  public wrongSets: Set[] = [];
  public rightSet!: Set;

  public getRandomArbitrary(min = 1, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  public fillSets(times = STANDARD_QUESTIONS_QUANTITY) {
    this.cardService
      .getAllSets()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((set: any) => {
        this.length = set.data.length;
        this.rightSet = set.data[this.getRandomArbitrary(1, this.length - 1)];
        for (let index = 0; index < times; index++) {
          this.wrongSets.push(
            set.data[this.getRandomArbitrary(1, this.length - 1)]
          );
        }
      });
  }
  public answer = false;
  public answerEventSubject: Subject<boolean> = new Subject<boolean>();

  public answerRead(answer: boolean) {
    this.answerEventSubject.next(answer);
  }

  public startGame() {
    this.loading = true;
    this.hasStartedGame = true;
    this.fillSets();
  }
  ngOnInit() {}
}
