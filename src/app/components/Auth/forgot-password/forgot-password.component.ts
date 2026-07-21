import {
  Component,
  ElementRef,
  inject,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { AuthCardComponent } from '../shared/auth-card/auth-card.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck, faClock } from '@fortawesome/free-regular-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { NgClass } from '../../../../../node_modules/@angular/common';
import { FieldErrorComponent } from '../../shared/field-error/field-error.component';
import { finalize } from 'rxjs';
import { AuthValidationRules } from '../../../core/utils/validations';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    AuthCardComponent,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgClass,
    FieldErrorComponent
],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  readonly validation = AuthValidationRules;
  readonly faClock = faClock;
  readonly faCircleCheck = faCircleCheck;
  readonly faSpinner = faSpinner;
  isCountingDown: boolean = false;
  time: string = '01:00';
  isLoading: boolean = false;

  private readonly _AuthService = inject(AuthService);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Renderer2 = inject(Renderer2);
  @ViewChild('success') divElement!: ElementRef;

  emailForm: FormGroup = this._FormBuilder.group({
    email: ['', this.validation.email],
  });

  emailSubmission(): void {
    if (this.emailForm.valid) {
      this.isLoading = true;
      this.isCountingDown = true;
      this.startCountDown();
      this._AuthService
        .handleEmailSubmission(this.emailForm.value)
        .pipe(finalize(() => this.handleCountDownSubmission()))
        .subscribe();
    }
  }

  startCountDown(): void {
    let totalSeconds = 1 * 60;
    const timer = setInterval(() => {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      this.time = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      if (totalSeconds === 0) {
        this.isCountingDown = false;
        clearInterval(timer);
        return;
      }
      totalSeconds--;
    }, 1000);
  }

  handleCountDownSubmission(): void {
    this.isLoading = false;
    this.isCountingDown = true;
    this._Renderer2?.removeClass(this.divElement.nativeElement, 'hidden');
    this._Renderer2?.addClass(this.divElement.nativeElement, 'flex');
  }
}
