import { CartService } from './../../services/cart.service';
import { CommonModule } from '@angular/common';
import { AuthService } from './../../services/auth.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WishListService } from '../../services/wish-list.service';

@Component({
  selector: 'app-navbar-blank',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar-blank.component.html',
  styleUrl: './navbar-blank.component.scss',
})
export class NavbarBlankComponent implements OnInit {
  cartCount: number = 0;
  favCount: number = 0;

  constructor(
    private _AuthService: AuthService,
    private _CartService: CartService,
    private _WishListService: WishListService
  ) {}
  ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next: (res) => {
        this.cartCount = res.numOfCartItems;
      },
      error: (err) => console.log(err),
    });
    this._WishListService.getUserWishList().subscribe({
      next: (res) => {
        console.log(res);
        this.favCount = res.count;
      },
      error: (err) => console.log(err),
    });
    this._WishListService.favNum.subscribe({
      next: (res) => {
        this.favCount = res;
      },
      error: (err) => console.log(err),
    });
    this._CartService.cartCount.subscribe({
      next: (res) => {
        this.cartCount = res;
      },
      error: (err) => console.log(err),
    });
  }
  signOut() {
    this._AuthService.signOut();
  }
}
