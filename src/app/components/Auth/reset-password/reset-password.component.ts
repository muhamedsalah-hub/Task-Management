import { Component, inject, PLATFORM_ID } from '@angular/core';
import { AuthCardComponent } from '../shared/auth-card/auth-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { validationRules } from '../../../core/utils/validation';
import { AuthService } from '../../../core/services/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  isPlatformBrowser,
  NgClass,
} from '../../../../../node_modules/@angular/common';
import { AuthErrorComponent } from '../shared/auth-error/auth-error.component';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    AuthCardComponent,
    FontAwesomeModule,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    NgClass,
    AuthErrorComponent,
    RouterLink,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  readonly validation = validationRules;
  readonly faSpinner = faSpinner;
  readonly faEye = faEye;

  token: null | string = null;
  isReady: boolean = false;
  isLoading: boolean = false;

  private readonly _Router = inject(Router);
  private readonly _Toastr = inject(ToastrService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _AuthService = inject(AuthService);
  private readonly _PlatformId = inject(PLATFORM_ID);

  constructor() {
    this.token =
      this._ActivatedRoute.snapshot.queryParamMap.get('access_token');
    if (isPlatformBrowser(this._PlatformId)) {
      this.isReady = true;
      if (this.token) {
        localStorage.setItem('token', this.token);
      }
    }
  }

  newPasswordForm: FormGroup = this._FormBuilder.group(
    {
      password: ['', validationRules.password],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.validation.passwordMatchValidator },
  );

  newPasswordSubmission() {
    if (this.newPasswordForm.valid) {
      this.isLoading = true;
      const { password } = this.newPasswordForm.value;
      this._AuthService
        .handleNewPassword({ password })
        .pipe(finalize(() => (this.isLoading = false)))
        .subscribe(() => {
          this._Toastr.success('Password has been updated successfully');
          setTimeout(() => {
            this._Router.navigate(['/login']);
          }, 3000);
        });
    }
  }
}
