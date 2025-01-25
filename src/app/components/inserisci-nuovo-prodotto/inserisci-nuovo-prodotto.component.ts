import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-inserisci-nuovo-prodotto',
  standalone: false,

  templateUrl: './inserisci-nuovo-prodotto.component.html',
  styleUrl: './inserisci-nuovo-prodotto.component.scss',
})
export class InserisciNuovoProdottoComponent {
  public form = new FormGroup({
    nomeProdotto: new FormControl('', [Validators.required]),
    descrizione: new FormControl('', [Validators.required]),
    prezzo: new FormControl('', [Validators.required]),
    url: new FormControl('', [Validators.required]),
  });
  public onSubmit() {}
}
