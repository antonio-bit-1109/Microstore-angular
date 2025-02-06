import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubjectService } from '../../services/subject.service';
import { ProductService } from '../../services/product.service';
import { IPostProduct } from '../../models/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import {
  GENERAL_ERR,
  GENERAL_SUCCESS_MESSAGE,
} from '../../models/ResponsesServer';
import { MessageService } from 'primeng/api';
import { IToastContent } from '../../models/toastContent.model';

@Component({
  selector: 'app-inserisci-nuovo-prodotto',
  standalone: false,

  templateUrl: './inserisci-nuovo-prodotto.component.html',
  styleUrl: './inserisci-nuovo-prodotto.component.scss',
  providers: [MessageService],
})
export class InserisciNuovoProdottoComponent {
  public form = new FormGroup({
    nomeProdotto: new FormControl('', [Validators.required]),
    descrizione: new FormControl('', [Validators.required]),
    prezzo: new FormControl(null, [Validators.required]),
    url: new FormControl('', [Validators.required]),
  });

  constructor(
    private subjectService: SubjectService,
    private productService: ProductService
  ) {}

  public onSubmit() {
    console.log(this.form.value);
    let toastContent: IToastContent | undefined;

    //prettier-ignore
    if (this.isFormValid()) {


      const prodotto: IPostProduct = {
        name: this.form.controls.nomeProdotto.value,
        description: this.form.controls.descrizione.value,
        image_url: this.form.controls.url.value,
        price: this.form.controls.prezzo.value,
      };

      this.productService.createProduct(prodotto).subscribe({
        next: (resp: GENERAL_SUCCESS_MESSAGE) => {
          toastContent = {
            detail: resp.message,
            key: 'toast',
            life: 2000,
            severity: 'success',
            summary: 'Inserimento Prodotto',
          };
          this.subjectService.fillToastProdottoInserito(toastContent);
          return;
        },


        error: (err: HttpErrorResponse) => {
          const serverErr: GENERAL_ERR = err.error;

          toastContent = {
            detail: serverErr['key'], // Utilizzo della chiave dinamica
            key: 'toast',
            life: 2000,
            severity: 'error',
            summary: 'Errore Inserimento Prodotto. CONTATTARE ASSISTENZA',
          };

          this.subjectService.fillToastProdottoInserito(toastContent);
          return;
        },
      });

      this.closeModal()

    } else {

      null

    }
  }

  public closeModal() {
    this.subjectService.unShowModale();
    this.form.reset();
  }

  public isFormValid() {
    return this.form.valid;
  }
}
