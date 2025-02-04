import { Component, HostListener, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IProduct,
  IProductResponse,
  ISingleProduct,
} from '../../../models/product.model';
// import { PreviousRouteService } from '../../../services/previous-route.service';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';
import { SubjectService } from '../../../services/subject.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  providers: [MessageService],
})
export class DettaglioProdottoComponent implements OnInit {
  private ProductService = inject(ProductService);
  private activatedRoute = inject(ActivatedRoute);

  public prodotto: IProduct | undefined;
  public routeFrom: string | null = null;
  Modalvisible: boolean = false;
  public windowWidth: number | undefined;
  public visibilityModalDelete: boolean | undefined;

  constructor(
    // private previousRouteService: PreviousRouteService,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private subjectService: SubjectService
  ) {
    this.windowWidth = window.innerWidth;
  }

  //
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.windowWidth = window.innerWidth;
    this.TestoNonVisible();
    console.log('Larghezza finestra aggiornata:', this.windowWidth);
  }

  ngOnInit(): void {
    this.getDetailProdottoDB();

    // prendo dall url la stringa che mi dice da dove sto provenendo per accedere al componente dettaglioProdotto
    // stringa 'fromHome' o 'fromProduct' nell URL

    const provenienza = this.activatedRoute.snapshot.paramMap.get('from');
    this.routeFrom = provenienza;
    this.getMsgForToast();

    this.subjectService.$GetReloadProdotto().subscribe({
      next: (boolVal: boolean | null) => {
        if (boolVal) {
          this.getDetailProdottoDB();
        } else {
          null;
        }
      },
    });
  }

  public getMsgForToast() {
    this.subjectService.getToastAddStock().subscribe({
      next: (msg) => {
        if (msg) {
          this.show('info', 'aggiunta scorte', msg);
          // se arriva il messaggio che lo stock è stato aggiornato richiamo l'endpoint per ottenere i dati del prodotto aggiornato.
          this.getDetailProdottoDB();
        }
      },
    });
  }

  public goBack() {
    switch (this.routeFrom.toLowerCase()) {
      case 'fromhome':
        this.router.navigateByUrl('home');
        break;

      case 'fromproduct':
        this.router.navigateByUrl('/home/prodotti');
        break;
    }
  }

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

  closeModalAddStock(event) {
    this.Modalvisible = event;
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

  public isAdmin() {
    return this.authService.isLoggedInAndAdmin();
  }

  showModale() {
    this.Modalvisible = true;
  }

  show(severity: string, summary: string, content: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: content,
      key: 'toastAddStock',
      life: 2000,
    });
  }

  public TestoNonVisible() {
    if (this.windowWidth <= 767) {
      console.log('sto dentro la funzione ');
      return true;
    }
    return false;
  }

  public showModalDelete() {
    this.visibilityModalDelete = true;
  }

  public getIdProdotto() {
    return this.prodotto ? this.prodotto.id : null;
  }

  public getNomeProdotto() {
    return this.prodotto ? this.prodotto.name : null;
  }

  public getVisibilityModalDelete(event) {
    this.visibilityModalDelete = event;
  }

  public setProdottoAsAgainDisponibile() {
    this.ProductService.resetProductToDisponibile(this.prodotto.id).subscribe({
      next: (esito) => {
        console.log(
          'reimpostazione prodotto ad attivo effettuata con successo'
        );
        this.subjectService.DoIReloadProdotto(true);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.error);
      },
    });
  }
}
