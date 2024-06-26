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

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterModule, CuttextPipe, CurrencyPipe, AddRemoveCartComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnChanges, OnInit {
  @Input() product: any;
  @Input() cart: any[] | undefined;
  cartCount: number = 0;
  isLoading: boolean = false;
  constructor(
    private _CartService: CartService,
    private toastr: ToastrService
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
}
