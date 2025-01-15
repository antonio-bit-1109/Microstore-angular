import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { IDataRegistrazioneUtente } from '../models/dataRegistrazioneUtente.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  // replaySubject che verrà popolato al momento della registrazione e questi dati sono disponibili
  // alla classe che la sottoscrive
  //prettier-ignore
  public DataRegistrazioneUtente = new ReplaySubject<IDataRegistrazioneUtente>();
}
