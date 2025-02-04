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
import { SubjectService } from '../../services/subject.service';
@Component({
  selector: 'app-home-container',
  standalone: false,

  templateUrl: './home-container.component.html',
  styleUrl: './home-container.component.scss',
})
export class HomeContainerComponent implements OnInit {
  public arrQuotesObservable: any[] = [];
  public dataRegistrazioneUser: IDataRegistrazioneUtente | null = null;

  public visibleModal = false;

  public prodottiCarousel: IProduct[] | undefined;

  private randomNum: number | undefined;
  public visible: boolean | undefined;
  public Arrquotes: IRandomQuoteJSON[] | undefined;
  public visibilityModal: boolean | undefined;
  public showQuotes = false;
  constructor(
    private randomQuoteService: RandomQuotesService,
    private userService: UserService,
    private ngbModal: NgbModal,
    private productService: ProductService,
    private cdr: ChangeDetectorRef,
    private subjectService: SubjectService
  ) {}

  // dopo il costruttore
  // dopo la creazione del componente sul DOM.
  ngOnInit(): void {
    this.obtainArrQuotes();
    this.getproductForCarousel();
    // add 1 al contatore ogni volta che componente caricato, per mostrare ogni 5 il banner pubblicitario.
    this.subjectService.addToVisibleADs();
    this.getQuotesAds();
  }

  //fetch per ricavare l'array di quotes da mostrare come banner pubblicitario
  private getQuotesAds() {
    if (!(this.subjectService.getValueVIsibleAds() % 5 === 0)) {
      console.log(
        'il counter per mostrare il banner pubblicitario non è modulo di 5 '
      );
      console.log(
        this.subjectService.getValueVIsibleAds(),
        'counter visibilità ads'
      );
    } else {
      this.subjectService.getArrQuotesObservable().subscribe({
        next: (arrQuotes: IRandomQuoteJSON[]) => {
          console.log('arrayquotes arrivate nel carousel');
          this.Arrquotes = arrQuotes;

          if (Array.isArray(this.Arrquotes)) {
            console.log('mostra modale, sono dentro');
            this.visibilityModal = true;
            this.showQuotes = true;
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error(err.error);
        },
      });
    }
  }

  private obtainArrQuotes() {
    for (let i = 0; i < 5; i++) {
      this.arrQuotesObservable.push(this.getQuote());
    }

    forkJoin(this.arrQuotesObservable).subscribe({
      next: (quotes: IRandomQuoteJSON[]) => {
        this.subjectService.fillRandomArrQuotes(quotes);
        // this.arrQuotesCarousel = quotes;
        // this.visibleModal = true;
        // this.cdr.detectChanges();
        // console.log(this.arrQuotesCarousel);
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

  public getInputFromChild(event: boolean) {
    console.log(event);
    this.visible = event;
  }

  public closeModal() {
    this.visibilityModal = false;
  }
}
