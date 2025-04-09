import { Component, Input, OnInit } from '@angular/core';
import { OptionComponent } from '../option/option.component';
import { CardService, Set } from '../../services/card.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.less'],
  standalone: true,
  imports: [OptionComponent],
})
export class QuestionsComponent implements OnInit {
  @Input() setId!: string;

  constructor() {}

  ngOnInit() {}
}
