import { Component, OnInit } from '@angular/core';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-aggiungi-scorte-prodotto',
  standalone: false,

  templateUrl: './aggiungi-scorte-prodotto.component.html',
  styleUrl: './aggiungi-scorte-prodotto.component.scss',
})
export class AggiungiScorteProdottoComponent implements OnInit {
  cities!: City[];

  selectedCities!: City[];

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' },
    ];
  }
}
