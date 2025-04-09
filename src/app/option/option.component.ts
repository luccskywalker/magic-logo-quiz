import { Component, Input, OnInit } from '@angular/core';
import { Set } from '../../services/card.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.less'],
  standalone: true,
})
export class OptionComponent implements OnInit {
  @Input() set!: Set;
  constructor() {}

  ngOnInit() {}
}
