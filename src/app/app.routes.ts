import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { SignUpComponent } from './components/Auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/Auth/forgot-password/forgot-password.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo:'login',pathMatch:"full" },
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
    ],
  },
];
