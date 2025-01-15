import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registrazione',
  standalone: false,

  templateUrl: './registrazione.component.html',
  styleUrl: './registrazione.component.scss',
})
export class RegistrazioneComponent {
  public phoneContainsLetters: boolean = false;

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/), // Checks that a password has a minimum of 6 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces.
    ]),
    confermaPassword: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/), // controlla che il valore sia lungo esattamente 10 caratteri
    ]),
  });

  constructor(private userService: UserService, private router: Router) {}

  public onSubmit() {
    if (this.form.valid) {
      const dataRegistrationToShow = {
        name: this.form.controls.name.value,
        email: this.form.controls.email.value,
        phone: this.form.controls.phone.value,
      };

      // inserisco i dati presi dal form dentro al replySUbject presente nel servizio.
      this.userService.DataRegistrazioneUtente.next(dataRegistrationToShow);
      // tramite routing faccio unredirect verso il componente home.
      this.router.navigateByUrl('home');
    } else {
      console.error('i dati del form non sono tutti validi.');
    }
  }

  public CanButtonBeClickable(form: FormGroup) {
    return form.valid;
  }

  public isConfermaPswUgualePsw() {
    const psw = this.form.get('password').value;
    const confermaPsw = this.form.get('confermaPassword').value;

    console.log(psw, 'password');
    console.log(confermaPsw, 'conferma password');

    if (psw === confermaPsw) {
      return true;
    }
    return false;
  }
}
