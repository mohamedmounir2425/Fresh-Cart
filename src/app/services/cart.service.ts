import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
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
}
