import { CanActivateChildFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CustomJWTdecode } from '../Interfaces/customejwtpayload.interface';
import { inject } from '@angular/core';

export const authChildGuard: CanActivateChildFn = (childRoute, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  if (token) {
    const decode = jwtDecode<CustomJWTdecode>(token);
    return decode.name ? true : false;
  }

  router.navigate(['/login']);
  return false;
};
