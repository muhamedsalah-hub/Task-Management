import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-field-error',
  standalone: true,
  imports: [],
  templateUrl: './field-error.component.html',
  styleUrl: './field-error.component.css'
})
export class FieldErrorComponent {

  @Input() message:string="";
}
