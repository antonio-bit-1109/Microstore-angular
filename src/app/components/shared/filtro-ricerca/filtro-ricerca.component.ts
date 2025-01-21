import { Component } from '@angular/core';

@Component({
  selector: 'app-filtro-ricerca',
  standalone: false,

  templateUrl: './filtro-ricerca.component.html',
  styleUrl: './filtro-ricerca.component.scss',
})
export class FiltroRicercaComponent {
  public options = [
    '',
    'disponibile',
    'non disponibile',
    'prezzo più basso',
    'prezzo più alto',
    'ordine alfabetico A-Z',
    'ordine alfabetico Z-A',
  ];
}
