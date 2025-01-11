import { Component, Input } from '@angular/core';
import { IProduct } from '../../../models/product.model';

@Component({
  selector: 'app-card',
  standalone: false,

  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  //creo una proprietà di input che accetta un oggetto dal padre
  @Input() public prodotto: IProduct | undefined;

  // metodi
  UpperFirstLetter(titolo: string) {
    const RemainingTitle = titolo.slice(1);
    return titolo.charAt(0).toLocaleUpperCase() + RemainingTitle;
  }
}
