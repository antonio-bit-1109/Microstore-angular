import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IRandomQuoteJSON } from '../models/randomQuote.model';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RandomQuotesService {
  private URLRandomQuotes = 'https://api.api-ninjas.com/v1/quotes';

  private http: HttpClient = inject(HttpClient);
  private APIKEY: string | undefined;
  constructor() {
    this.APIKEY = environment.apiRandomQuoteKey;
    if (!this.APIKEY) {
      console.error('API KEY non reperita correttamente.');
    }
  }

  // metodo per fetchare una random quote
  public getRandomQuote(): Observable<IRandomQuoteJSON> {
    const headers = new HttpHeaders({
      'X-Api-Key': this.APIKEY,
    });
    return this.http
      .get<IRandomQuoteJSON>(this.URLRandomQuotes, { headers })
      .pipe(catchError(() => of(this.getDefaultQuote())));
  }

  // valore di default qualora la fetch ritorni un errore
  private getDefaultQuote(): IRandomQuoteJSON {
    return {
      quote: ' default Quote',
      author: 'Default author',
      category: 'Default cathegory',
    };
  }
}
