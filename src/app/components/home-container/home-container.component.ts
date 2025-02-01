import {
  Component,
  OnInit,
  AfterViewInit,
  viewChild,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { RandomQuotesService } from '../../services/random-quotes.service';
import { IRandomQuoteJSON } from '../../models/randomQuote.model';
import { UserService } from '../../services/user.service';
import { IDataRegistrazioneUtente } from '../../models/dataUtente.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin, map, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IProduct } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-home-container',
  standalone: false,

  templateUrl: './home-container.component.html',
  styleUrl: './home-container.component.scss',
})
export class HomeContainerComponent implements OnInit {
  public arrQuotesObservable: any[] = [];
  public dataRegistrazioneUser: IDataRegistrazioneUtente | null = null;

  public arrQuotesCarousel: IRandomQuoteJSON[] | undefined;

  public visibleModal = false;

  public prodottiCarousel: IProduct[] | undefined;

  private randomNum: number | undefined;
  constructor(
    private randomQuoteService: RandomQuotesService,
    private userService: UserService,
    private ngbModal: NgbModal,
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  // dopo il costruttore
  // dopo la creazione del componente sul DOM.
  ngOnInit(): void {
    this.obtainArrQuotes();
    this.getproductForCarousel();
  }

  private obtainArrQuotes() {
    for (let i = 0; i < 5; i++) {
      this.arrQuotesObservable.push(this.getQuote());
    }

    forkJoin(this.arrQuotesObservable).subscribe({
      next: (quotes: IRandomQuoteJSON[]) => {
        this.arrQuotesCarousel = quotes;
        this.visibleModal = true;
        this.cdr.detectChanges();
        console.log(this.arrQuotesCarousel);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.error);
      },
    });
  }

  getQuote() {
    return this.randomQuoteService.getRandomQuote();
  }

  private getRandomNum() {
    this.randomNum = Math.floor(Math.random() * 5);
  }

  public getproductForCarousel() {
    this.productService
      .getAllProducts()
      .pipe(
        map((prod) => {
          this.getRandomNum();
          return prod.listaProdotti.slice(this.randomNum, this.randomNum + 6);
        })
      )
      .subscribe({
        next: (prods: IProduct[]) => {
          this.prodottiCarousel = prods;
        },
        // in caso di errore mostra nel carosello i prodotti mockati
        error: (err) => {
          console.error('errore durante la get dei prodotti per il carousel');
        },
      });
  }
}
