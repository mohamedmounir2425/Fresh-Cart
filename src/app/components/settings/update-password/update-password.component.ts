import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControlOptions,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ForgetPasswordService } from '../../../services/ForgotPassword.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
// import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.scss',
})
export class UpdatePasswordComponent {
  email: string = '';
  userMsg: string = '';
  fetching: boolean = false;
  step: number = 1;

  constructor(
    private fb: FormBuilder,
    private _ForgetPasswordService: ForgetPasswordService,
    private _ToastrService: ToastrService,
    private router: Router
  ) {}
  emailForm = this.fb.group({
    email: [
      'mohamed.mounir2425@gmail.com',
      [Validators.email, Validators.required],
    ],
  });
  resetCodeForm: FormGroup = this.fb.group({
    resetCode: ['', [Validators.required, Validators.pattern(/^\w{3,}$/)]],
  });
  resetPassword: FormGroup = this.fb.group(
    {
      newPassword: ['', [Validators.required, Validators.pattern(/^\w{6,}$/)]],
      confirmPassword: [''],
    },
    { validators: [this.confirmPassword] } as FormControlOptions
  );

  confirmPassword(group: FormGroup): void {
    const password = group.get('newPassword');
    const confirmPassword = group.get('confirmPassword');
    if (confirmPassword?.value == '') {
      confirmPassword.setErrors({ required: true });
    } else if (password?.value != confirmPassword?.value) {
      confirmPassword?.setErrors({ mismatch: true });
    }
  }

  forgetPassword() {
    const emailVal = this.emailForm.value;

    if (this.emailForm.valid) {
      this.email = emailVal.email || '';
      this.fetching = true;
      this._ForgetPasswordService.forgetPassword(emailVal).subscribe({
        next: (res) => {
          if (res.statusMsg === 'success') {
            this._ToastrService.success(res.message);
            this.step = 2;
          }
          this.fetching = false;
        },
        error: (err) => {
          this._ToastrService.error(err.error.message);
          this.fetching = false;
        },
      });
    }
  }
  resetCode() {
    if (this.resetCodeForm.valid) {
      this.fetching = true;
      this._ForgetPasswordService
        .resetCode(this.resetCodeForm.value)
        .subscribe({
          next: (res) => {
            this._ToastrService.success("Valid: Let's change the password");
            this.step = 3;
            this.fetching = false;
          },
          error: (err) => {
            this._ToastrService.error(err.error.message);
            this.fetching = false;
          },
        });
    }
  }
  newPassword() {
    if (this.resetPassword.valid) {
      this.fetching = true;
      this._ForgetPasswordService

        .resetPassword({
          newPassword: this.resetPassword.value.newPassword,
          email: this.email,
        })
        .subscribe({
          next: (res) => {
            if (res.token) {
              localStorage.setItem('token', res.token);
              this._ToastrService.success('Your password updated successfully');
              this.router.navigate(['/home']);
            }
            this.fetching = false;
          },
          error: (err) => {
            this._ToastrService.error(err.error.message);
            this.fetching = false;
          },
        });
    }
  }
}
