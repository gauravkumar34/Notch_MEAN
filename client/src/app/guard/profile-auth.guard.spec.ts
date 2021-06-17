import { TestBed } from '@angular/core/testing';

import { ProfileAuthGuard } from './profile-auth.guard';

describe('ProfileAuthGuard', () => {
  let guard: ProfileAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProfileAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
