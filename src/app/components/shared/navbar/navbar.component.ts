import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  titolo = 'MicroStore';

  constructor(private authService: AuthService) {}

  public logout() {
    this.authService.logout();
  }
}
