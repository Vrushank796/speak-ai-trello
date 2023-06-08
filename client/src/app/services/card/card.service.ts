import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ICard {
  id: string;
  title: string;
  description: string;
  creationDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private http: HttpClient) {}

  getAllCardsUrl: string = 'http://localhost:8000/api/cards';
  cardUrl: string = 'http://localhost:8000/api/card';

  getCards(): Observable<ICard[]> {
    return this.http.get<ICard[]>(this.getAllCardsUrl);
  }

  getCard(id: string): Observable<ICard> {
    return this.http.get<ICard>(this.cardUrl + '/' + id);
  }

  createCard(title: string, description: string): Observable<ICard> {
    return this.http.post<ICard>(
      this.cardUrl,
      {
        title: title,
        description: description,
      },
      {
        withCredentials: true,
      }
    );
  }

  updateCard(
    id: string,
    title: string,
    description: string
  ): Observable<ICard> {
    return this.http.put<ICard>(
      this.cardUrl + '/' + id,
      {
        title: title,
        description: description,
      },
      {
        withCredentials: true,
      }
    );
  }

  deleteCard(id: string): Observable<any> {
    return this.http.delete<any>(this.cardUrl + '/' + id, {
      withCredentials: true,
    });
  }
}
