import { Component } from '@angular/core';
import { NutritionInfoService } from '../../services/nutrition-info.service';
import { FormGroup } from '@angular/forms';
import { INutrionalResp } from '../../models/nutritionalInfo.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-contatore-kcal',
  standalone: false,

  templateUrl: './contatore-kcal.component.html',
  styleUrl: './contatore-kcal.component.scss',
})
export class ContatoreKcalComponent {
  constructor(private nutrionalInfoService: NutritionInfoService) {}

  public query: string = '';
  public notValid = false;
  public notFound = false;

  public nutritionalData: INutrionalResp[] | undefined;

  public sendData() {
    if (this.query && this.query !== '') {
      this.nutrionalInfoService.requestNutritionalInfo(this.query).subscribe({
        next: (resp: INutrionalResp[]) => {
          if (!resp.length) {
            this.showNotFound();
            return;
          }

          this.nutritionalData = resp;
          console.log(this.nutritionalData);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    } else {
      this.showError();
    }
  }

  public showError() {
    this.notValid = true;
    setTimeout(() => {
      this.notValid = false;
    }, 3000);
  }

  public showNotFound() {
    this.notFound = true;
    setTimeout(() => {
      this.notFound = false;
    }, 3000);
  }
}
