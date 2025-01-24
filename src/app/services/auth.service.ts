import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { TOKEN_PAYLOAD, TOKEN_STORAGE } from '../models/ResponsesServer';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  public saveInStorage(token: string) {
    localStorage.setItem('token', JSON.stringify({ token: token }));
  }

  public logout() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
  }

  public isLoggedIn() {
    return localStorage.getItem('token') ? true : false;
  }

  // metodo che controlla tramite il pacchetto jwt decode se il token contiene la chiave admin o user
  public isLoggedInAndAdmin() {
    if (localStorage.getItem('token')) {
      const token: TOKEN_STORAGE = JSON.parse(localStorage.getItem('token'));
      return this.idAdmin(token.token);
    }
    return false;
  }

  private idAdmin(token: string): boolean {
    const decoded: TOKEN_PAYLOAD = jwtDecode(token);
    return decoded.role === 'ADMIN';
  }
}
