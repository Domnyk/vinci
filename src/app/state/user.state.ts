import { State, Action, StateContext } from '@ngxs/store';
import { tap, take } from 'rxjs/operators';

import { SignInWithPassword } from '../actions/sign-in.actions';

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

  @Action(SignInWithPassword)
  signInWithPassword({ patchState }: StateContext<CurrentUser>, { user }: SignInWithPassword) {
    return this.authenticationService.signIn(user)
      .pipe(
        take(1),
        tap(({ token, email, access_type }: SignInResponse) => patchState({ email, token, accessType: access_type })),
      );
  }
}
