import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IToastContent } from '../models/toastContent.model';
import { IRandomQuoteJSON } from '../models/randomQuote.model';

@Injectable({
  providedIn: 'root',
})
// classe che contiene una serie di subjecr o replysubject ecc da passare all interno dell'applicazione
export class SubjectService {
  public notificationLogout = new BehaviorSubject<string | null>(null);

  public showModaleInsertProdotto = new BehaviorSubject<boolean | null>(null);

  public ToastProdottoInserito = new BehaviorSubject<IToastContent | null>(
    null
  );

  public ToastAddStockProdotto = new BehaviorSubject<string | null>(null);

  public subjectArrQuotes = new BehaviorSubject<null | IRandomQuoteJSON[]>(
    null
  );

  constructor() {}

  // metodi per maneggiare notificationLogout -- INIZIO
  public fillNotificationLogout(message: string) {
    this.notificationLogout.next(message);
  }

  public getNotificationLogout() {
    return this.notificationLogout.getValue();
  }

  public emptyNotificationLogout() {
    this.notificationLogout.next(null);
  }

  // metodi per maneggiare notificationLogout -- FINE

  // metodi per maneggiare showModaleInsertProdotto -- INIZIO

  public ShowModale() {
    this.showModaleInsertProdotto.next(true);
  }

  public unShowModale() {
    this.showModaleInsertProdotto.next(false);
  }

  // metodi per maneggiare showModaleInsertProdotto -- INIZIO

  public fillToastProdottoInserito(toastdata: IToastContent | null) {
    this.ToastProdottoInserito.next(toastdata);
  }

  public getContentToast() {
    return this.ToastProdottoInserito.asObservable();
  }
  // subject per gestire toast di successo e fallimento inserimento nuovo prodotto -- FINE

  // BEHAVIOUR SUBJECT PER MOSTRARE IL TOAST CON ESITO AGGIUNTA STOCK PRODOTTO -- INIZIO

  public fillToastAddStockProdotto(message: string) {
    this.ToastAddStockProdotto.next(message);
  }

  public getToastAddStock() {
    return this.ToastAddStockProdotto.asObservable();
  }

  public fillRandomArrQuotes(arrQuotes: IRandomQuoteJSON[]) {
    this.subjectArrQuotes.next(arrQuotes);
  }

  public getArrQuotesObservable() {
    return this.subjectArrQuotes.asObservable();
  }
}
