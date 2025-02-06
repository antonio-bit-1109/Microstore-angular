import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-gestione-carrelli',
  standalone: false,

  templateUrl: './gestione-carrelli.component.html',
  styleUrl: './gestione-carrelli.component.scss',
})
export class GestioneCarrelliComponent {
  constructor(private cartService: CartService) {
    this.cartService.getAllCartUser().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.error);
      },
    });
  }
}
