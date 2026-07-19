import { HttpInterceptorFn } from '@angular/common/http';
import { environmet } from '../../environment/environment';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const _PLATFORM_ID=inject(PLATFORM_ID)
  req = req.clone({ setHeaders: { apikey: environmet.apiKey } });

  if (req.url.includes('auth/v1/user') && isPlatformBrowser(_PLATFORM_ID)) {

    const token = localStorage.getItem('token') || '';
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(req);
};
