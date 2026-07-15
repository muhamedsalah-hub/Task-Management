import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _Toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (req.url.includes('signup')) {
        _Toastr.error(err.error.msg);
      } else if (req.url.includes('token')) {
        _Toastr.error(err.error.msg);
      }

      return throwError(() => err);
    }),
  );
};
