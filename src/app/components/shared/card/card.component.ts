import { Component, Input } from '@angular/core';
import { IProduct } from '../../../models/product.model';
import { Router } from '@angular/router';
// import { PreviousRouteService } from '../../../services/previous-route.service';

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

  constructor(
    private router: Router // private previousRouteSerivice: PreviousRouteService
  ) {}

  // metodi utili
  public troncaDescrizione(descrizione: string, Maxlength: number) {
    if (descrizione.length > Maxlength) {
      return descrizione.substring(0, Maxlength) + '...';
    }

    return descrizione;
  }

  public isAvailable(isAvalaible: string) {
    let boolVal: boolean | undefined;

    if (isAvalaible === 'true') {
      boolVal = true;
    } else {
      boolVal = false;
    }

    let disponibile = '';
    let colorFrame = '';

    if (boolVal) {
      disponibile = 'Disponibile';
      colorFrame = 'green';
    } else {
      disponibile = 'Non Disponibile';
      colorFrame = 'red';
    }

    return [disponibile, boolVal, colorFrame];
  }

  public giveDefaultImageIfNotPresent(imageURL: string) {
    if (!imageURL.startsWith('https://www') && imageURL === '') {
      return this.defaultURLImage;
    }
    return imageURL;
  }

  public redirectToDetailCard() {
    // this.previousRouteSerivice.setFromDetailsProduct();
    this.router.navigateByUrl(
      `/home/dettaglioProdotto/${this.prodotto.id}/fromProduct`
    );
  }
}
