import { Action, State, StateContext, Store } from '@ngxs/store';

import { SignInWithPassword } from '../actions/sign-in.actions';
import { CurrentUser } from '../models/current-user';
import { SignOut, SignUpComplexesOwner } from '../actions/user.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.generated.dev';
import { tap } from 'rxjs/operators';
import { ErrorResponse } from '../models/api-response';
import { ShowFlashMessageOnSuccess } from '../actions/flash-message.actions';
import { Router } from '@angular/router';
import { SignUpComplexesOwnerResponse } from '../models/api-responses/sign-up-complexes-owner-response';
import { CurrentUserType } from '../models/current-user-type';
import { SignInWithPasswordResponse } from '../models/api-responses/sign-in-with-password-response';


@State<CurrentUser>({
  name: 'currentUser',
})

export class CurrentUserState {
  constructor (private http: HttpClient, private store: Store, private router: Router) { }

  @Action(SignUpComplexesOwner)
  signUpComplexesOwner({ setState }: StateContext<CurrentUser>, { complexesOwner }: SignUpComplexesOwner) {
    const stateUpdater = (response: SignUpComplexesOwnerResponse) => {
      const { id, email, paypal_email } = response;
      setState( { id, email, paypalEmail: paypal_email, type: CurrentUserType.ComplexesOwner } );
      this.store.dispatch(new ShowFlashMessageOnSuccess('Pomyślnie zarejestrowano'));
      this.router.navigate(['/owner']);
    };

    return this.http.post(environment.api.urls.signUp, complexesOwner.dto(), { withCredentials: true })
      .pipe(tap(stateUpdater))
      .subscribe(() => {}, (error) => this.handleError(error));
  }

  // @Action(UserHasSignedIn)
  // userHasSignedIn({ patchState }: StateContext<CurrentUser>, { id, email, displayName }: UserHasSignedIn) {
  //   patchState({ isSignedIn: true, data: { id, email, displayName, type: CurrentUserType.Client} });
  // }
  //
  @Action(SignOut)
  signOut({ setState }: StateContext<CurrentUser>, {}: SignOut) {
    return this.http.delete(environment.api.urls.signOut, { withCredentials: true })
      .pipe(
        tap(() => setState(null)),
      );
  }

  @Action(SignInWithPassword)
  signInWithPassword({ setState }: StateContext<CurrentUser>, { credentials }: SignInWithPassword) {
    const updateState = (response: SignInWithPasswordResponse) => {
            const { id, email, paypal_email } = response;
            setState({ id, email, paypalEmail: paypal_email, type: CurrentUserType.ComplexesOwner });
    }, updateUI = () => {
      this.store.dispatch(new ShowFlashMessageOnSuccess('Pomyślnie zalogowano'));
      this.router.navigate(['/owner']);
    };

    return this.http.post(environment.api.urls.signIn(CurrentUserType.ComplexesOwner), credentials.dto(), { withCredentials: true })
      .pipe(
        tap((response: SignInWithPasswordResponse) => updateState(response)),
        tap(() => updateUI())
      );
  }

  private handleError(errorResponse: ErrorResponse) {
    console.debug('Error response: ', errorResponse);
    this.store.dispatch(new ShowFlashMessageOnSuccess('Wystąpił błąd'));
  }
  //
  // @Action(UpdateClient)
  // updateClient({ patchState }: StateContext<CurrentUser>, { clientProfile }: UpdateClient) {
  //   const url = environment.api.resource('users', clientProfile.id),
  //         stateUpdater = (response) => patchState({ isSignedIn: true, data: { email: response.email, id: response.id,
  //                                                                             displayName: response.display_name,
  //                                                                             type: CurrentUserType.Regular,
  //                                                                             paypalEmail: response.paypal_email }});
  //
  //   return this.http.patch(url, clientProfile.dto(), { withCredentials: true })
  //     .pipe(
  //       tap((response) => stateUpdater(response))
  //     );
  // }
}
