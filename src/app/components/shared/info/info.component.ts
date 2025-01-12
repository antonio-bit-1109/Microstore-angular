import { Component, Input } from '@angular/core';
import { IRandomQuoteJSON } from '../../../models/randomQuote.model';

@Component({
  selector: 'app-info',
  standalone: false,

  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  @Input() Content1: IRandomQuoteJSON | undefined;
  @Input() isDataQuotesAvailable: boolean | undefined;
  public getQuote(QuoteObj: IRandomQuoteJSON) {
    if (this.Content1) {
      return QuoteObj.quote;
    }
    return null;
  }

  public getCategory(QuoteObj: IRandomQuoteJSON) {
    if (this.Content1) {
      return QuoteObj.category;
    }
    return null;
  }
  public getAuthor(QuoteObj: IRandomQuoteJSON) {
    if (this.Content1) {
      return QuoteObj.author;
    }
    return null;
  }
}
