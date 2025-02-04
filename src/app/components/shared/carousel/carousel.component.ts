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
import { SubjectService } from '../../../services/subject.service';
import { HttpErrorResponse } from '@angular/common/http';
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

  // @Output() public notifyPadre = new EventEmitter();
  @Input() public Arrquotes: IRandomQuoteJSON[] | undefined;
  public intervalCarousel = 2000;
  @Input() public showQuotes: boolean | undefined;
  // @Output() showModal = new EventEmitter();

  constructor(
    private router: Router // private subjectService: SubjectService
  ) {
    // chiamo il servizio e aggiungo +1 al contatore che mi tiene traccia di quante volte sono passato per home. se il valore è 5 o multiplo di 5 allora emetto la notifica al padre per mostraer il banner. (in sostanza mostro il banner ads ogni 5 volte che carico il componente Home)
    // this.subjectService.addToVisibleADs();

    //prettier-ignore
    // if (!(this.subjectService.getValueVIsibleAds() % 5 === 0)) {

    //   console.log('il counter per mostrare il banner pubblicitario non è modulo di 5 ');
    //  console.log(this.subjectService.getValueVIsibleAds() , 'counter visibilità ads')
    // } else {

    //   this.subjectService.getArrQuotesObservable().subscribe({
    //     next: (arrQuotes: IRandomQuoteJSON[]) => {
    //       console.log('arrayquotes arrivate nel carousel');
    //       this.Arrquotes = arrQuotes;

    //       if (Array.isArray(this.Arrquotes)) {
    //         this.notifyPadre.emit(true);
    //       }
    //     },
    //     error: (err: HttpErrorResponse) => {
    //       console.error(err.error);
    //     },
    // });
    // }
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
