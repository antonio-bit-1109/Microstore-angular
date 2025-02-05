import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  show(toastKey: string, severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 2000,
      key: toastKey,
    });
  }
}
