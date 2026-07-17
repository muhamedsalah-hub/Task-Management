import { Component, Input } from '@angular/core';
import { ɵEmptyOutletComponent, RouterLink } from "@angular/router";

@Component({
  selector: 'app-auth-card',
  standalone: true,
  imports: [ɵEmptyOutletComponent, RouterLink],
  templateUrl: './auth-card.component.html',
  styleUrl: './auth-card.component.css',
})
export class AuthCardComponent {
  @Input({ required: true }) title: string = '';
  @Input({ required: true }) description: string = '';
  @Input({ required: true }) question: string = '';
  @Input({ required: true }) navigate: string = '';
}
