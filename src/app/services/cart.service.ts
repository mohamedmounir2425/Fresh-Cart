import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartSubject: Subject<any[]> = new Subject<any[]>();
  cartItemId: Subject<string> = new Subject<string>();
  constructor(private _HttpClient: HttpClient) {}

  addToCart(productId: string): Observable<any> {
    return this._HttpClient.post(`${environment.apiURL}/api/v1/cart`, {
      productId,
    });
  }
  getCart(): Observable<any> {
    return this._HttpClient.get(`${environment.apiURL}/api/v1/cart`);
  }
  removeProduct(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.apiURL}/api/v1/cart/${id}`);
  }
  changeCount(id: string, count: string): Observable<any> {
    return this._HttpClient.put(`${environment.apiURL}/api/v1/cart/${id}`, {
      count,
    });
  }
  updateCart(cart: any[]) {
    this.cartSubject.next(cart);
  }
  removeCartItemId(id: string) {
    this.cartItemId.next(id);
  }
  getCartSubject() {
    return this.cartSubject.asObservable();
  }
  getCartItemIdRemoved() {
    return this.cartItemId.asObservable();
  }
  checkout(cartId: string, cartDetails: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${environment.appURL}`,
      {
        shippingAddress: cartDetails,
      }
    );
  }
  getAllOrder(userId: string): Observable<any> {
    return this._HttpClient.get(
      `${environment.apiURL}/api/v1/orders/user/${userId}`
    );
  }
}
