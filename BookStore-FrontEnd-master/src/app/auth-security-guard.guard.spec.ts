import { TestBed } from '@angular/core/testing';

import { AuthSecurityGuardGuard } from './auth-security-guard.guard';

describe('AuthSecurityGuardGuard', () => {
  let guard: AuthSecurityGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthSecurityGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
