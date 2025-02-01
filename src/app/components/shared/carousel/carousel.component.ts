import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { map, take } from 'rxjs';
import { IProduct, IProductResponse } from '../../../models/product.model';
import { Router } from '@angular/router';
import { IRandomQuoteJSON } from '../../../models/randomQuote.model';
// import { PreviousRouteService } from '../../../services/previous-route.service';
// import { IImage } from '../../../models/images.model';

@Component({
  selector: 'app-carousel',
  standalone: false,

  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  @Input() public prodottiInInput: IProduct[] | undefined;

  @Input() public quotesInInput: IRandomQuoteJSON[] | undefined;

  @Output() showModal = new EventEmitter();
  constructor(
    private router: Router // private previousRouteService: PreviousRouteService
  ) {}

  // quando quotesin input viene popolato notifico al modale padre di diventare visible
  ngOnChanges(changes: SimpleChanges): void {
    if (Array.isArray(changes['quotesInInput']?.currentValue)) {
      console.log('sono qui dentro');
      this.showModal.emit(true);
    } else {
      null;
    }
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
}
