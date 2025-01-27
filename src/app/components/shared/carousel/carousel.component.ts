import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { map, take } from 'rxjs';
import { IProduct, IProductResponse } from '../../../models/product.model';
import { Router } from '@angular/router';
// import { PreviousRouteService } from '../../../services/previous-route.service';
// import { IImage } from '../../../models/images.model';

@Component({
  selector: 'app-carousel',
  standalone: false,

  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  // private percorso = '../../assets/images/';

  public prodotti: IProduct[] | undefined;

  constructor(
    private productService: ProductService,
    private router: Router // private previousRouteService: PreviousRouteService
  ) {
    this.productService
      .getAllProducts()
      .pipe(
        map((prod) =>
          prod.listaProdotti.slice(this.getRandomNum(), this.getRandomNum() + 4)
        )
      )
      .subscribe({
        next: (prods: IProduct[]) => {
          this.prodotti = prods;
        },
        // in caso di errore mostra nel carosello i prodotti mockati
        error: (err) => {},
      });
  }

  public getPercorso(prodotto: IProduct) {
    return prodotto.image_url;
  }

  public getDesc(prodotto: IProduct) {
    return prodotto.description;
  }

  public getTitle(prodotto: IProduct) {
    return prodotto.name;
  }

  public redirectToDetails(prodotto: IProduct) {
    // this.previousRouteService.setFromHome();
    this.router.navigateByUrl(
      `/home/dettaglioProdotto/${prodotto.id}/fromHome`
    );
  }

  private getRandomNum() {
    return Math.floor(Math.random() * 5);
  }
}
