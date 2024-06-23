import { AuthService } from './../../services/auth.service';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errMsg: string = '';
  fetching: boolean = false;
  constructor(private _AuthService: AuthService, private router: Router) {}
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w{6,}$/),
    ]),
  });

  handleSubmit() {
    if (this.loginForm.valid) {
      this.fetching = true;
      this._AuthService.login(this.loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          if (res.message == 'success') {
            this._AuthService.saveUser();
            this.router.navigate(['/home']);
          }
          this.fetching = false;
        },
        error: (err) => {
          console.log(err);
          this.errMsg = err.error.message;
          this.fetching = false;
        },
      });
    }
  }
}
