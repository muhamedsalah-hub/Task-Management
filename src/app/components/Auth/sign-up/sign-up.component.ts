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
import { validationRules } from '../../../core/utils/validation';
import { AuthService } from '../../../core/services/auth.service';
import { NgClass } from '../../../../../node_modules/@angular/common';
import { AuthErrorComponent } from '../shared/auth-error/auth-error.component';
import { AuthCardComponent } from '../shared/auth-card/auth-card.component';
import { ISignupResponse } from '../../../core/interfaces/Auth/types';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { finalize } from 'rxjs';
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
  readonly faEye = faEye;
  readonly faSpinner = faSpinner;
  readonly validations = validationRules;
  isLoading: boolean = false;

  private readonly _Router = inject(Router);
  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);

  signUpForm: FormGroup = this._FormBuilder.group(
    {
      email: ['', validationRules.email],
      password: ['', validationRules.password],
      confirmPassword: ['', [Validators.required]],
      data: this._FormBuilder.group({
        name: ['', validationRules.name],
        job_title: [''],
      }),
    },
    { validators: this.validations.passwordMatchValidator },
  );

  signUpSubmission() {
    if (this.signUpForm.valid) {
      this.isLoading = true;
      const { confirmPassword, ...data } = this.signUpForm.value;
      this._AuthService
        .SignUp(data)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe(() => {
          this._Router.navigate(['/project']);
        });
    }
  }
}
