import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SubjectService } from '../../services/subject.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-cancella-prodotto-soft',
  standalone: false,

  templateUrl: './cancella-prodotto-soft.component.html',
  styleUrl: './cancella-prodotto-soft.component.scss',
})
export class CancellaProdottoComponent {
  @Input() idProdotto: number | undefined;
  @Input() nomeProdotto: string | undefined;
  @Output() chiudiModaleDelete = new EventEmitter();

  constructor(
    private productService: ProductService,
    private subjectService: SubjectService
  ) {}

  public onSubmit() {
    console.log(this.idProdotto, 'id prodotto da eliminare');
    if (this.idProdotto) {
      // invia richiesta soft cancellazione prodotto
      this.productService.SoftdeleteProdotto(this.idProdotto).subscribe({
        next: (val) => {
          console.log(val);
          this.emitChiudiModale();
          // se la cancellazione va a buon fine devo trovare il modo di notifcare al componente di rieffettuare la fetch per uno specifico prodotto per mostrare i cambiamenti all utente
          this.subjectService.DoIReloadProdotto(true);

          // una volta che la soft delete va a buon fine notifico un service che mi comunica al toast presente in dettaglio prodotto di mostrare un toast con specifiche stringhe di dati
          this.subjectService.fillToastSoftDelete({
            severity: 'success',
            summary: 'disponibilità prodotto',
            life: 3000,
            key: 'toast',
            detail:
              'impostazione prodotto come non disponibile effettuata con successo',
          });
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error);
          this.emitChiudiModale();
        },
      });
    } else {
      console.error('id prodotto non definito');
    }
  }

  public emitChiudiModale() {
    this.chiudiModaleDelete.emit(false);
  }
}
