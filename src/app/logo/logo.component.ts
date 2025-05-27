import { Component, input, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-logo',
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.less',
  standalone: true,
})
export class LogoComponent implements OnInit {
  @Input() setIcon!: string;
  @Input() setQuantity!: number;

  constructor() {}

  ngOnInit(): void {}
}
