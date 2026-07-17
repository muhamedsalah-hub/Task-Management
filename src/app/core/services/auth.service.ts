import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmet } from '../environment/environment';
import {
  ILoginData,
  ISignUpData,
  ILoginResponse,
  IUserdata,
  ISignupResponse,
} from '../interfaces/Auth/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: IUserdata | null = null;

  constructor(private _HttpClient: HttpClient) {}

  logIn(body: ILoginData): Observable<ILoginResponse> {
    return this._HttpClient.post<ILoginResponse>(
      `${environmet.baseUrl}/auth/v1/token?grant_type=password`,
      body,
    );
  }

  SignUp(body: ISignUpData): Observable<ISignupResponse> {
    return this._HttpClient.post<ISignupResponse>(
      `${environmet.baseUrl}/auth/v1/signup`,
      body,
    );
  }

  setUserData(data: IUserdata) {
    this.user = data;
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
