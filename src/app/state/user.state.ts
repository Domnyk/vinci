import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import { SignInWithPassword, UserHasSignedIn } from '../actions/sign-in.actions';
import { CurrentUser } from '../models/current-user';
import { SignOut, SignUpComplexesOwner } from '../actions/user.actions';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment.generated.dev';
import { catchError, tap } from 'rxjs/operators';
import { ShowFlashMessageOnSuccessfulOperation } from '../actions/flash-message.actions';
import { Router } from '@angular/router';
import { SignUpComplexesOwnerResponse } from '../models/api-responses/sign-up-complexes-owner-response';
import { CurrentUserType } from '../models/current-user-type';
import { SignInWithPasswordResponse } from '../models/api-responses/sign-in-with-password-response';
import { UpdateClient } from '../components/client/profile/profile.actions';
import { Client } from '../models/api-responses/client';
import { handleError } from './error-handler';


@State<CurrentUser>({
  name: 'currentUser',
})

export class CurrentUserState {
  constructor (private http: HttpClient, private store: Store, private router: Router) { }

  @Selector()
  static isSignedIn(state: CurrentUserState) {
    return () => !!state;
  }

  @Action(SignUpComplexesOwner)
  signUpComplexesOwner({ setState }: StateContext<CurrentUser>, { complexesOwner }: SignUpComplexesOwner) {
    const stateUpdater = (response: SignUpComplexesOwnerResponse) => {
      const { id, email, paypal_email } = response;
      setState( { email, paypalEmail: paypal_email, type: CurrentUserType.ComplexesOwner } );
      this.store.dispatch(new ShowFlashMessageOnSuccessfulOperation('Pomyślnie zarejestrowano'));
      this.router.navigate(['/owner']);
    };

    return this.http.post(environment.api.urls.signUp, complexesOwner.dto(), { withCredentials: true }).pipe(
      tap(stateUpdater),
      catchError(error => handleError(error, this.store))
    );
  }

  @Action(UserHasSignedIn)
  userHasSignedIn({ patchState }: StateContext<CurrentUser>, { paypalEmail, displayName }: UserHasSignedIn) {
    patchState({ paypalEmail, displayName, type: CurrentUserType.Client });
  }

  @Action(SignOut)
  signOut({ setState }: StateContext<CurrentUser>, {}: SignOut) {
    setState(null);
    return this.http.delete(environment.api.urls.signOut, { withCredentials: true });
  }

  @Action(SignInWithPassword)
  signInWithPassword({ setState }: StateContext<CurrentUser>, { credentials }: SignInWithPassword) {
    const updateState = (response: SignInWithPasswordResponse) => {
            const { id, email, paypal_email } = response;
            setState({ email, paypalEmail: paypal_email, type: CurrentUserType.ComplexesOwner });
    }, updateUI = () => {
      this.store.dispatch(new ShowFlashMessageOnSuccessfulOperation('Pomyślnie zalogowano'));
      this.router.navigate(['/owner']);
    };

    return this.http.post(environment.api.urls.signIn(CurrentUserType.ComplexesOwner), credentials.dto(), { withCredentials: true })
      .pipe(
        tap((response: SignInWithPasswordResponse) => updateState(response)),
        tap(() => updateUI())
      );
  }

  @Action(UpdateClient)
  updateClient({ patchState }: StateContext<CurrentUser>, { clientProfile }: UpdateClient) {
    const url = environment.api.resource('users', clientProfile.id),
          stateUpdater = ({ email, paypal_email: paypalEmail, display_name: displayName }: Client) => {
            return patchState({ email, displayName, paypalEmail, type: CurrentUserType.Client });
          };

    return this.http.patch(url, clientProfile.dto(), { withCredentials: true })
      .pipe(tap((client: Client) => stateUpdater(client)));
  }
}
