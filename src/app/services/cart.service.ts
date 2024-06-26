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
  headers = new HttpHeaders({
    token: localStorage.getItem('token') as string,
  });
  addToCart(productId: string): Observable<any> {
    return this._HttpClient.post(
      `${environment.apiURL}/api/v1/cart`,
      { productId },
      {
        headers: this.headers,
      }
    );
  }
  getCart(): Observable<any> {
    return this._HttpClient.get(`${environment.apiURL}/api/v1/cart`, {
      headers: this.headers,
    });
  }
  removeProduct(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.apiURL}/api/v1/cart/${id}`, {
      headers: this.headers,
    });
  }
  changeCount(id: string, count: string): Observable<any> {
    return this._HttpClient.put(
      `${environment.apiURL}/api/v1/cart/${id}`,
      { count },
      { headers: this.headers }
    );
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
}
