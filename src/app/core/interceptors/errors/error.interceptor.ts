import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _Toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        //logic
        _Toastr.error('Unauthorized');
      } else if (req.url.includes('signup')) {
        _Toastr.error(err.error.msg ?? 'Something went wrong');
      } else if (req.url.includes('token')) {
        _Toastr.error('Invalid username or password');
      } else if (req.url.includes('recover')) {
        _Toastr.error('Sorry ,You can reset your password After one minute');
      } else if (req.url.includes('auth/v1/user')) {
        _Toastr.error(err.error.msg ?? 'Something went wrong');
      } else if (req.url.includes('/rest/v1/projects')) {
        _Toastr.error(`Failed to create project : ${err.error.msg}`);
      }
      return throwError(() => err);
    }),
  );
};
