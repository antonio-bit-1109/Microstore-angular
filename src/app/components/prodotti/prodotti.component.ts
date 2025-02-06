import {
  Component,
  inject,
  OnInit,
  OnChanges,
  SimpleChanges,
  DoCheck,
  Input,
  OnDestroy,
} from '@angular/core';
import { IProduct, IProductResponse } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { map, Subscription } from 'rxjs';
import { SubjectService } from '../../services/subject.service';
import { IToastContent } from '../../models/toastContent.model';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-prodotti',
  standalone: false,

  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.scss',
  // providers: [MessageService],
})
export class ProdottiComponent implements OnInit, DoCheck, OnDestroy {
  private AllProdottiMock: IProduct[] | undefined;
  private AllProdottiDB: IProductResponse | undefined | IProduct[];

  first: number = 0;
  rows: number = 10;
  page = 1;
  size = 4;
  @Input() valFiltro: string = '';
  previusValFiltro = '';
  dataToast: null | IToastContent = null;

  // array di tutte le sottoscrizioni che avvengon nel componente
  // ALL DESTROY DEL COMPONENTE DEVONO ESSERE CHIUSE PER EVITARE SOTTOSCRIZIONI MULTIPLE
  subscriptions: Subscription[] = [];

  // INIETTARE IL SERVIZIO NELLA CLASSE
  // 1- costruttore utilizzato solo per iniettare dipendenze
  // 2- oppure utilizzando il metodo inject
  // private productService = inject(ProductService);
  constructor(
    private productService: ProductService,
    private subjectService: SubjectService,
    // private messageService: MessageService,
    private toastService: ToastService
  ) {}

  // utilizzo i cicli di vita del componente per logiche più complesse come
  //
  ngOnInit(): void {
    // carica nella prop i prodotti mockati
    const subMockProdotti = this.productService
      .getAllProducts_mock()
      .subscribe({
        next: (prodotti: IProduct[]) => {
          this.AllProdottiMock = prodotti;
          console.log('prodotti Mock caricati', this.AllProdottiMock);
        },

        error: (err) => {
          console.error(err);
        },
      });

    // pusho nell array delle sottoscrizioni tutte le subscription in modo da fare unsubscribe all on destroy del componente
    this.subscriptions.push(subMockProdotti);

    // carica nella prop i prodotti provenienti dall API
    const subProdotti = this.productService.getAllProducts().subscribe({
      next: (prodotti: IProductResponse) => {
        this.AllProdottiDB = prodotti;
        console.log('prodotti DAL DB caricati', this.AllProdottiDB);
      },

      error: (err) => {
        console.error(err);
      },
    });

    this.subscriptions.push(subProdotti);

    this.subscribeToSubjectService();
    const subToastCarrelloCreato = this.subjectService
      .$getDataToastCarrelloCreato()
      .subscribe({
        next: (
          dataToast: [boolean, { message: string; severity?: string }] | null
        ) => {
          console.log(dataToast);
          if (dataToast[0] && dataToast[1] && dataToast[1].message) {
            this.toastService.show(
              'toast',
              dataToast[1].severity ? 'info' : 'success',
              'creazione carrello',
              dataToast[1].message
            );
          }
        },
      });

    this.subscriptions.push(subToastCarrelloCreato);
  }

  // ho un valore di default all interno del componente.
  // quando utente cambia valore filtro ed arriva qui se il valoe di default è diverso dal valore del filtro faccio una fetch che mi ritorna i prodotti filtrati in un certo modo.
  // per far si che non ci sia un loop infinito poi imposto il valore del filtro al valore della variabile di default
  ngDoCheck(): void {
    if (this.previusValFiltro !== this.valFiltro) {
      this.reDoFetchProdottiCheap(this.valFiltro);
      this.previusValFiltro = this.valFiltro;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  private reDoFetchProdottiCheap(valFiltro: string) {
    this.productService
      .getAllProducts()
      .pipe(
        map((resp: IProductResponse) => {
          let prodotti = resp.listaProdotti;

          switch (valFiltro) {
            case 'd':
              prodotti = prodotti.filter((prod) => prod.is_active === 'true');
              break;

            case 'nd':
              prodotti = prodotti.filter((prod) => prod.is_active === 'false');
              break;

            case 'cheap':
              prodotti = prodotti.sort(
                (a, b) => parseInt(a.prezzo) - parseInt(b.prezzo)
              );
              break;

            case 'exp':
              prodotti = prodotti.sort(
                (a, b) => parseInt(b.prezzo) - parseInt(a.prezzo)
              );
              break;

            case 'AZ':
              prodotti = prodotti.sort((a, b) => a.name.localeCompare(b.name));
              break;

            case 'ZA':
              prodotti = prodotti.sort((a, b) => b.name.localeCompare(a.name));
              break;
          }

          return { ...resp, listaProdotti: prodotti };
        })
      )
      .subscribe({
        next: (prodotti: IProductResponse) => {
          this.AllProdottiDB = prodotti;
          console.log('prodotti DAL DB caricati', this.AllProdottiDB);
        },

        error: (err) => {
          console.error(err);
        },
      });
  }

  //metodi
  public getAllProdotti_Mock() {
    return this.AllProdottiMock;
  }

  public getAllProdottiDB(): IProduct[] | null {
    if (Array.isArray(this.AllProdottiDB)) {
      return this.AllProdottiDB;
    } else if (this.AllProdottiDB && 'listaProdotti' in this.AllProdottiDB) {
      return (this.AllProdottiDB as IProductResponse).listaProdotti;
    }
    return null;
  }

  onPageChange(event: any) {
    this.page = event.page + 1;
    this.size = event.rows;
    console.log('Rows per page:', this.size);
  }

  prendiValFiltro(event: any) {
    console.log('sto prendendo val filtro da prodotti', event);
    this.valFiltro = event;
  }

  private subscribeToSubjectService() {
    const subToastContent = this.subjectService.getContentToast().subscribe({
      next: (val: IToastContent) => {
        if (val) {
          console.log('sono qui');
          this.toastService.show(
            'toast',
            val.severity,
            val.summary,
            val.detail
          );
        } else {
          null;
        }
      },
    });

    this.subscriptions.push(subToastContent);
  }
}
