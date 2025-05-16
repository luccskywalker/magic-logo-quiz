import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from './logo/logo.component';
import { CardService } from '../services/card.service';
import { HttpClient } from '@angular/common/http';
import { OptionComponent } from './option/option.component';
import { QuestionsComponent } from './questions/questions.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  imports: [HomeComponent],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  standalone: true,
})
export class AppComponent {
  title = 'magic-logo-quiz';
}
