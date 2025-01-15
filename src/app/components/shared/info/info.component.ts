import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IRandomQuoteJSON } from '../../../models/randomQuote.model';

@Component({
  selector: 'app-info',
  standalone: false,

  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent implements OnChanges {
  @Input() Content1: IRandomQuoteJSON[] | undefined;

  constructor() {}
  public quote: string | null = null;
  public author: string | null = null;
  public category: string | null = null;

  // changes oggetto che contiene valori attuali, precedenti della prop
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['Content1'] && changes['Content1'].currentValue) {
      console.log('Content1 cambiato:', changes['Content1'].currentValue);
      console.log(this.Content1, 'valore nell onchange di content1');
      this.quote = this.Content1[0]?.quote || null;
      this.author = this.Content1[0]?.author || null;
      this.category = this.Content1[0]?.category || null;
    } else {
      console.log('Content1 non contiene dati validi:', this.Content1);
    }
  }
}
