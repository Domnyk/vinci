import { Action, State, StateContext, Store } from '@ngxs/store';

import { SignInWithPassword, UserHasSignedIn } from '../actions/sign-in.actions';
import { CurrentUser, UserType } from '../models/current-user';
import { SignOut, SignUpComplexesOwner } from '../actions/user.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.generated.dev';
import { tap } from 'rxjs/operators';
import { ErrorResponse } from '../models/api-response';
import { ShowFlashMessage } from '../actions/flash-message.actions';
import { Router } from '@angular/router';


@State<CurrentUser>({
  name: 'currentUser',
  defaults: null
})

export class CurrentUserState {
  constructor (private http: HttpClient, private store: Store, private router: Router) { }

  @Action(SignUpComplexesOwner)
  signUpComplexesOwner({ patchState }: StateContext<CurrentUser>, { complexesOwner }: SignUpComplexesOwner) {
    const stateUpdater = (response) => {
      const { email } = response;
      patchState({ email, type: UserType.ComplexesOwner });
      this.store.dispatch(new ShowFlashMessage('Pomyślnie zarejestrowano'));
      this.router.navigate(['/owner']);
    };

    return this.http.post(environment.api.urls.signUp, complexesOwner.dto(), { withCredentials: true })
      .pipe(tap(stateUpdater))
      .subscribe(() => {}, (error) => this.handleError(error));
  }

  @Action(UserHasSignedIn)
  userHasSignedIn({ patchState }: StateContext<CurrentUser>, { email, displayName }: UserHasSignedIn) {
    patchState({ email, displayName, type: UserType.Regular });
  }

  @Action(SignOut)
  signOut({ setState }: StateContext<CurrentUser>, {}: SignOut) {
    this.http.delete(environment.api.urls.signOut, { withCredentials: true })
      .pipe(
        tap(() => setState(null)),
        tap(() => this.router.navigate(['/']))
      )
      .subscribe(() => {}, (error) => this.handleError(error));
  }

  @Action(SignInWithPassword)
  signInWithPassword({ patchState }: StateContext<CurrentUser>, { user }: SignInWithPassword) {
    this.http.post(environment.api.urls.signIn(UserType.ComplexesOwner), user.dto(), { withCredentials: true })
      .pipe(tap(() => patchState({ email: user.email, type: UserType.ComplexesOwner })))
      .subscribe(() => {}, (error) => this.handleError(error));
  }

  private handleError(errorResponse: ErrorResponse) {
    console.debug('Error response: ', errorResponse);
    this.store.dispatch(new ShowFlashMessage('Wystąpił błąd'));
  }
}
