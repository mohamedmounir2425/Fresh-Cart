import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ForgetPasswordService {
  constructor(private _HttpClient: HttpClient) {}

  forgetPassword(email: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.apiURL}/api/v1/auth/forgotPasswords`,
      email
    );
  }
  resetCode(resetCode: object): Observable<any> {
    return this._HttpClient.post(
      `${environment.apiURL}/api/v1/auth/verifyResetCode`,
      resetCode
    );
  }
  resetPassword(resetPassword: object): Observable<any> {
    return this._HttpClient.put(
      `${environment.apiURL}/api/v1/auth/resetPassword`,
      resetPassword
    );
  }
}
