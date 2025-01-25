import { Component, OnDestroy } from '@angular/core';
import { SubjectService } from '../../../services/subject.service';

@Component({
  selector: 'app-modale',
  standalone: false,

  templateUrl: './modale.component.html',
  styleUrl: './modale.component.scss',
})
export class ModaleComponent implements OnDestroy {
  visible: boolean = false;

  constructor(private subjectService: SubjectService) {
    this.subjectService.showModaleInsertProdotto.subscribe(
      (bool: boolean) => (this.visible = bool)
    );
  }

  ngOnDestroy(): void {
    this.visible = false;
  }
}
