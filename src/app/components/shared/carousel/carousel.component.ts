import { Component } from '@angular/core';
import { IImage } from '../../../models/images.model';

@Component({
  selector: 'app-carousel',
  standalone: false,

  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  private percorso = '../../assets/images/';

  private images: IImage[] = [
    { id: 1, subject: 'cane', desc: 'sono un bel cane' },
    { id: 2, subject: 'canotto', desc: 'sono un bel canotto pasciuto' },
    { id: 3, subject: 'biscotto', desc: 'un biscotto fragrante' },
  ];

  public getPercorso(nome: string) {
    return `${this.percorso}${nome}.jpg`;
  }

  public getImages() {
    return this.images;
  }

  public getDesc(image: IImage) {
    return image.desc;
  }

  public getSubject(image: IImage) {
    return image.subject;
  }
}
