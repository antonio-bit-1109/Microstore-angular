import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ICreateCart, IListaProd } from '../../models/cart.model';

@Component({
  selector: 'app-carrello-corrente',
  standalone: false,

  templateUrl: './carrello-corrente.component.html',
  styleUrl: './carrello-corrente.component.scss',
})
export class CarrelloCorrenteComponent {
  public carrello: ICreateCart | undefined;
  constructor(private cartService: CartService) {
    this.carrello = cartService.getCarrello();
    console.log(
      this.carrello,
      'carrello presente in carrello corrente component '
    );
  }

  public rimuoviProdottoSelezionato(prodotto: IListaProd) {
    this.cartService.eliminaDalCarrelloProdottoSelezionato(prodotto);
  }

  public getImage(prodotto: IListaProd) {
    return prodotto.img && prodotto.img !== ''
      ? prodotto.img
      : 'https://media.istockphoto.com/id/1396814518/it/vettoriale/immagine-in-arrivo-nessuna-foto-nessuna-immagine-in-miniatura-disponibile-illustrazione.jpg?s=2048x2048&w=is&k=20&c=JrtawqzdBNu2u9zZvkP10KLBozTxsaXPl0BxjuaUtMY=';
  }
}
