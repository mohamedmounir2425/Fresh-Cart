import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TermTextPipe } from '../../pipes/term-text.pipe';
import { CartService } from '../../services/cart.service';
import { WishListService } from '../../services/wish-list.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [TermTextPipe, RouterModule, CurrencyPipe, ProductComponent],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss',
})
export class WishListComponent {
  constructor(
    private _WishListService: WishListService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  products!: any[];
  wishListData: string[] = [];

  displayUserWishList(): void {
    this._WishListService.getUserWishList().subscribe({
      next: (response: any) => {
        console.log(response);
        this.products = response.data;
        const newData = response.data.map((item: any) => item._id);
        this.wishListData = newData;
      },
    });
  }

  ngOnInit(): void {
    this.displayUserWishList();
    this._WishListService.removeFromWishList().subscribe({
      next: (res) => {
        this.products = this.products.filter(
          (product: any) => product._id !== res
        );
      },
      error: (err) => console.log(err),
    });
    // this._WishListService.favNum.subscribe({

    // })
  }
}
