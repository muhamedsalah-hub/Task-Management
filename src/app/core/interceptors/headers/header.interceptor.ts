import { HttpInterceptorFn } from '@angular/common/http';
import { environmet } from '../../environment/environment';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const _PLATFORM_ID = inject(PLATFORM_ID);
  req = req.clone({ setHeaders: { apikey: environmet.apiKey } });

  if (isPlatformBrowser(_PLATFORM_ID)) {
    const token = localStorage.getItem('token') || '';

    //Reset password
    if (req.url.includes('auth/v1/user')) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    //Project Creation && edit project
    if (req.url.includes('/rest/v1/projects')) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    }

    //Get Projects
    if (req.url.includes('/rest/v1/rpc/get_projects')) {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${token}`, Prefer: 'count=exact' } });
    }

    //Get Project Members
    if (req.url.includes('rest/v1/get_project_members')) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    //Add project Epic
    if (req.url.includes('rest/v1/epics')) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    //Get project Epics
    if (req.url.includes('rest/v1/project_epics')) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}`, Prefer: 'count=exact' },
      });
    }

    //Create tasks
    if (req.url.includes('rest/v1/tasks')) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }
  }

  return next(req);
};
