import { Action, State, StateContext } from '@ngxs/store';
import {
  HideFlashMessage,
  ShowFlashMessageOnCreated,
  ShowFlashMessageOnDeleted,
  ShowFlashMessageOnEdited,
  ShowFlashMessageOnError,
  ShowFlashMessageOnSuccessfulOperation
} from '../actions/flash-message.actions';
import { FlashMessage } from '../models/flash-message';
import { FlashMessageStatus } from '../models/flash-message-status';


@State<FlashMessage>({
  name: 'flashMessage',
  defaults: null
})
export class FlashMessageState {
  constructor() { }

  @Action(ShowFlashMessageOnSuccessfulOperation)
  showFlashMessageOnSuccess({ getState, setState }: StateContext<FlashMessage>, { message }: ShowFlashMessageOnSuccessfulOperation) {
    setState({ status: FlashMessageStatus.SUCCESSFUL_OPERATION, content: message });
  }

  @Action(ShowFlashMessageOnError)
  showFlashMessageOnError({ getState, setState }: StateContext<FlashMessage>, { message }: ShowFlashMessageOnError) {
    setState({ status: FlashMessageStatus.ERROR, content: message });
  }

  @Action(ShowFlashMessageOnCreated)
  showFlashMessageOnCreated({ getState, setState }: StateContext<FlashMessage>, { message }: ShowFlashMessageOnCreated) {
    setState({ status: FlashMessageStatus.CREATED, content: message });
  }

  @Action(ShowFlashMessageOnDeleted)
  showFlashMessageOnDeleted({ getState, setState }: StateContext<FlashMessage>, { message }: ShowFlashMessageOnDeleted) {
    setState({ status: FlashMessageStatus.DELETED, content: message });
  }

  @Action(ShowFlashMessageOnEdited)
  showFlashMessageOnEdited({ getState, setState }: StateContext<FlashMessage>, { message }: ShowFlashMessageOnEdited) {
    setState({ status: FlashMessageStatus.EDITED, content: message });
  }

  @Action(HideFlashMessage)
  hideFlashMessage({ setState }: StateContext<FlashMessage>) {
    setState(null);
  }
}
