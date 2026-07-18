import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../core/services/auth.service';
import { IUserdata } from '../../../core/interfaces/Auth/types';
import { TrimTextPipe } from '../../../core/pipes/trim-text.pipe';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-top-nav-bar',
  standalone: true,
  imports: [FontAwesomeModule, TrimTextPipe],
  templateUrl: './top-nav-bar.component.html',
  styleUrl: './top-nav-bar.component.css',
})
export class TopNavBarComponent {
  readonly faBars = faBars;

  private readonly _AuthService = inject(AuthService);
}
