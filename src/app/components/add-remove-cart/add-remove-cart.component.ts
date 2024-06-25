import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-add-remove-cart',
  standalone: true,
  imports: [],
  templateUrl: './add-remove-cart.component.html',
  styleUrl: './add-remove-cart.component.scss',
})
export class AddRemoveCartComponent {
  isLoading: boolean = false;
  @Input() id!: string;
  @Input() count!: number;
  @Output() products: EventEmitter<any[]> = new EventEmitter<any[]>();
  constructor(
    private _CartService: CartService,
    private _Renderer2: Renderer2
  ) {}

  changeCount(
    type: string,
    count: number,
    el1: HTMLButtonElement,
    el2: HTMLButtonElement
  ) {
    this.isLoading = true;
    this._Renderer2.setAttribute(el1, 'disabled', 'true');
    this._Renderer2.setAttribute(el2, 'disabled', 'true');

    if (type === 'minus' && count < 1) {
      this._CartService.removeProduct(this.id).subscribe({
        next: ({ data }) => {
          this.products.emit(data.products);
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        },
      });

      return;
    }
    this._CartService.changeCount(this.id, `${count}`).subscribe({
      next: ({ data }) => {
        const cartItem = data.products.find(
          (p: any) => p.product.id === this.id
        );

        this.count = cartItem ? cartItem.count : this.count;
        this._Renderer2.removeAttribute(el1, 'disabled');
        this._Renderer2.removeAttribute(el2, 'disabled');
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this._Renderer2.removeAttribute(el1, 'disabled');
        this._Renderer2.removeAttribute(el2, 'disabled');
        this.isLoading = false;
      },
    });
  }
}
