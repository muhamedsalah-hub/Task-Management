import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../core/services/auth.service';
import { TrimTextPipe } from '../../../core/pipes/trim-text.pipe';


@Component({
  selector: 'app-top-navbar',
  standalone: true,
  imports: [FontAwesomeModule, TrimTextPipe],
  templateUrl: './top-navbar.component.html',
  styleUrl: './top-navbar.component.css',
})
export class TopNavBarComponent {
  readonly faBars = faBars;

  readonly _AuthService = inject(AuthService);

  @Output() menuClicked=new EventEmitter<void>();

  onToggle(){ 
    this.menuClicked.emit();
  }


}
