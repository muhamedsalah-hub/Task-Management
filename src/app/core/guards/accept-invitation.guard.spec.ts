import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { acceptInvitationGuard } from './accept-invitation.guard';

describe('acceptInvitationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => acceptInvitationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
