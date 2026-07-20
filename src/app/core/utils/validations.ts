import { AbstractControl, FormGroup, Validators } from '@angular/forms';

export const AuthValidationRules = {
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

export const ProjectValidationRules = {
  name: [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100),
  ],
  description: [Validators.maxLength(500)],
  nameValidations(form: FormGroup) {
    return !!form.get('name')?.errors && !!form.get('name')?.touched;
  },
  descriptionValidations(form: FormGroup) {
    return !!form.get('description')?.errors && !!form.get('description')?.touched;
  },
};
