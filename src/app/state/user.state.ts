import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SignInUser } from '../actions/user.actions';

export class UserStateModel {
  user: {}
}

@State<UserStateModel>({
  name: 'userDataFromSignInForm',
  defaults: {
    user: {
      name: 'John Cena',
      password: 'Very secret password'
    }
  }
})

export class UserState {
  @Selector()
  static getUser(state: UserStateModel) {
    return state.user;
  }

  @Action(SignInUser)
  add({getState, patchState}: StateContext<UserStateModel>, { payload }: SignInUser) {
    const state = getState();
    patchState({
      user: {
        name: payload.name,
        password: payload.password
      }
    })
  }
}