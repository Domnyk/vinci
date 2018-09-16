import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService]
    });

    service = TestBed.get(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signIn', () => {
    it(`should get response containing token`, () => {
      expect(false).toEqual(true);
    })
  });

  describe('signInWithFb', () => {
    it(`should get response containing token`, () => {
      expect(false).toEqual(true);
    });
  });
});
