import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

export interface Card {
  id: string;
  name: string;
  set_name: string;
  image_uris: {
    large: string;
  };
  revealed: boolean;
}
export interface Cards {
  data: Card[];
}

export interface Set {
  id: string;
  name: string;
  released_at: string;
  block: string;
  icon_svg_uri: string;
  code: string;
  search_uri: string;
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
  public getSet(search_uri: string): Observable<Cards> {
    return this.httpService.get<Cards>(search_uri);
  }

  public getAllSets(): Observable<Set> {
    const randomSetUrl = this.BASE_URL + '/sets';
    return this.httpService.get<Set>(randomSetUrl);
  }
}
