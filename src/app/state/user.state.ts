import { Action, State, StateContext, Store } from '@ngxs/store';

import { UserHasSignedIn } from '../actions/sign-in.actions';
import { CurrentUser, UserType } from '../models/current-user';
import { SignUpComplexesOwner } from '../actions/user.actions';
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

  private handleError(errorResponse: ErrorResponse) {
    console.debug('Error response: ', errorResponse);
    this.store.dispatch(new ShowFlashMessage('Wystąpił błąd'));
  }
}
