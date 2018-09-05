import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthorizationService } from './authorization.service';

describe('AuthorizationService', () => {
  let service: AuthorizationService = null;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizationService]
    });

    service = TestBed.get(AuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isUserSignedIn', () => {
    it(`should return true when localStorage contains item 'currentUser'`, () => {
      localStorage.setItem('currentUser', 'Some random string');

      expect(service.isUserSignedIn).toEqual(true);
    });

    it(`should return false when localStorage does not contain item 'currentUser'`, () => {
      localStorage.removeItem('currentUser');

      expect(service.isUserSignedIn).toEqual(false);
    });
  })

  describe('currentUser', () => {
    it(`should return localStorage object under key 'currentUser'`, () => {
      const expectedCurrentUser = {token: 'XYZ'};
      let actualCurrentUser = null;
      localStorage.setItem('currentUser', JSON.stringify(expectedCurrentUser));

      actualCurrentUser = service.currentUser;

      expect(actualCurrentUser).toEqual(expectedCurrentUser);
    });
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
