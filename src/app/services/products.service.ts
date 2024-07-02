import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _HttpClient: HttpClient) {}
  getProducts(pageNums: number = 1, categoryId: string): Observable<any> {
    if (categoryId) {
      return this._HttpClient.get(`${environment.apiURL}/api/v1/products`);
    } else {
      return this._HttpClient.get(
        `${environment.apiURL}/api/v1/products?page=${pageNums}&limit=18`
      );
    }
  }
  getProductById(id: string): Observable<any> {
    return this._HttpClient.get(`${environment.apiURL}/api/v1/products/${id}`);
  }
  getCategories(): Observable<any> {
    return this._HttpClient.get(`${environment.apiURL}/api/v1/categories`);
  }
}
