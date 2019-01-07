import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FlashMessage } from '../../../models/flash-message';
import { HideFlashMessage } from '../../../actions/flash-message.actions';
import { FlashMessageStatus } from '../../../models/flash-message-status';

@Component({
  selector: 'app-nested-flash-message',
  templateUrl: './nested-flash-message.component.html',
  styleUrls: ['./nested-flash-message.component.css']
})
export class NestedFlashMessageComponent implements OnInit {
  private static readonly SUCCESS_CLASS = 'alert-success';
  private static readonly SUCCESSFULLY_DESTORYED_CLASS = 'alert-danger';
  private static readonly ERROR_CLASS = 'alert-danger';
  private static readonly DEFAULT_CLASS = 'alert-primary';

  @Select(state => state.flashMessage) message$: Observable<FlashMessage>;

  isMessageToShow = false;
  message: FlashMessage = null;

  constructor(private store: Store) { }

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
      case FlashMessageStatus.CREATED:
        return NestedFlashMessageComponent.SUCCESS_CLASS;
      case FlashMessageStatus.DELETED:
        return NestedFlashMessageComponent.SUCCESSFULLY_DESTORYED_CLASS;
      case FlashMessageStatus.EDITED:
        return NestedFlashMessageComponent.DEFAULT_CLASS;
      case FlashMessageStatus.SUCCESSFUL_OPERATION:
        return NestedFlashMessageComponent.SUCCESS_CLASS;
      case FlashMessageStatus.ERROR:
        return NestedFlashMessageComponent.ERROR_CLASS;
      default:
        return NestedFlashMessageComponent.DEFAULT_CLASS;
    }
  }

  get isTextBold(): boolean {
    return this.message.status === FlashMessageStatus.ERROR;
  }

}
