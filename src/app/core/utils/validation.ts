import { AbstractControl, FormGroup, Validators } from '@angular/forms';

export const validationRules = {
  name: [
    Validators.required,
    Validators.pattern(/^(?=.{3,50}$)(?!.*\s{2,})[\p{L}]+(?: [\p{L}]+)*$/u),
  ],
  email: [Validators.required, Validators.email],
  password: [
    Validators.required,
    Validators.pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[^\s]{8,64}$/,
    ),
  ],

  nameValidation(form: FormGroup): boolean {
    return (
      !!form.get(['data', 'name'])?.errors &&
      !!form.get(['data', 'name'])?.touched
    );
  },
  emailValidation(form: FormGroup): boolean {
    return !!form.get('email')?.errors && !!form.get('email')?.touched;
  },
  passwordValidation(form: FormGroup): boolean {
    return !!form.get('password')?.errors && !!form.get('password')?.touched;
  },
  passwordMatchValidator(Form: AbstractControl) {
    if (Form.get('confirmPassword')?.value === Form.get('password')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  },
};
