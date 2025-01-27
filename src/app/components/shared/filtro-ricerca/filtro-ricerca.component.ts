import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { SubjectService } from '../../../services/subject.service';

interface IOption {
  [key: string]: string | null;
}

@Component({
  selector: 'app-filtro-ricerca',
  standalone: false,

  templateUrl: './filtro-ricerca.component.html',
  styleUrl: './filtro-ricerca.component.scss',
})
export class FiltroRicercaComponent {
  valoreFiltro: undefined | string;
  @Output() EmettiValFiltro = new EventEmitter();
  public options = [
    { '': null },
    { disponibile: 'd' },
    { 'non disponibile': 'nd' },
    { 'prezzo più basso': 'cheap' },
    { 'prezzo più alto': 'exp' },
    { 'ordine alfabetico A-Z': 'AZ' },
    { 'ordine alfabetico Z-A': 'ZA' },
  ];

  //const
  constructor(
    private authService: AuthService,
    private subjectService: SubjectService
  ) {}

  public controllaFiltroSceltoEdEmetti(valFiltro: string) {
    this.emitValueFiltro(valFiltro);
  }

  getKey(object: IOption) {
    return Object.keys(object)[0];
  }

  getValue(object: IOption) {
    if (Object.values(object)[1] !== null) {
      return Object.values(object)[0];
    }

    return null;
  }

  emitValueFiltro(valFiltro: string) {
    console.log(valFiltro, ' <---- filtro scelto');
    this.EmettiValFiltro.emit(valFiltro);
  }

  public isAdmin() {
    return this.authService.isLoggedInAndAdmin();
  }

  public showModale() {
    this.subjectService.ShowModale();
  }
}
