import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { jwtDecode } from 'jwt-decode';
import { TermTextPipe } from '../../pipes/term-text.pipe';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [CurrencyPipe, TermTextPipe, DatePipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss',
})
export class AllOrdersComponent implements OnInit {
  constructor(private _CartService: CartService) {}
  ngOnInit(): void {
    this.getAllOrders();
  }

  allProducts: any;
  productDetails: any;
  userId: string = '';
  decodeToken() {
    if (localStorage.getItem('token') != null) {
      let encodeToken: any = localStorage.getItem('token');
      let decodeToken = jwtDecode(encodeToken);
      let userData: any = decodeToken;
      this.userId = userData.id;
    }
  }

  getAllOrders() {
    this.decodeToken();
    this._CartService.getAllOrder(this.userId).subscribe({
      next: (response) => {
        this.allProducts = response;
      },
    });
  }
}
