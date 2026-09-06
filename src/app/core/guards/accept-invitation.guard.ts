import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const acceptInvitationGuard: CanActivateFn = (route, state) => {
  const _PLATFORM_ID = inject(PLATFORM_ID);
  const _Router = inject(Router);
  const _AuthService = inject(AuthService);

  if (isPlatformBrowser(_PLATFORM_ID)) {
    if (_AuthService.isAuthenticated()) {
      return true;
    } else {
      return _Router.navigate(['/login'], { state: { returnUrl: state.url } });
    }
  }
  return false;
};
