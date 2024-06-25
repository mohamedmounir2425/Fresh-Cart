import { CurrencyPipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { AddRemoveCartComponent } from '../../add-remove-cart/add-remove-cart.component';
import { CartService } from '../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CurrencyPipe, AddRemoveCartComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input() item: any;
  @Output() cart: EventEmitter<any[]> = new EventEmitter<any[]>();

  isLoading: boolean = false;
  constructor(
    private _CartService: CartService,
    private toastr: ToastrService,
    private _Renderer2: Renderer2
  ) {}
  removeCartItem(id: string, btnRef: HTMLButtonElement) {
    this.isLoading = true;
    this._Renderer2.setAttribute(btnRef, 'disabled', 'true');
    this._CartService.removeProduct(id).subscribe({
      next: ({ data }) => {
        this.cart.emit(data.products);
        this.cart.emit(data.products);
        this.isLoading = false;
        this.toastr.success('deleted successfully', undefined, {
          timeOut: 3000,
        });
        this._Renderer2.removeAttribute(btnRef, 'disabled');
      },
      error: (err) => {
        console.error(err);
        this._Renderer2.removeAttribute(btnRef, 'disabled');
        this.isLoading = false;
      },
    });
  }
  updateCart(cart: any[]) {
    this.cart.emit(cart);
  }
}
