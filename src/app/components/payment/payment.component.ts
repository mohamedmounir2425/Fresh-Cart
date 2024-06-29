import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  errMsg: string = '';
  fetching: boolean = false;
  cartId!: string;
  constructor(
    private router: Router,
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService
  ) {}
  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe({
      next: (res) => {
        this.cartId = res['cartId'];
      },

      error: (err) => console.log(err),
    });
  }
  paymentForm: FormGroup = new FormGroup({
    details: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(60),
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),

    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125]\d{8}$/),
    ]),
  });

  handleSubmit() {
    if (this.paymentForm.valid) {
      this.fetching = true;
      console.log(this.paymentForm.value);
      console.log(this.cartId);
      const cartDetails = this.paymentForm.value;

      this._CartService.checkout(this.cartId, cartDetails).subscribe({
        next: (res) => {
          if (res.status == 'success') {
            console.log(res);
            this.fetching = false;
            window.open(res.session.url);
          }
        },
        error: (err) => {
          console.log(err);
          this.fetching = false;
        },
      });
    }
  }
}
