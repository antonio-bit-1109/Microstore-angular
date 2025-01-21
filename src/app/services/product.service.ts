import { Injectable } from '@angular/core';
import { PRODOTTI } from '../mocks/products.mock';
import {
  IProduct,
  IProductResponse,
  ISingleProduct,
} from '../models/product.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private GET = 'http://localhost:8081/product';
  constructor(private http: HttpClient) {}

  //metodi di chiamata API REST

  //finti tramite mock
  //tutti i prodotti
  getAllProducts_mock(): Observable<IProduct[]> {
    return of(PRODOTTI);
  }

  // singolo prodotto
  getProduct_mock(idProd: number): Observable<IProduct> {
    const prodotto = PRODOTTI.find((prodotto) => prodotto.id === idProd);
    return of(prodotto);
  }

  // reali all API REST
  // tutti prodotti
  getAllProducts(): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${this.GET}/get-all`);
  }

  // singolo prodotto
  getSingleProductDB(id: string): Observable<ISingleProduct> {
    return this.http.get<ISingleProduct>(`${this.GET}/get/${id}`);
  }
}
