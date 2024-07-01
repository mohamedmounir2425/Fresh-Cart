import { CurrencyPipe } from '@angular/common';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { AddRemoveCartComponent } from '../add-remove-cart/add-remove-cart.component';
import { ToastrService } from 'ngx-toastr';
import { CartItemComponent } from './cart-item/cart-item.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CurrencyPipe,
    AddRemoveCartComponent,
    CartItemComponent,
    RouterModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cart: any[] = [];
  cartId!: string;
  constructor(private _CartService: CartService) {}
  ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next: (res) => {
        this.cart = res.data.products;
        this.cartId = res.data._id;
      },
      error: (err) => {
        console.error(err);
      },
    });
    this._CartService.getCartSubject().subscribe({
      next: (res) => (this.cart = res),
      error: (err) => console.log(err),
    });
  }
}
