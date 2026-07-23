import { Component, inject } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faArrowRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AuthCardComponent } from '../shared/auth-card/auth-card.component';
import { AuthValidationRules } from '../../../core/utils/validations';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    FontAwesomeModule,
    AuthCardComponent,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  readonly validations = AuthValidationRules;
  readonly faEye = faEye;
  readonly faSpinner = faSpinner;
  readonly faArrowAltCircleRight = faArrowRight;
  readonly faEnvelope = faEnvelope;
  isLoading: boolean = false;

  readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);
  private readonly _FormBuilder = inject(FormBuilder);

  loginForm: FormGroup = this._FormBuilder.group({
    email: ['', this.validations.email],
    password: ['', [Validators.required]],
  });

  logInSubmission() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this._AuthService
        .logIn(this.loginForm.value)
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe((res) => {
          this._Router.navigate(['/projects']);
        });
    }
  }
}
