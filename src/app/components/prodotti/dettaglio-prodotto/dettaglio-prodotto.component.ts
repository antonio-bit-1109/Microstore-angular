import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IProduct,
  IProductResponse,
  ISingleProduct,
} from '../../../models/product.model';
import { PreviousRouteService } from '../../../services/previous-route.service';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-dettaglio-prodotto',
  standalone: false,

  templateUrl: './dettaglio-prodotto.component.html',
  styleUrl: './dettaglio-prodotto.component.scss',
})
export class DettaglioProdottoComponent implements OnInit {
  private ProductService = inject(ProductService);
  private activatedRoute = inject(ActivatedRoute);
  // private router = inject(Router);
  // public alertInvisible: boolean = false;

  public prodotto: IProduct | undefined;
  public RouteICameFrom: string | null = null;
  constructor(
    private previousRouteService: PreviousRouteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDetailProdottoDB();
    this.RouteICameFrom = this.previousRouteService.getWhereICameFrom();
  }

  public goBack() {
    if (this.RouteICameFrom === 'home') {
      this.router.navigateByUrl('home');
      return;
    }

    if (this.RouteICameFrom === 'detailProduct') {
      this.router.navigateByUrl('/home/prodotti');
      return;
    }

    this.router.navigateByUrl('/home/prodotti');
  }

  // private getDetailProdotto_Mock() {
  //   const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

  //   if (id) {
  //     this.ProductService.getProduct_mock(id).subscribe({
  //       next: (product: IProduct) => {
  //         this.prodotto = product;
  //         console.log(this.prodotto);
  //       },
  //       error: (err) => {
  //         console.error(err);
  //       },
  //     });
  //   }
  // }

  private getDetailProdottoDB() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.ProductService.getSingleProductDB(id).subscribe({
        next: (product: ISingleProduct) => {
          this.prodotto = product.prodDTO;
          console.log(this.prodotto);
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  public isProdottoDisponibile() {
    if (this.prodotto?.is_active === 'true') {
      return true;
    }

    return false;
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

  // public redirectBack() {
  //   // this.router.navigate;
  // }
}
