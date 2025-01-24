import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PreviousRouteService {
  // in questo servizio sfrutto il local storage per salvare da quale punto dell applicazione sto cliccando sulla card
  public setFromHome() {
    localStorage.setItem('fromHome', JSON.stringify({ from: 'home' }));
  }

  public setFromDetailsProduct() {
    localStorage.setItem(
      'fromDetailProduct',
      JSON.stringify({ from: 'DetailProduct' })
    );
  }

  public getWhereICameFrom(): string | null {
    if (localStorage.getItem('fromHome')) {
      localStorage.removeItem('fromHome');
      return 'home';
    }

    if (localStorage.getItem('fromDetailProduct')) {
      localStorage.removeItem('fromDetailProduct');
      return 'detailProduct';
    }

    return null;
  }
}
