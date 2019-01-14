import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import { SignInWithPassword, UserHasSignedIn } from '../actions/sign-in.actions';
import { CurrentUser } from '../models/current-user';
import { SignOut, SignUpComplexesOwner } from '../actions/user.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.generated.dev';
import { catchError, tap } from 'rxjs/operators';
import { ShowFlashMessageOnEdited, ShowFlashMessageOnSuccessfulOperation } from '../actions/flash-message.actions';
import { Router } from '@angular/router';
import { SignUpComplexesOwnerResponse } from '../models/api-responses/sign-up-complexes-owner-response';
import { CurrentUserType } from '../models/current-user-type';
import { SignInWithPasswordResponse } from '../models/api-responses/sign-in-with-password-response';
import { UpdateClient } from '../components/client/client-profile/profile.actions';
import { handleError } from './error-handler';
import { UpdateOwner } from '../components/owner/owner-profile/owner-profile.actions';


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
      setState( { id, email, paypalEmail: paypal_email, type: CurrentUserType.ComplexesOwner } );
      this.store.dispatch(new ShowFlashMessageOnSuccessfulOperation('Pomyślnie zarejestrowano'));
      this.router.navigate(['/owner']);
    };

    return this.http.post(environment.api.urls.signUp, complexesOwner.dto(), { withCredentials: true }).pipe(
      tap(stateUpdater),
      catchError(error => handleError(error, this.store))
    );
  }

  @Action(UserHasSignedIn)
  userHasSignedIn({ patchState }: StateContext<CurrentUser>, { id, paypalEmail, displayName }: UserHasSignedIn) {
    patchState({ id, paypalEmail, displayName, type: CurrentUserType.Client });
  }

  @Action(SignOut)
  signOut({ setState }: StateContext<CurrentUser>, {}: SignOut) {
    setState(null);
    return this.http.delete(environment.api.urls.signOut, { withCredentials: true }).pipe(
      tap(() => this.router.navigate(['/']))
    );
  }

  @Action(SignInWithPassword)
  signInWithPassword({ setState }: StateContext<CurrentUser>, { credentials }: SignInWithPassword) {
    const updateState = (response: SignInWithPasswordResponse) => {
            const { id, email, paypal_email } = response;
            setState({ id, email, paypalEmail: paypal_email, type: CurrentUserType.ComplexesOwner });
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

  @Action(UpdateOwner)
  updateOwner({ patchState }: StateContext<CurrentUser>, { ownerProfile }: UpdateOwner) {
    const url = environment.api.resource('users', ownerProfile.id),
      updateState = ({ paypal_email: paypalEmail, display_name: displayName }: Owner) => {
        return patchState({ displayName, paypalEmail, type: CurrentUserType.ComplexesOwner });
      };

    return this.http.patch(url, ownerProfile.dto(), { withCredentials: true }).pipe(
      tap((owner: Owner) => updateState(owner)),
      tap(() => this.store.dispatch(new ShowFlashMessageOnEdited('Pomyślnie zakutualizowano profil'))),
      catchError(error => handleError(error, this.store))
    );
  }

  @Action(UpdateClient)
  updateClient({ patchState }: StateContext<CurrentUser>, { clientProfile }: UpdateClient) {
    const url = environment.api.resource('users', clientProfile.id),
          updateState = ({ paypal_email: paypalEmail, display_name: displayName }: Client) => {
            return patchState({ displayName, paypalEmail, type: CurrentUserType.Client });
          };

    return this.http.patch(url, clientProfile.dto(), { withCredentials: true }).pipe(
      tap((client: Client) => updateState(client)),
      tap(() => this.store.dispatch(new ShowFlashMessageOnEdited('Pomyślnie zakutualizowano profil'))),
      catchError(error => handleError(error, this.store))
    );
  }
}

interface Owner {
  display_name: string;
  paypal_email: string;
}

interface Client {
  paypal_email: string;
  display_name: string;
}
