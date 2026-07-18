import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../core/services/auth.service';
import { IUserdata } from '../../../core/interfaces/Auth/types';
import { TrimTextPipe } from '../../../core/pipes/trim-text.pipe';

@Component({
  selector: 'app-top-nav-bar',
  standalone: true,
  imports: [FontAwesomeModule,TrimTextPipe],
  templateUrl: './top-nav-bar.component.html',
  styleUrl: './top-nav-bar.component.css',
})
export class TopNavBarComponent {
  readonly faBars = faBars;
  user: IUserdata | null = null;
  private readonly _AuthService = inject(AuthService);
  
  constructor() {
    this.user = this._AuthService.user;
    console.log(this.user);
    
  }
}
