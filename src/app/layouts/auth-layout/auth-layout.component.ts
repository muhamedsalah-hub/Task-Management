import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {
  private readonly _Router = inject(Router);
  private readonly _PlatformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this._PlatformId)) {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const type = params.get('type');
      if (type === 'recovery') {
        const token = params.get('access_token') || null;
        this._Router.navigate(['/reset-password'], {
          queryParams: { access_token: token },
        });
      }
    }
  }
}
