import { Component, inject, OnInit } from '@angular/core';
import { IProduct, IProductResponse } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-prodotti',
  standalone: false,

  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.scss',
})
export class ProdottiComponent implements OnInit {
  private AllProdottiMock: IProduct[] | undefined;
  private AllProdottiDB: IProductResponse | undefined;

  public primo: number = 0; //Indice del primo elemento della pagina corrente.
  public size: number = 6; //Numero di elementi per pagina.

  // INIETTARE IL SERVIZIO NELLA CLASSE
  // 1- costruttore utilizzato solo per iniettare dipendenze
  // 2- oppure utilizzando il metodo inject
  // private productService = inject(ProductService);
  constructor(private productService: ProductService) {}

  // utilizzo i cicli di vita del componente per logiche più complesse come
  //
  ngOnInit(): void {
    // carica nella prop i prodotti mockati
    this.productService.getAllProducts_mock().subscribe({
      next: (prodotti: IProduct[]) => {
        this.AllProdottiMock = prodotti;
        console.log('prodotti Mock caricati', this.AllProdottiMock);
      },

      error: (err) => {
        console.error(err);
      },
    });

    // carica nella prop i prodotti provenienti dall API
    this.productService.getAllProducts().subscribe({
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

  public getAllProdottiDB() {
    if (this.AllProdottiDB) {
      return this.AllProdottiDB.listaProdotti;
    }
    return null;
  }

  onPageChange(event) {
    console.log(event, 'evento al cambio pagina del navigator');
    this.primo = event.first;
    this.size = event.rows;
  }
}
