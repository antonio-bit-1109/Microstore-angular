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

  private defaultURLImage =
    'https://media.istockphoto.com/id/1396814518/it/vettoriale/immagine-in-arrivo-nessuna-foto-nessuna-immagine-in-miniatura-disponibile-illustrazione.jpg?s=2048x2048&w=is&k=20&c=JrtawqzdBNu2u9zZvkP10KLBozTxsaXPl0BxjuaUtMY=';

  // metodi utili
  public troncaDescrizione(descrizione: string, Maxlength: number) {
    if (descrizione.length > Maxlength) {
      return descrizione.substring(0, Maxlength) + '...';
    }

    return descrizione;
  }

  public isAvailable(isAvalaible: string) {
    let avail: boolean;

    if (isAvalaible === 'true') {
      avail = true;
    }
    avail = false;

    let disponibile = '';
    let colorFrame = '';

    if (avail) {
      disponibile = 'Disponibile';
      colorFrame = 'green';
    } else {
      disponibile = 'Non Disponibile';
      colorFrame = 'red';
    }

    return [disponibile, avail, colorFrame];
  }

  public giveDefaultImageIfNotPresent(imageURL: string) {
    if (!imageURL.startsWith('https://www') && imageURL === '') {
      return this.defaultURLImage;
    }
    return imageURL;
  }

  // public inviaTitolo(titolo: string) {
  //   this.msgOutput.emit(titolo);
  // }
}
