import { CurrencyPipe } from '@angular/common';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { CuttextPipe } from '../../pipes/cuttext.pipe';
import { RouterModule } from '@angular/router';
import { Category } from '../../Interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../services/cart.service';
import { ProductComponent } from '../product/product.component';
import { WishListService } from '../../services/wish-list.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CurrencyPipe,
    CuttextPipe,
    RouterModule,
    CarouselModule,
    ProductComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products!: any[];
  categories!: Category[];
  cart!: any[];
  wishListData: string[] = [];
  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 300,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 3000,
    items: 1,
    nav: true,
  };
  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 300,
    navText: ['', ''],
    autoplay: true,
    autoplayTimeout: 3000,

    slideBy: 3,

    responsive: {
      0: {
        items: 1,
      },
      300: {
        items: 2,
      },
      500: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };

  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _WishListService: WishListService
  ) {}
  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
    this._ProductsService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {
        console.error(err);
      },
    });
    this._CartService.getCart().subscribe({
      next: (res) => {
        this.cart = res.data.products;
      },
      error: (err) => {
        console.error(err);
      },
    });
    this._CartService.getCartSubject().subscribe({
      next: (res) => {
        this.cart = res;
      },
      error: (err) => {
        console.error(err);
      },
    });
    this._WishListService.getUserWishList().subscribe({
      next: (res) => {
        console.log(res);
        this.wishListData = res.data.map((item: any) => item._id);
      },
      error: (err) => console.log(err),
    });
  }
}
