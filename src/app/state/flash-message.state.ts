import { Action, State, StateContext } from '@ngxs/store';
import { HideFlashMessage, ShowFlashMessageOnError, ShowFlashMessageOnSuccess } from '../actions/flash-message.actions';
import { FlashMessage } from '../models/flash-message';
import { FlashMessageStatus } from '../models/flash-message-status';

@State<FlashMessage>({
  name: 'flashMessage',
  defaults: null
})
export class FlashMessageState {

  @Action(ShowFlashMessageOnSuccess)
  showFlashMessageOnSuccess({ setState }: StateContext<FlashMessage>, { message }: ShowFlashMessageOnSuccess) {
    setState({ status: FlashMessageStatus.SUCCESS, content: message });
  }

  @Action(ShowFlashMessageOnError)
  showFlashMessageOnError({ setState }: StateContext<FlashMessage>, { message }: ShowFlashMessageOnError) {
    setState({ status: FlashMessageStatus.ERROR, content: message });
  }

  @Action(HideFlashMessage)
  hideFlasMessage({ setState }: StateContext<FlashMessage>) {
    setState(null);
  }
}
