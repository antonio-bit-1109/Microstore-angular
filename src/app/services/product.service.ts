import { Injectable } from '@angular/core';
import { PRODOTTI } from '../mocks/products.mock';
import {
  IPostProduct,
  IProduct,
  IProductResponse,
  ISingleProduct,
} from '../models/product.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GENERAL_SUCCESS_MESSAGE } from '../models/ResponsesServer';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
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
    return this.http.get<IProductResponse>(
      `${environment.LOCAL_HOST}/product/get-all`
    );
  }

  // singolo prodotto
  getSingleProductDB(id: string): Observable<ISingleProduct> {
    return this.http.get<ISingleProduct>(
      `${environment.LOCAL_HOST}/product/get/${id}`
    );
  }

  // create new product
  createProduct(prodotto: IPostProduct) {
    return this.http.post<GENERAL_SUCCESS_MESSAGE>(
      `${environment.LOCAL_HOST}/product/insert`,
      prodotto
    );
  }
}
