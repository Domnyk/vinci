import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { HideFlashMessage } from '../../actions/flash-message.actions';

@Component({
  selector: 'app-flash-message',
  templateUrl: './flash-message.component.html',
  styleUrls: ['./flash-message.component.css']
})
export class FlashMessageComponent implements OnInit {
  @Select(state => state.flashMessage) message$: Observable<string>;

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
  }

  onClick() {
    this.store.dispatch(new HideFlashMessage());
  }

}
