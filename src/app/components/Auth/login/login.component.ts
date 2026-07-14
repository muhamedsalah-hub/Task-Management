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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, FontAwesomeModule],
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
      this._AuthService.logIn(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          const id = res.user.id;
          const role = res.user.role;
          const name = res.user.identities[0].identity_data.name;
          localStorage.setItem('token', res.access_token);
          this._AuthService.setUserData({ id, name, role });
          // this._Router.navigate(['/projects'])
        },
        error: () => {
          this._Toastr.error('Invalid Username or Password', '', {
            positionClass: 'toast-top-left',
          });
        },
      });
    }
  }
}
