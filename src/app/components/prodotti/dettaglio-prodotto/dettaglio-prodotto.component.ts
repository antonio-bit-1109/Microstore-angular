import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IProduct,
  IProductResponse,
  ISingleProduct,
} from '../../../models/product.model';

@Component({
  selector: 'app-dettaglio-prodotto',
  standalone: false,

  templateUrl: './dettaglio-prodotto.component.html',
  styleUrl: './dettaglio-prodotto.component.scss',
})
export class DettaglioProdottoComponent implements OnInit {
  private ProductService = inject(ProductService);
  private activatedRoute = inject(ActivatedRoute);
  private Router = inject(Router);
  // public alertInvisible: boolean = false;

  public prodotto: IProduct | undefined;

  ngOnInit(): void {
    this.getDetailProdotto_Mock();
    // this.getDetailProdottoDB();
  }

  // ngAfterViewInit(): void {
  //   this.makeAlertDisappear();
  // }

  private getDetailProdotto_Mock() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (id) {
      this.ProductService.getProduct_mock(id).subscribe({
        next: (product: IProduct) => {
          this.prodotto = product;
          console.log(this.prodotto);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  private getDetailProdottoDB() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (id) {
      this.ProductService.getSingleProductDB(id.toString()).subscribe({
        next: (product: ISingleProduct) => {
          this.prodotto = product.prodotto;
          console.log(this.prodotto);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  public isAvailable(isAvalaible: string) {
    let boolVal: boolean | undefined;

    if (isAvalaible === 'true') {
      boolVal = true;
    } else {
      boolVal = false;
    }

    let disponibile = '';
    let colorFrame = '';

    if (boolVal) {
      disponibile = 'Disponibile';
      colorFrame = 'green';
    } else {
      disponibile = 'Non Disponibile';
      colorFrame = 'red';
    }

    return [disponibile, boolVal, colorFrame];
  }

  // public makeAlertDisappear() {
  //   setTimeout(() => {
  //     this.alertInvisible = true;
  //   }, 3000);
  // }
}
