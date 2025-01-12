import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IRandomQuoteJSON } from '../../../models/randomQuote.model';

@Component({
  selector: 'app-info',
  standalone: false,

  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent implements OnChanges {
  @Input() Content1: IRandomQuoteJSON | undefined;

  public quote: string | null = null;
  public author: string | null = null;
  public category: string | null = null;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Content1'] && this.Content1) {
      this.quote = this.Content1.quote;
      this.author = this.Content1.author;
      this.category = this.Content1.category;
    }
  }
}
