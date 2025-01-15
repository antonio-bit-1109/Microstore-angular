import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NutritionInfoService {
  private http = inject(HttpClient);

  constructor() {}

  // post per chiedere valori nutrizionali di un cibo preso da input dall html
  requestNutritionalInfo() {
    const headers = new HttpHeaders({
      'X-Api-Key': environment.NinjasApiKey,
    });
  }
}
