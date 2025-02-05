import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-modale-feature-carrello',
  standalone: false,

  templateUrl: './modale-feature-carrello.component.html',
  styleUrl: './modale-feature-carrello.component.scss',
})
export class ModaleFeatureCarrelloComponent {
  public showTemplate: boolean = false;

  constructor(private cartService: CartService) {
    this.cartService.$getNotificaStartAggiuntaProdottiCarrello().subscribe({
      next: (notifica: boolean) => {
        notifica ? (this.showTemplate = true) : (this.showTemplate = false);
      },
    });
  }
}
