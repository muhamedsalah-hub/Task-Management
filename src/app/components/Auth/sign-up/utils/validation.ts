import { Validators } from '@angular/forms';

export const validationRules = {
  name: [
    Validators.required,
    Validators.pattern(/^(?=.{3,50}$)(?!.*\s{2,})[\p{L}]+(?: [\p{L}]+)*$/u),
  ],
  password: [
    Validators.required,
    Validators.pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[^\s]{8,64}$/,
    ),
  ],
};
