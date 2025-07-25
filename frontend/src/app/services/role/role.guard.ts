import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('auth_token');

  if (!token) {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }

  const payload = token.split('.')[1];

  const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');

  const decodedPayload = atob(base64);

  const decodedObject = JSON.parse(decodedPayload);

  const role = decodedObject.role;


  if (role !== 'DO' && role !== 'AO' && role !== 'HDO' && role !== 'DEA') {
    const router = inject(Router);
    router.navigate(['/forbidden']);
    return false;
  }

  return true;
};
