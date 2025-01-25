import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// classe che contiene una serie di subjecr o replysubject ecc da passare all interno dell'applicazione
export class SubjectService {
  public notificationLogout = new BehaviorSubject<string | null>(null);

  public showModaleInsertProdotto = new BehaviorSubject<boolean | null>(null);

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
}
