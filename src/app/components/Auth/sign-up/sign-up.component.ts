import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { validationRules } from './utils/validation';
import { AuthService } from '../../../core/services/auth.service';
import { NgClass } from '../../../../../node_modules/@angular/common';
import { AuthErrorComponent } from '../shared/auth-error/auth-error.component';
import { AuthCardComponent } from '../shared/auth-card/auth-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FontAwesomeModule,
    ReactiveFormsModule,
    NgClass,
    AuthErrorComponent,
    AuthCardComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  faEye = faEye;
  _AuthService = inject(AuthService);
  _Router = inject(Router);
  constructor(private _FormBuilder: FormBuilder) {}

  signUpForm: FormGroup = this._FormBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', validationRules.password],
      confirmPassword: ['', [Validators.required]],
      data: this._FormBuilder.group({
        name: ['', validationRules.name],
        job_title: [''],
      }),
    },
    { validators: this.passwordMatchValidator },
  );

  signUpSubmission() {
    if (this.signUpForm.valid) {
      const { confirmPassword, ...data } = this.signUpForm.value;
      this._AuthService.SignUp(data).subscribe((res) => {
        const id = res.user.id;
        const name = res.user.user_metadata.name;
        const role = res.user.user_metadata.job_title;
        localStorage.setItem('token', res.access_token);
        this._AuthService.setUserData({ id, name, role });
        // this._Router.navigate(['/projects'])
      });
    }
  }

  passwordMatchValidator(Form: AbstractControl) {
    if (Form.get('confirmPassword')?.value === Form.get('password')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  nameValidation(): boolean {
    return (
      !!this.signUpForm.get(['data', 'name'])?.errors &&
      (!!this.signUpForm.get(['data', 'name'])?.touched ||
        !!this.signUpForm.get(['data', 'name'])?.dirty)
    );
  }

  emailValidation(): boolean {
    return (
      !!this.signUpForm.get('email')?.errors &&
      !!this.signUpForm.get('email')?.touched
    );
  }

  passwordValidation(): boolean {
    return (
      !!this.signUpForm.get('password')?.errors &&
      !!this.signUpForm.get('password')?.touched
    );
  }
}
