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
import { AuthErrorComponent } from '../shared/auth-error/auth-error.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    AuthCardComponent,
    ɵInternalFormsSharedModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgClass,
    AuthErrorComponent,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  time: string = '01:00';
  isCountingDown: boolean = false;
  faCircleCheck = faCircleCheck;
  faSpinner = faSpinner;
  faClock = faClock;
  isLoading: boolean = false;
  private readonly _AuthService = inject(AuthService);
  constructor(
    private _FormBuilder: FormBuilder,
    private _Renderer2: Renderer2,
  ) {}
  @ViewChild('success') divElement!: ElementRef;

  emailForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });

  emailSubmission() {
    if (this.emailForm.valid) {
      this.isLoading = true;
      this.isCountingDown = true;
      this.startCountDown();
      this._AuthService.handleEmailSubmission(this.emailForm.value).subscribe({
        next: () => {
          this.handleCountDownSubmission();
        },
        error: () => {
          this.handleCountDownSubmission();
        },
      });
    }
  }

  emailValidation(): boolean {
    return (
      !!this.emailForm.get('email')?.errors &&
      !!this.emailForm.get('email')?.touched
    );
  }

  startCountDown() {
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

  handleCountDownSubmission() {
    this.isLoading = false;
    this.isCountingDown = true;
    this._Renderer2?.removeClass(this.divElement.nativeElement, 'hidden');
    this._Renderer2?.addClass(this.divElement.nativeElement, 'flex');
  }
}
