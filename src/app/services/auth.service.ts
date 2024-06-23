import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../Models/user.model';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  constructor(private _HttpClient: HttpClient, private router: Router) {}

  register(userData: RegisterUser): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      userData
    );
  }
  login(userData: RegisterUser): Observable<any> {
    return this._HttpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      userData
    );
  }
  saveUser() {
    const token = localStorage.getItem('token');
    if (token) {
      const decode = jwtDecode(token);
      this.userData = decode;
    }
  }
  signOut() {
    localStorage.removeItem('token');
    this.userData = '';
    this.router.navigate(['/login']);
  }
}
