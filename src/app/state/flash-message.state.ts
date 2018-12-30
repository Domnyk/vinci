import { Action, State, StateContext, Store } from '@ngxs/store';
import { HideFlashMessage, ShowFlashMessageOnError, ShowFlashMessageOnSuccess } from '../actions/flash-message.actions';
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

  @Action(ShowFlashMessageOnSuccess)
  showFlashMessageOnSuccess({ getState, setState }: StateContext<FlashMessage>, { message }: ShowFlashMessageOnSuccess) {
    this.initTimer(getState);
    setState({ status: FlashMessageStatus.SUCCESS, content: message });
  }

  @Action(ShowFlashMessageOnError)
  showFlashMessageOnError({ getState, setState }: StateContext<FlashMessage>, { message }: ShowFlashMessageOnError) {
    this.initTimer(getState);
    setState({ status: FlashMessageStatus.ERROR, content: message });
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
