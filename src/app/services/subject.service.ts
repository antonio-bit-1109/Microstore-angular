import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// classe che contiene una serie di subjecr o replysubject ecc da passare all interno dell'applicazione
export class SubjectService {
  public notificationLogout = new BehaviorSubject<string | null>(null);

  constructor() {}

  public fillNotificationLogout(message: string) {
    this.notificationLogout.next(message);
  }

  public getNotificationLogout() {
    return this.notificationLogout.getValue();
  }

  public emptyNotificationLogout() {
    this.notificationLogout.next(null);
  }
}
