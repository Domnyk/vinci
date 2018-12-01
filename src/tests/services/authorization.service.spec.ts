import { TestBed } from '@angular/core/testing';

import { AuthorizationService } from '../../app/services/authorization.service';
import { Store } from '@ngxs/store';

xdescribe('AuthorizationService', () => {
  let service: AuthorizationService = null,
      store: Store = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthorizationService,
      ],
    });

    service = TestBed.get(AuthorizationService);
    store = TestBed.get(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isAdmin', () => {
    it('should return true when credentials is signed up and has admin access type', (done: DoneFn) => {
      const initialCurenntUserState = {
        email: 'john@test.com',
        token: 'jwt token',
        accessType: 'admin'
      };
      store.reset(initialCurenntUserState);

      service.isAdmin(store).subscribe(
        isAdmin => { expect(isAdmin).toEqual(true); done(); }
      );
    });

    it('should return when false when credentials is not signed up or has not admin access type', () => {

    });
  });
});
