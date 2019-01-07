import { Action, State, StateContext, Store } from '@ngxs/store';
import { HideFlashMessage, ShowFlashMessageOnCreated, ShowFlashMessageOnDeleted, ShowFlashMessageOnEdited,
  ShowFlashMessageOnError, ShowFlashMessageOnSuccessfulOperation } from '../actions/flash-message.actions';
import { FlashMessage } from '../models/flash-message';
import { FlashMessageStatus } from '../models/flash-message-status';
import { environment } from '../../environments/environment.generated.dev';
import { timer } from 'rxjs';

@State<FlashMessage>({
  name: 'flashMessage',
  defaults: null
})
export class FlashMessageState {
  constructor(private store: Store) { }

  @Action(ShowFlashMessageOnSuccessfulOperation)
  showFlashMessageOnSuccess({ getState, setState }: StateContext<FlashMessage>, { message }: ShowFlashMessageOnSuccessfulOperation) {
    this.initTimer(getState);
    setState({ status: FlashMessageStatus.SUCCESSFUL_OPERATION, content: message });
  }

  @Action(ShowFlashMessageOnError)
  showFlashMessageOnError({ getState, setState }: StateContext<FlashMessage>, { message }: ShowFlashMessageOnError) {
    this.initTimer(getState);
    setState({ status: FlashMessageStatus.ERROR, content: message });
  }

  @Action(ShowFlashMessageOnCreated)
  showFlashMessageOnCreated({ getState, setState }: StateContext<FlashMessage>, { message }: ShowFlashMessageOnCreated) {
    this.initTimer(getState);
    setState({ status: FlashMessageStatus.CREATED, content: message });
  }

  @Action(ShowFlashMessageOnDeleted)
  showFlashMessageOnDeleted({ getState, setState }: StateContext<FlashMessage>, { message }: ShowFlashMessageOnDeleted) {
    this.initTimer(getState);
    setState({ status: FlashMessageStatus.DELETED, content: message });
  }

  @Action(ShowFlashMessageOnEdited)
  showFlashMessageOnEdited({ getState, setState }: StateContext<FlashMessage>, { message }: ShowFlashMessageOnEdited) {
    this.initTimer(getState);
    setState({ status: FlashMessageStatus.EDITED, content: message });
  }

  @Action(HideFlashMessage)
  hideFlashMessage({ setState }: StateContext<FlashMessage>) {
    setState(null);
  }

  private initTimer(getState: () => FlashMessage, timeout?: number) {
    const _timeout = !!timeout ? timeout : environment.flashTimeout,
      t = timer(_timeout);

    t.subscribe(() => {
      if (!!getState()) {
        this.store.dispatch(new HideFlashMessage());
      }
    });
  }
}
