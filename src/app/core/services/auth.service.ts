import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environmet } from '../environment/environment';
import { ILoginData, ILoginResponse, IUser } from '../interfaces/Auth/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: IUser | null = null;

  constructor(private _HttpClient: HttpClient) {}

  logIn(body: ILoginData): Observable<ILoginResponse> {
    return this._HttpClient.post<ILoginResponse>(
      `${environmet.baseUrl}/auth/v1/token?grant_type=password`,
      body,
    );
  }

  setUserData(user: IUser) {
    this.user = user;
  }

}
