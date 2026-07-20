import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const _PLATFORM_ID = inject(PLATFORM_ID);
  const _Router = inject(Router);


  if (isPlatformBrowser(_PLATFORM_ID)) {
    const token = localStorage.getItem('token') || '';
    if (token) {
      return _Router.createUrlTree(['/projects']);
    } else {
      return true;
    }
  }
  return false;
};
