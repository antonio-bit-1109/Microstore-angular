import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { IDataRegistrazioneUtente } from '../../models/dataRegistrazioneUtente.model';
import {
  ERR_REGISTRATION,
  RESP_REGISTER_POSITIVE,
} from '../../models/ResponsesServer';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registrazione',
  standalone: false,

  templateUrl: './registrazione.component.html',
  styleUrl: './registrazione.component.scss',
  providers: [MessageService],
})
export class RegistrazioneComponent {
  public phoneContainsLetters: boolean = false;
  public keyToast = 'registerToast';

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/
      ), // Checks that a password has a minimum of 6 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character with no spaces.
    ]),
    confermaPassword: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/), // controlla che il valore sia lungo esattamente 10 caratteri
    ]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) {}

  public onSubmit() {
    if (this.form.valid) {
      const dataUser: IDataRegistrazioneUtente = {
        name: this.form.controls.name.value,
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
        phone: this.form.controls.phone.value,
      };

      this.registerUser(dataUser);
      // inserisco i dati presi dal form dentro al replySUbject presente nel servizio.
      // this.userService.DataRegistrazioneUtente.next(dataRegistrationToShow);
      // tramite routing faccio unredirect verso il componente home.
      //  this.router.navigateByUrl('home');
    } else {
      console.error('i dati del form non sono tutti validi.');
    }
  }
  private registerUser(dataUser) {
    this.userService.registerUSer(dataUser).subscribe({
      next: (resp: RESP_REGISTER_POSITIVE) => {
        this.show('success', 'Ok!', resp.message);
        this.resetForm();
        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 2000);
      },
      error: (err: HttpErrorResponse) => {
        const serverErr: ERR_REGISTRATION = err.error;

        if (serverErr.message) {
          this.show(
            'error',
            'Errore!',
            `${serverErr.message.slice(0, 70)} ...`
          );
        }
        this.resetForm();
      },
    });
  }

  public CanButtonBeClickable(form: FormGroup) {
    return form.valid;
  }

  public isConfermaPswUgualePsw() {
    const psw = this.form.get('password').value;
    const confermaPsw = this.form.get('confermaPassword').value;

    if (psw === confermaPsw) {
      return true;
    }
    return false;
  }

  // show del modale
  show(severity: string, summary: string, content: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: content,
      key: this.keyToast,
      life: 2000,
    });
  }

  private resetForm() {
    this.form.reset();
  }
}
