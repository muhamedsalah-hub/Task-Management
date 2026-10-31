import { AbstractControl, FormGroup, Validators } from '@angular/forms';



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
    return (
      !!form.get('description')?.errors && !!form.get('description')?.touched
    );
  },
};

export const EpicValidationRules = {
  title: [
    Validators.required,
    Validators.minLength(3),
  ],
  titleValidations(form:FormGroup){
    return !!form.get('title')?.errors && !!form.get('title')?.touched
  }
};

