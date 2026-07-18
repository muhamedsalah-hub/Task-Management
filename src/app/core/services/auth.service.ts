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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: IUserdata | null = null;

  private readonly _PlatrformID = inject(PLATFORM_ID);

  constructor(private _HttpClient: HttpClient) {
    if (isPlatformBrowser(this._PlatrformID)) {
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
          const id = res.user.id;
          const name = res.user.user_metadata.name;
          const role = res.user.user_metadata.department;
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('user', JSON.stringify({ id, name, role }));
        }),
      );
  }

  SignUp(body: ISignUpData): Observable<ISignupResponse> {
    return this._HttpClient
      .post<ISignupResponse>(`${environmet.baseUrl}/auth/v1/signup`, body)
      .pipe(
        tap((res) => {
          const id = res.user.id;
          const name = res.user.user_metadata.name;
          const role = res.user.user_metadata.job_title;
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('user', JSON.stringify({ id, name, role }));
        }),
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user = null;
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
