import { AuthService } from './../../services/auth.service';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormControlOptions,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  errMsg: string = '';
  fetching: boolean = false;
  constructor(private _AuthService: AuthService, private router: Router) {}
  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w{6,}$/),
      ]),
      rePassword: new FormControl(''),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125]\d{8}$/),
      ]),
    },
    { validators: [this.confirmPassword] } as FormControlOptions
  );

  confirmPassword(group: FormGroup): void {
    const password = group.get('password');
    const rePassword = group.get('rePassword');
    if (rePassword?.value == '') {
      rePassword.setErrors({ required: true });
    } else if (password?.value != rePassword?.value) {
      rePassword?.setErrors({ mismatch: true });
    }
  }

  handleSubmit() {
    if (this.registerForm.valid) {
      this.fetching = true;
      this._AuthService.register(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.message == 'success') {
            this.router.navigate(['/login']);
            this.fetching = false;
          }
        },
        error: (err) => {
          this.errMsg = err.error.message;
          this.fetching = false;
        },
      });
      // console.log(this.registerForm.value);
    }
  }
}
