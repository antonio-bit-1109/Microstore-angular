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

  private idUtente;
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    // nel costruttore del servizio imposto id utente che possiede il carrello
    const token: TOKEN_PAYLOAD = this.authService.getCredentials();

    if (token && this.cart) {
      const idUtente = token?.jti;
      this.idUtente = idUtente;
      this.cart.idUser = parseInt(idUtente);
    }
  }

  public svuotaCarrello() {
    this.cart.listaProdotti = [];
    console.log('carrello svuotato.');
    this.isStartedAddProdottiCarrello.next(false);
  }

  // tramite il metodo aggiungi al carrello aggiungo il prodotto al carrello da inviare al server
  public aggiungiProdottoAlCArrello(prodotto: IProduct) {
    if (!prodotto.is_active) {
      return;
    }

    this.isStartedAddProdottiCarrello.next(true);

    const prodottoDaInserire = this.cart.listaProdotti.find(
      (p) => p.idProd === prodotto.id
    );

    if (prodottoDaInserire) {
      prodottoDaInserire.quantity++;
    } else {
      this.cart.listaProdotti.push({
        idProd: prodotto.id,
        prezzoUnitario: parseFloat(prodotto.prezzo),
        quantity: 1,
        nomeProdotto: prodotto.name,
        img: prodotto.image_url,
      });
    }

    console.log(this.cart);
  }

  public createNewCart_sendServer() {
    return this.httpClient.post(
      `${environment.LOCAL_HOST + environment.URL_CREATE_CART}`,
      this.cart
    );
  }

  public $getNotificaStartAggiuntaProdottiCarrello() {
    return this.isStartedAddProdottiCarrello.asObservable();
  }

  public getItemsInCart_Length() {
    return this.cart.listaProdotti.length;
  }

  public getCarrello() {
    return this.cart ? this.cart : null;
  }

  public eliminaDalCarrelloProdottoSelezionato(prodotto: IListaProd) {
    this.cart.listaProdotti = this.cart.listaProdotti.filter(
      (prod) => prod.idProd !== prodotto.idProd
    );
  }

  // for the selected user take all the available carts saved into DB
  public getAllCartUser() {
    return this.httpClient.get(
      `${environment.LOCAL_HOST + environment.URL_GET_ALL_CART}/${
        this.idUtente
      }`
    );
  }
}
