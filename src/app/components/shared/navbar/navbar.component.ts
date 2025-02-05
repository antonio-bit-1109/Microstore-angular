import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  titolo = 'MicroStore';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

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
}
