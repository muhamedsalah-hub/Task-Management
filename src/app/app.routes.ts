import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { SignUpComponent } from './components/Auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/Auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/Auth/reset-password/reset-password.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { AddProjectFormComponent } from './components/projects/add-project-form/add-project-form.component';
import { AuthGuard } from './core/guards/auth-guard.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { ProjectsListComponent } from './components/projects/projects-list/projects-list.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: SignUpComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [loggedGuard],
    children: [
      { path: '', redirectTo: 'projects', pathMatch: 'full' },
      { path: 'projects', component: ProjectsListComponent},
      { path: 'projects/add', component: AddProjectFormComponent },
    ],
  },
];
