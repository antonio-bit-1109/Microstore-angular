import {
  Component,
  OnInit,
  AfterViewInit,
  viewChild,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { RandomQuotesService } from '../../services/random-quotes.service';
import { IRandomQuoteJSON } from '../../models/randomQuote.model';
import { UserService } from '../../services/user.service';
import { IDataRegistrazioneUtente } from '../../models/dataRegistrazioneUtente.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home-container',
  standalone: false,

  templateUrl: './home-container.component.html',
  styleUrl: './home-container.component.scss',
})
export class HomeContainerComponent implements OnInit {
  public Quote1: IRandomQuoteJSON[] | undefined;
  public dataRegistrazioneUser: IDataRegistrazioneUtente | null = null;
  @ViewChild('registrationModal') ModalDomElement: ElementRef | undefined;
  // inietto product service nella classe
  constructor(
    private randomQuoteService: RandomQuotesService,
    private userService: UserService,
    private ngbModal: NgbModal
  ) {}

  // dopo il costruttore
  // dopo la creazione del componente sul DOM.
  ngOnInit(): void {
    this.randomQuoteService.getRandomQuote().subscribe({
      next: (data: IRandomQuoteJSON[]) => {
        this.Quote1 = data;
        console.log('quotes random fetchate con successo', this.Quote1);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  // dopo che il template (html) del componente e dei suoi figlio è stato renderizzato dal browser.
  // richiamo il servizio user pre prendre dati dal subject(in questo caso dal ReplaySubject)
  // ngAfterViewInit(): void {
  //   this.userService.DataRegistrazioneUtente.subscribe((dataRegistraz_User) => {
  //     this.dataRegistrazioneUser = dataRegistraz_User;
  //   });

  //   if (this.dataRegistrazioneUser !== null) {
  //     this.openModal(this.ModalDomElement);
  //   }
  // }

  // metodo per aprire il modal.
  // il content corrisponde al modale che voglio prendere in considerazione , cioè al suo nome
  //questo nome lo trovo all inizio del modale dopo '#' <ng-template #registrationModal let-modal>
  // public openModal(content: any) {
  //   this.ngbModal
  //     .open(content, {
  //       centered: true,
  //       ariaLabelledBy: 'apertura modale con dati registrazione',
  //       size: 'md',
  //       role: 'alertdialog',
  //     })
  //     .result.then((res) => {
  //       // chiamato quando il modale viene chiuso con successo. (ovverro alla chiamata di modal.close())
  //       console.log('modale chiuso con successo' + res);
  //       this.userService.DataRegistrazioneUtente.next(null);
  //     })
  //     .catch((err) => {
  //       // chiamato in caso il modale venga chiuso chiamato modal.dismiss()
  //       console.error('errore durante la chiusura del modale.' + err);
  //       this.userService.DataRegistrazioneUtente.next(null);
  //     });
  // }
}
