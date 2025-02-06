import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ICreateCart, IListaProd } from '../models/cart.model';
import { ToastService } from '../services/toast.service';
import { SubjectService } from '../services/subject.service';

@Component({
  selector: 'app-modale-feature-carrello',
  standalone: false,

  templateUrl: './modale-feature-carrello.component.html',
  styleUrl: './modale-feature-carrello.component.scss',
})
export class ModaleFeatureCarrelloComponent {
  public showTemplate: boolean = false;
  public carrello: ICreateCart | undefined;

  constructor(
    private cartService: CartService,
    private subjectService: SubjectService
  ) {
    this.cartService.$getNotificaStartAggiuntaProdottiCarrello().subscribe({
      next: (notifica: boolean) => {
        notifica ? (this.showTemplate = true) : (this.showTemplate = false);
      },
    });

    // prendo i prodotti dentro la variabile carrello per mostrare i prodotti che sto inserendo all interno del carrello
    this.carrello = cartService.getCarrello();
  }

  public svuotaCarrello() {
    this.cartService.svuotaCarrello();
  }

  public creaCarrello() {
    this.cartService.createNewCart_sendServer().subscribe({
      next: (msg: { message: string }) => {
        // richiudo il modale che mostra il recap del carrello
        this.showTemplate = false;

        // creo un subject per notificare al componente prodotti che la creazione del carrello è avvenuta con successo
        this.subjectService.fillToastCreazioneCarrello(true, msg);
        this.svuotaCarrello();
      },
      error: (err) => {
        console.log('errore');
      },
    });
  }

  public rimuoviProdottoSelezionato(prodotto: IListaProd) {
    this.cartService.eliminaDalCarrelloProdottoSelezionato(prodotto);
  }
}
