import { CartService } from './../../services/cart.service';
import { CommonModule } from '@angular/common';
import { AuthService } from './../../services/auth.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar-blank',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar-blank.component.html',
  styleUrl: './navbar-blank.component.scss',
})
export class NavbarBlankComponent implements OnInit {
  scrolled: boolean = false;
  cartCount: number = 0;
  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrolled = window.scrollY > 0;
  }
  constructor(
    private _AuthService: AuthService,
    private _CartService: CartService
  ) {}
  ngOnInit(): void {
    this._CartService.getCart().subscribe({
      next: (res) => {
        this.cartCount = res.numOfCartItems;
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
