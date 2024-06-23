import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CustomJWTdecode } from '../Interfaces/customejwtpayload.interface';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (token) {
    const decode = jwtDecode<CustomJWTdecode>(token);

    return decode.name ? true : false;
  }

  router.navigate(['/login']);
  return false;
};
