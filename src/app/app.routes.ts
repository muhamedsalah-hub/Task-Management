import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './features/Auth/pages/login/login.component';
import { SignUpComponent } from './features/Auth/pages/sign-up/sign-up.component';
import { ResetPasswordComponent } from './features/Auth/pages/reset-password/reset-password.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { AuthGuard } from './core/guards/auth-guard.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { ProjectsListComponent } from './features/projects/pages/projects-list/projects-list.component';
import { ProjectLayoutComponent } from './features/projects/layouts/project-layout/project-layout.component';
import { ProjectEpicsComponent } from './features/projects/pages/epics/project-epics/project-epics.component';
import { ProjectTasksComponent } from './features/projects/pages/tasks/project-tasks/project-tasks.component';
import { ProjectMembersComponent } from './features/projects/pages/project-members/project-members.component';
import { EditProjectComponent } from './features/projects/pages/edit-project/edit-project.component';
import { AddProjectComponent } from './features/projects/pages/Project/add-project/add-project.component';
import { ForgotPasswordComponent } from './features/Auth/pages/forgot-password/forgot-password.component';

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
      { path: '', redirectTo: 'Projects', pathMatch: 'full' },
      { path: 'Projects', component: ProjectsListComponent },
      { path: 'Projects/add', component: AddProjectComponent },
      {
        path: 'projects/:projectId',
        component: ProjectLayoutComponent,
        children: [
          { path: '', redirectTo: 'epics', pathMatch: 'full' },
          { path: 'epics', component: ProjectEpicsComponent },
          { path: 'tasks', component: ProjectTasksComponent },
          { path: 'members', component: ProjectMembersComponent },
          { path: 'edit', component: EditProjectComponent },
        ],
      },
    ],
  },
];
