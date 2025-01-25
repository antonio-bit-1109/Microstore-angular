import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ILOGIN_SUCC } from '../../models/dataUtente.model';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { ERR_LOGIN } from '../../models/ResponsesServer';
import { Router } from '@angular/router';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  private userService = inject(UserService);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);
  private subjectService = inject(SubjectService);
  private router = inject(Router);
  public keyToast = 'loginToast';

  constructor() {
    // se il token gia è presente in local storage allora redirect alla home
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('home');
    }
  }

  // quando faccio logout salvo in un behavior subject una notifica di avvenuto logout, qui viene catturato quel valore
  // e mostrato in un toast, se ricarico la pagina il subject ritorna null e non mostro niente.
  ngOnInit(): void {
    const message: string | null = this.subjectService.getNotificationLogout();
    if (message) {
      setTimeout(() => {
        this.show('success', 'OK!', message);
      }, 500);
    }
  }

  public onSubmit(form: NgForm) {
    if (form.value['email'] !== '' && form.value['password'] !== '') {
      // const {email , password} = form.value
      this.userService.login(form.value).subscribe({
        next: (resp: ILOGIN_SUCC) => {
          if (resp.token && resp.message) {
            this.show('success', 'Login', resp.message);
            this.authService.saveInStorage(resp.token);
            setTimeout(() => {
              this.router.navigateByUrl('/home');
            }, 2000);
          }
        },
        error: (err: HttpErrorResponse) => {
          const errREsp: ERR_LOGIN = err.error;
          console.log(err);
          if (errREsp['message']) {
            this.show('error', 'Login', errREsp['message']);
          }

          if (errREsp['email']) {
            this.show('error', 'Login', errREsp['email']);
          }
          this.resetForm(form);
        },
      });
    } else {
      this.show('warn', 'inserisci credenziali', 'password o email mancante.');
    }
  }

  show(severity: string, summary: string, content: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: content,
      key: this.keyToast,
      life: 2000,
    });
  }

  public resetForm(form: NgForm) {
    form.reset();
  }
}
