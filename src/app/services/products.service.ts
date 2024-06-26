import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _HttpClient: HttpClient) {}
  getProducts(): Observable<any> {
    return this._HttpClient.get(`${environment.apiURL}/api/v1/products`);
  }
  getProductById(id: string): Observable<any> {
    return this._HttpClient.get(`${environment.apiURL}/api/v1/products/${id}`);
  }
  getCategories(): Observable<any> {
    return this._HttpClient.get(`${environment.apiURL}/api/v1/categories`);
  }
}
