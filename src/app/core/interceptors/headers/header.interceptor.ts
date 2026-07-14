import { HttpInterceptorFn } from '@angular/common/http';
import { environmet } from '../../environment/environment';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({ setHeaders: { apikey: environmet.apiKey } });

  return next(req);
};
