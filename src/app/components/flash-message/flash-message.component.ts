import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { HideFlashMessage } from '../../actions/flash-message.actions';
import { FlashMessage } from '../../models/flash-message';
import { FlashMessageStatus } from '../../models/flash-message-status';

@Component({
  selector: 'app-flash-message',
  templateUrl: './flash-message.component.html',
  styleUrls: ['./flash-message.component.css']
})
export class FlashMessageComponent implements OnInit {
  private static readonly SUCCESS_CLASS = 'alert-success';
  private static readonly ERROR_CLASS = 'alert-danger';
  private static readonly DEFAULT_CLASS = 'alert-primary';

  @Select(state => state.flashMessage) message$: Observable<FlashMessage>;

  isMessageToShow = false;
  message: FlashMessage = null;

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.message$.subscribe((msg: FlashMessage) => {
      this.isMessageToShow = !!msg;
      this.message = msg;
    });
  }

  hide() {
    this.store.dispatch(new HideFlashMessage());
  }

  get alertColor(): string {
    switch (this.message.status) {
      case FlashMessageStatus.SUCCESS:
        return FlashMessageComponent.SUCCESS_CLASS;
      case FlashMessageStatus.ERROR:
        return FlashMessageComponent.ERROR_CLASS;
      default:
        return FlashMessageComponent.DEFAULT_CLASS;
    }
  }

}
