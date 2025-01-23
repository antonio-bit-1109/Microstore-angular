import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormGroup, NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ILOGIN_SUCC } from '../../models/dataUtente.model';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private userService = inject(UserService);

  public onSubmit(form: NgForm) {
    if (form.value['email'] !== '' && form.value['password'] !== '') {
      // const {email , password} = form.value
      this.userService.login(form.value).subscribe({
        next: (resp: ILOGIN_SUCC) => {
          if (resp.token && resp.message) {
            console.log(Token);
            console.log(resp.message);
          }
        },
        error: (err: HttpErrorResponse) => {},
      });
    }
  }
}
