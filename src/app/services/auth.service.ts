import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { TOKEN_PAYLOAD, TOKEN_STORAGE } from '../models/ResponsesServer';
import { Router } from '@angular/router';
import { SubjectService } from './subject.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private subjectService: SubjectService) {}

  // metodo per salvare nello storage il token
  public saveInStorage(token: string) {
    localStorage.setItem('token', JSON.stringify({ token: token }));
  }

  // metodo che al logout cancella il token dallo storage
  public logout() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      this.subjectService.fillNotificationLogout(
        'logout effettuato con successo.'
      );
      this.router.navigateByUrl('login');
    }
  }

  // metoco che controlla se in storage c'è una chiave, quindi se sono loggato
  public isLoggedIn() {
    return localStorage.getItem('token') ? true : false;
  }

  // metodo che controlla tramite il pacchetto jwt decode se il token contiene la chiave admin o user
  public isLoggedInAndAdmin() {
    if (localStorage.getItem('token')) {
      const token: TOKEN_STORAGE = JSON.parse(localStorage.getItem('token'));
      return this.isAdmin(token.token);
    }
    return false;
  }

  private isAdmin(token: string): boolean {
    const decoded: TOKEN_PAYLOAD = jwtDecode(token);
    return decoded.role === 'ADMIN';
  }
}
