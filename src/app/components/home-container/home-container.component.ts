import { Component, OnInit } from '@angular/core';
import { RandomQuotesService } from '../../services/random-quotes.service';
import { IRandomQuoteJSON } from '../../models/randomQuote.model';

@Component({
  selector: 'app-home-container',
  standalone: false,

  templateUrl: './home-container.component.html',
  styleUrl: './home-container.component.scss',
})
export class HomeContainerComponent implements OnInit {
  public Quote1: IRandomQuoteJSON[] | undefined;

  // inietto product service nella classe
  constructor(private randomQuoteService: RandomQuotesService) {}

  ngOnInit(): void {
    this.randomQuoteService.getRandomQuote().subscribe({
      next: (data: IRandomQuoteJSON[]) => {
        this.Quote1 = data;

        console.log('quotes random fetchate con successo', this.Quote1);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
