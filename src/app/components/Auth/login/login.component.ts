import { Component, inject } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { AuthCardComponent } from '../shared/auth-card/auth-card.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, FontAwesomeModule, AuthCardComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  faEye = faEye;
  faEnvelope = faEnvelope;

  _AuthService = inject(AuthService);
  _Toastr = inject(ToastrService);
  _Router = inject(Router);
  constructor(private _FormBuilder: FormBuilder) {}

  loginForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  logInSubmission() {
    if (this.loginForm.valid) {
      this._AuthService.logIn(this.loginForm.value).subscribe((res) => {
        const id = res.user.id;
        const name = res.user.user_metadata.name;
        const role = res.user.user_metadata.department;
        localStorage.setItem('token', res.access_token);
        this._AuthService.setUserData({ id, name, role });
        // this._Router.navigate(['/projects'])
      });
    }
  }
}
