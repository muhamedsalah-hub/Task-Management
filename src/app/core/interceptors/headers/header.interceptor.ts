import { HttpInterceptorFn } from '@angular/common/http';
import { environmet } from '../../environment/environment';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({ setHeaders: { apikey: environmet.apiKey } });

  if (req.url.includes('auth/v1/user')) {
    const token = localStorage.getItem('token') || '';
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(req);
};
