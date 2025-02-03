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

  public nutritionalData: INutrionalResp[] | undefined;

  public sendData() {
    if (this.query && this.query !== '') {
      this.nutrionalInfoService.requestNutritionalInfo(this.query).subscribe({
        next: (resp: INutrionalResp[]) => {
          this.nutritionalData = resp;
          console.log(this.nutritionalData);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    } else {
      this.notValid = true;
      setTimeout(() => {
        this.notValid = false;
      }, 3000);
    }
  }
}
