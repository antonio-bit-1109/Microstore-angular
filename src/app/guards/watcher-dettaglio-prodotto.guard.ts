import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PreviousRouteService } from '../services/previous-route.service';

@Injectable({
  providedIn: 'root',
})
export class watcherDettaglioProdottoGuard implements CanActivate {
  constructor(private previousRouteService: PreviousRouteService) {}
  canActivate(): boolean {
    return true;
  }
}
