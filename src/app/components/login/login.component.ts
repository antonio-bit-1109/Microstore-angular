import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ILOGIN_SUCC } from '../../models/dataUtente.model';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { ERR_LOGIN } from '../../models/ResponsesServer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService],
})
export class LoginComponent {
  private userService = inject(UserService);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);
  private router = inject(Router);
  public keyToast = 'loginToast';
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
