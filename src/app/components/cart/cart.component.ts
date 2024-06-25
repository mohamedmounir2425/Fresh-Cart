import { CurrencyPipe } from '@angular/common';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { AddRemoveCartComponent } from '../add-remove-cart/add-remove-cart.component';
import { ToastrService } from 'ngx-toastr';
import { CartItemComponent } from './cart-item/cart-item.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, AddRemoveCartComponent, CartItemComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cart!: any[];
  constructor(private _CartService: CartService) {}
  ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next: (res) => {
        this.cart = res.data.products;
        console.log(this.cart);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  getCartItems(cart: any[]) {
    this.cart = cart;
  }
  updateCart(cart: any[]) {
    this.cart = cart;
  }
}
