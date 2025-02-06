import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { SubjectService } from '../services/subject.service';

@Injectable({
  providedIn: 'root',
})
export class enterCarrelloCorrenteGuard implements CanActivate {
  constructor(
    private cartService: CartService,
    private router: Router,
    private subjectService: SubjectService
  ) {}
  canActivate(): boolean {
    if (this.cartService.getItemsInCart_Length() > 0) {
      return true;
      //
    } else {
      //
      this.subjectService.fillToastCreazioneCarrello(true, {
        message: 'carrello vuoto. Senza prodotti non puoi accedere alla pagina',
        severity: 'info',
      });
      this.subjectService.fillToastCreazioneCarrello(false, null);
      return false;
    }
  }
}
