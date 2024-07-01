import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';
import { CuttextPipe } from '../../pipes/cuttext.pipe';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AddRemoveCartComponent } from '../add-remove-cart/add-remove-cart.component';
import { WishListService } from '../../services/wish-list.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule, CuttextPipe, CurrencyPipe, AddRemoveCartComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnChanges, OnInit {
  @Input() product: any;
  @Input() wishListData: string[] = [];
  @Input() cart: any[] | undefined;
  cartCount: number = 0;
  isLoading: boolean = false;
  isFavLoading: boolean = false;

  constructor(
    private _CartService: CartService,
    private toastr: ToastrService,
    private _WishListService: WishListService
  ) {}
  ngOnInit(): void {
    this._CartService.getCartItemIdRemoved().subscribe({
      next: (res) => {
        if (this.product.id == res) this.cartCount = 0;
      },
      error: (err) => console.log(err),
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cart']) {
      this.updateCartCount();
    }
  }

  updateCartCount(): void {
    if (this.cart) {
      const cartItem = this.cart.find(
        (p: any) => p.product.id === this.product._id
      );

      this.cartCount = cartItem ? cartItem.count : 0;
    }
  }

  addToCart(productId: string) {
    this.isLoading = true;
    this._CartService.addToCart(productId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this._CartService.updateCartCount(res.numOfCartItems);
          this.cartCount = res.data.products.find(
            (p: any) => p.product === this.product._id
          ).count;
        }
        this.isLoading = false;
        this.toastr.success(res.message, undefined, {
          timeOut: 3000,
        });
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  addToWishList(productId: string) {
    this.isFavLoading = true;
    this._WishListService.addToWishList(productId).subscribe({
      next: (response: any) => {
        this.isFavLoading = false;
        this.toastr.success(response.message, response.status);
        this._WishListService.favNum.next(response.data.length);
        this.wishListData = response.data;
        this._WishListService.updateWishListData(productId);
      },
      error: (err) => {
        console.log(err);
        this.isFavLoading = false;
      },
    });
  }
  removeFav(productId: string) {
    this.isFavLoading = true;
    this._WishListService.removeWishList(productId).subscribe({
      next: (response) => {
        this.toastr.error(response.message, response.status);
        this._WishListService.favNum.next(response.data.length);
        this.wishListData = response.data;
        this.isFavLoading = false;
        this._WishListService.updateWishListData(productId);
      },
      error: (err) => {
        console.log(err);
        this.isFavLoading = false;
      },
    });
  }
}
