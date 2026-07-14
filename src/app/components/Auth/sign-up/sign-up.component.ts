import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { validationRules } from './validationUtils/validation';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  faEye = faEye;
  constructor(private _FormBuilder: FormBuilder) {}

  signUpForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', validationRules.password],
    data: {
      name: ['', validationRules.name],
    },
  });


  signUpSubmission(){
  if(this.signUpForm.valid){
    
  }
  }
}
