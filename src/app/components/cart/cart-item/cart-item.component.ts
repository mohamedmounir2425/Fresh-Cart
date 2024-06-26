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
  // @Output() cart: EventEmitter<any[]> = new EventEmitter<any[]>();

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
      next: (res) => {
        this._CartService.updateCartCount(res.numOfCartItems);
        this._CartService.updateCart(res.data.products || []);
        this.isLoading = false;
        this._Renderer2.removeAttribute(btnRef, 'disabled');
        this.toastr.success('deleted successfully', undefined, {
          timeOut: 3000,
        });
      },
      error: (err) => {
        console.error(err);
        this._Renderer2.removeAttribute(btnRef, 'disabled');
        this.isLoading = false;
      },
    });
  }
}
