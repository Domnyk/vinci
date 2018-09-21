import { State, Action, StateContext } from '@ngxs/store';
import { tap, take } from 'rxjs/operators';

import { SignInWithFb } from '../actions/sign-in.actions';

import { AuthenticationService } from '../services/authentication.service';
import { SignInResponse } from '../models/api-response';
import { CurrentUser } from '../models/current-user';
import { Router } from '@angular/router';


@State<CurrentUser>({
  name: 'currentUser',
  defaults: {
    email: null,
    accessType: null,
    token: null
  }
})

export class CurrentUserState {
  constructor (private authorizationService: AuthenticationService, private router: Router) { }

  // TODO: In other action handlers 'take(1)' call is not necessary. Why it is here?
  @Action(SignInWithFb)
  signInWithFb({ patchState }: StateContext<CurrentUser>) {
    return this.authorizationService.signInWithFb()
      .pipe(
        take(1),
        tap(({ token, email, access_type }: SignInResponse) => patchState({ email, token, accessType: access_type })),
      );
  }
}
