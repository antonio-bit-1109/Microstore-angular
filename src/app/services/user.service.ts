import { inject, Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { IDataRegistrazioneUtente } from '../models/dataRegistrazioneUtente.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  constructor() {}

  // replaySubject che verrà popolato al momento della registrazione e questi dati sono disponibili
  // alla classe che la sottoscrive
  //prettier-ignore
  // public DataRegistrazioneUtente = new ReplaySubject<IDataRegistrazioneUtente>();

  // registrazione utente
  registerUSer(dataUser:IDataRegistrazioneUtente){
   return this.http.post(environment.LOCAL_HOST + environment.URL_REGISTER_USER , dataUser)
  }
}
