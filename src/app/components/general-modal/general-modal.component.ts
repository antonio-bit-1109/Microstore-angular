import { Component, input, Input } from '@angular/core';
import { IRandomQuoteJSON } from '../../models/randomQuote.model';

@Component({
  selector: 'app-general-modal',
  standalone: false,

  templateUrl: './general-modal.component.html',
  styleUrl: './general-modal.component.scss',
})
export class GeneralModalComponent {
  // @Input() public arrQuotes: IRandomQuoteJSON[] | undefined;
  @Input() public visible: boolean = false;
  // @Input() showAds: number | undefined;
  // public getInputFromChild(event: boolean) {
  //   console.log(event);
  //   this.visible = event;
  // }
}
