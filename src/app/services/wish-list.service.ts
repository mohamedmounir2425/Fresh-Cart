import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  favNum: BehaviorSubject<number> = new BehaviorSubject(0);
  removedWishProductId: Subject<string> = new Subject<string>();
  constructor(private _HttpClient: HttpClient) {}
  removeFromWishList() {
    return this.removedWishProductId;
  }
  updateWishListData(newData: string) {
    this.removedWishProductId.next(newData);
  }
  getUserWishList(): Observable<any> {
    return this._HttpClient.get(`${environment.apiURL}/api/v1/wishlist`);
  }
  addToWishList(productId: string) {
    return this._HttpClient.post(`${environment.apiURL}/api/v1/wishlist`, {
      productId,
    });
  }
  removeWishList(productId: string): Observable<any> {
    return this._HttpClient.delete(
      `${environment.apiURL}/api/v1/wishlist/${productId}`
    );
  }
}
