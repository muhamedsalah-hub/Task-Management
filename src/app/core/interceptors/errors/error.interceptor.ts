import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _Toastr = inject(ToastrService);
  const _AuthService = inject(AuthService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        _Toastr.error('Unauthorized');
        _AuthService.logout();
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
      } else if (req.url.includes('/rest/v1/epics') && req.method === 'POST') {
        _Toastr.error(`Failed to create epic. : ${err.error.msg}`);
      } else if (req.url.includes('/rest/v1/epics') && req.method === 'PATCH') {
        _Toastr.error(`Failed to update epic : Please try again later`);
      } else if (req.url.includes('/rest/v1/tasks') && req.method == 'POST') {
        _Toastr.error(`Failed to create task, try again later`);
      } else if (req.url.includes('/rest/v1/tasks') && req.method == 'PATCH') {
        _Toastr.error(`Failed to drag and drop task, try again later`);
      }
      return throwError(() => err);
    }),
  );
};
