import { Action, State, StateContext } from '@ngxs/store';
import { HideFlashMessage, ShowFlashMessage } from '../actions/flash-message.actions';

@State<string>({
  name: 'flashMessage',
  defaults: null
})
export class FlashMessageState {

  @Action(ShowFlashMessage)
  showFlashMessage({ setState }: StateContext<string>, { message }: ShowFlashMessage) {
    setState(message);
  }

  @Action(HideFlashMessage)
  hideFlasMessage({ setState }: StateContext<string>) {
    setState(null);
  }
}
