import { State, Action, StateContext, Selector } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { SignInWithFb } from '../actions/sign-in.actions';

import { AuthorizationService } from '../services/authorization/authorization.service';
import { FbUser } from '../models/fb-user';

export class UserStateModel {
  token: any
}

@State<UserStateModel>({
  name: 'userCredentials',
  defaults: {
    token: null
  }
})

export class UserState {
  constructor (private authorizationService: AuthorizationService) { }
  
  @Selector()
  static getToken(state: UserStateModel) {
    return state.token;
  }

  @Action(SignInWithFb)
  signInWithFb({getState, patchState}: StateContext<UserStateModel>) {
    return this.authorizationService.signInWithFb()
      .pipe(
        tap(result => this.signInWithFbPatchState(patchState, result)
      ));
  }

  private signInWithFbPatchState(patchState: Function, result: any) {
    console.log(result);
    patchState({ token: result['jwt'] });
  } 
}