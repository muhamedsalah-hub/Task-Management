import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-error',
  standalone: true,
  imports: [],
  templateUrl: './auth-error.component.html',
  styleUrl: './auth-error.component.css'
})
export class AuthErrorComponent {

  @Input() message:string="";
}
