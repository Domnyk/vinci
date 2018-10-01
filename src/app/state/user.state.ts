import { State, Action, StateContext } from '@ngxs/store';
import { tap, take } from 'rxjs/operators';

import {SignInWithFb, SignInWithPassword} from '../actions/sign-in.actions';

import { AuthenticationService } from '../services/authentication.service';
import { SignInResponse } from '../models/api-response';
import { CurrentUser } from '../models/current-user';


@State<CurrentUser>({
  name: 'currentUser',
  defaults: {
    email: null,
    accessType: null,
    token: null
  }
})

export class CurrentUserState {
  constructor (private authenticationService: AuthenticationService) { }

  // TODO: In other action handlers 'take(1)' call is not necessary. Why it is here?
  @Action(SignInWithFb)
  signInWithFb({ patchState }: StateContext<CurrentUser>) {
    return this.authenticationService.signInWithFb()
      .pipe(
        take(1),
        tap(({ token, email, access_type }: SignInResponse) => patchState({ email, token, accessType: access_type })),
      );
  }

  @Action(SignInWithPassword)
  signInWithPassword({ patchState }: StateContext<CurrentUser>, { user }: SignInWithPassword) {
    return this.authenticationService.signIn(user)
      .pipe(
        take(1),
        tap(({ token, email, access_type }: SignInResponse) => patchState({ email, token, accessType: access_type })),
      );
  }
}
