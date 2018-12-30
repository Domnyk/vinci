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
  showFlashMessageOnSuccess({ setState }: StateContext<FlashMessage>, { message }: ShowFlashMessageOnSuccess) {
    this.initTimer();
    setState({ status: FlashMessageStatus.SUCCESS, content: message });
  }

  @Action(ShowFlashMessageOnError)
  showFlashMessageOnError({ setState }: StateContext<FlashMessage>, { message }: ShowFlashMessageOnError) {
    this.initTimer();
    setState({ status: FlashMessageStatus.ERROR, content: message });
  }

  @Action(HideFlashMessage)
  hideFlashMessage({ setState }: StateContext<FlashMessage>) {
    setState(null);
  }

  private initTimer(timeout?: number) {
    const _timeout = !!timeout ? timeout : environment.flashTimeout,
      t = timer(_timeout);

    t.subscribe(() => this.store.dispatch(new HideFlashMessage()));
  }
}
