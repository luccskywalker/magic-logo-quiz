import { Component, Input, OnInit, output } from '@angular/core';
import { Set } from '../../services/card.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.less'],
  standalone: true,
  imports: [CommonModule],
})
export class OptionComponent implements OnInit {
  @Input() set!: Set;
  @Input() correctOption!: boolean;
  answer = output<boolean>();

  public deactivated = false;
  public isNeutral = true;
  public showLogo = false;
  constructor() {}

  public showCorrectAnswerAnimation() {
    this.isNeutral = false;
    this.showLogo = true;
  }
  public showWrongAnswerAnimation() {
    this.isNeutral = false;
    this.showLogo = true;
  }

  public selectOption() {
    if (this.deactivated) return;
    this.deactivated = true;
    this.answer.emit(this.correctOption);
    if (this.correctOption) {
      this.showCorrectAnswerAnimation();
    } else {
      this.showWrongAnswerAnimation();
    }
  }

  ngOnInit() {}
}
