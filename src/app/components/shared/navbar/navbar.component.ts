import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';

interface SelectItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  titolo = 'MicroStore';

  // listItems: SelectItem[];
  // selectedItem: string; // Definisci la proprietà per il valore selezionato

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  // ngOnInit() {
  //   this.listItems = [
  //     { label: 'fa fa-user', value: 'v1' },
  //     { label: 'fa fa-user-cog', value: 'v2' },
  //   ];
  // }

  public logout() {
    this.authService.logout();
  }

  public showUsername() {
    return this.authService.getUsername();
  }

  public goToProfile() {
    this.router.navigateByUrl('/home/profilo');
  }

  public getItemInCart_Length() {
    return this.cartService.getItemsInCart_Length();
  }

  public goToCarrelloCorrente() {
    this.router.navigateByUrl('/home/carrello-corrente');
  }
}
