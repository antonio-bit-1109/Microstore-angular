import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAddStock } from '../../../../../models/product.model';
import { ProductService } from '../../../../../services/product.service';
import { SUCCESS_ADD_STOCK } from '../../../../../models/ResponsesServer';
import { SubjectService } from '../../../../../services/subject.service';
import { HttpErrorResponse } from '@angular/common/http';
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
export class AggiungiScorteProdottoComponent {
  @Input() idProdotto: number | undefined;
  @Output() EmitBoolCloseToast = new EventEmitter();
  constructor(
    private productService: ProductService,
    private subjectService: SubjectService
  ) {}

  public form = new FormGroup({
    stock: new FormControl(null, [Validators.required]),
  });

  public onSubmit() {
    // console.log(this.form.value);
    // console.log(this.idProdotto);

    if (this.form.valid && this.idProdotto) {
      const dataStock: IAddStock = {
        id: Number(this.idProdotto),
        stock: Number(this.form.controls.stock.value),
      };

      this.productService.addScorteProdotto(dataStock).subscribe({
        next: (resp: SUCCESS_ADD_STOCK) => {
          this.subjectService.fillToastAddStockProdotto(resp.msg);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          const errMsg = Object.values(err.error)[0] as string;
          this.subjectService.fillToastAddStockProdotto(errMsg);
        },
      });
      this.emitBooleanToast();
    } else {
      null;
    }
  }

  public isFormValid() {
    return this.form.valid;
  }

  public emitBooleanToast() {
    this.EmitBoolCloseToast.emit(false);
  }
}
