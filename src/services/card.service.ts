import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

export interface Card {
  name: string;
  set_name: string;
  image_uris: {
    large: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private httpService: HttpClient) {}

  BASE_URL = 'https://api.scryfall.com';

  public getRandomCard(id: string): Observable<Card> {
    const randomCardUrl = this.BASE_URL + '/cards/random';
    return this.httpService.get<Card>(randomCardUrl, {
      params: { filter: 'all' },
    });
  }
}
