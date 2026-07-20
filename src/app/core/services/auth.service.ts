import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environmet } from '../environment/environment';
import {
  ILoginData,
  ISignUpData,
  ILoginResponse,
  IUserdata,
  ISignupResponse,
} from '../interfaces/Auth/types';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: IUserdata | null = null;

  private readonly _PlatrformID = inject(PLATFORM_ID);
  private readonly _Toastr = inject(ToastrService);
  private readonly _Router = inject(Router);

  constructor(private _HttpClient: HttpClient) {
    if (isPlatformBrowser(this._PlatrformID) && localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user') as string);
    }
  }

  logIn(body: ILoginData): Observable<ILoginResponse> {
    return this._HttpClient
      .post<ILoginResponse>(
        `${environmet.baseUrl}/auth/v1/token?grant_type=password`,
        body,
      )
      .pipe(
        tap((res) => {
          const user: IUserdata = {
            id: res.user.id,
            name: res.user.user_metadata.name,
            role: res.user.user_metadata.department,
          };

          localStorage.setItem('token', res.access_token);
          localStorage.setItem('user', JSON.stringify(user));
          this.user = user;
        }),
      );
  }

  SignUp(body: ISignUpData): Observable<ISignupResponse> {
    return this._HttpClient
      .post<ISignupResponse>(`${environmet.baseUrl}/auth/v1/signup`, body)
      .pipe(
        tap((res) => {
          const user: IUserdata = {
            id: res.user.id,
            name: res.user.user_metadata.name,
            role: res.user.user_metadata.job_title,
          };

          localStorage.setItem('token', res.access_token);
          localStorage.setItem('user', JSON.stringify(user));
          this.user = user;
        }),
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user = null;
    this._Toastr.success('User logged out successfully');
    this._Router.navigate(['/login']);
  }

  handleEmailSubmission(body: { email: string }): Observable<null> {
    return this._HttpClient.post<null>(
      `${environmet.baseUrl}/auth/v1/recover`,
      body,
      { headers: { redirect_to: 'http://localhost:4200/reset-password' } },
    );
  }

  handleNewPassword(body: { password: string }) {
    return this._HttpClient.put(`${environmet.baseUrl}/auth/v1/user`, body);
  }
}
