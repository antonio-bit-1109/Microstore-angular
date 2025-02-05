import { Injectable } from '@angular/core';
import { ICreateCart, IListaProd } from '../models/cart.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { TOKEN_PAYLOAD } from '../models/ResponsesServer';
import { BehaviorSubject } from 'rxjs';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: ICreateCart = { idUser: null, listaProdotti: [] };
  private isStartedAddProdottiCarrello = new BehaviorSubject<boolean>(false);
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    // nel costruttore del servizio imposto id utente che possiede il carrello
    const token: TOKEN_PAYLOAD = this.authService.getCredentials();

    if (token && this.cart) {
      const idUtente = token?.jti;
      this.cart.idUser = parseInt(idUtente);
    }
  }

  public rollBackCarrello() {}

  // tramite il metodo aggiungi al carrello aggiungo il prodotto al carrello da inviare al server
  public aggiungiProdottoAlCArrello(prodotto: IProduct) {
    this.isStartedAddProdottiCarrello.next(true);

    const prodottoDaInserire = this.cart.listaProdotti.find(
      (p) => p.idProd === prodotto.id
    );

    if (prodottoDaInserire) {
      prodottoDaInserire.quantity++;
    } else {
      this.cart.listaProdotti.push({
        idProd: prodotto.id,
        prezzoUnitario: parseInt(prodotto.prezzo),
        quantity: 1,
      });
    }
  }

  public createNewCart_sendServer(dataCart: ICreateCart) {
    return this.httpClient.post(`${environment.URL_CREATE_CART}`, dataCart);
  }

  public $getNotificaStartAggiuntaProdottiCarrello() {
    return this.isStartedAddProdottiCarrello.asObservable();
  }
}
