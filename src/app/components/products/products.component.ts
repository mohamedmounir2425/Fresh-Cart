import { Component, OnInit } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { WishListService } from '../../services/wish-list.service';
import { Category } from '../../Interfaces/category';
import { LoadingProductsComponent } from './loading-products/loading-products.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductComponent, LoadingProductsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  products!: any[];
  wishListData: string[] = [];
  cart!: any[];
  isLoading: boolean = false;
  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _WishListService: WishListService
  ) {}
  ngOnInit(): void {
    this.fetchProducts();
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
  fetchProducts() {
    this.isLoading = true;
    this._ProductsService.getProducts().subscribe({
      next: (res) => {
        this.products = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }
}
