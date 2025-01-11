import { Component, inject, OnInit } from '@angular/core';
import { IProduct } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-prodotti',
  standalone: false,

  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.scss',
})
export class ProdottiComponent implements OnInit {
  private AllProdottiMock: IProduct[] | undefined;

  // INIETTARE IL SERVIZIO NELLA CLASSE
  // 1- costruttore utilizzato solo per iniettare dipendenze
  // 2- oppure utilizzando il metodo inject
  // private productService = inject(ProductService);
  constructor(private productService: ProductService) {}

  // utilizzo i cicli di vita del componente per logiche più complesse come
  //
  ngOnInit(): void {
    this.productService.getAllProducts_mock().subscribe({
      next: (prodotti: IProduct[]) => {
        this.AllProdottiMock = prodotti;
        console.log('prodotti Mock caricati', this.AllProdottiMock);
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
}
