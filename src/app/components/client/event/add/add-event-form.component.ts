import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NewEvent } from '../../../../models/new-event';
import { Select, Store } from '@ngxs/store';
import { CreateEvent } from './add-event-form.actions';
import { CurrentUser } from '../../../../models/current-user';
import { Observable, of } from 'rxjs';
import { ModalActionType } from '../../../../models/modal-action-type';
import { flatMap } from 'rxjs/operators';
import { CurrentUserType } from '../../../../models/current-user-type';
import { FormHelper } from '../../../../helpers/form.helper';

@Component({
  selector: 'app-add-event-form',
  templateUrl: './add-event-form.component.html',
  styleUrls: ['./add-event-form.component.css']
})
export class AddEventFormComponent implements OnChanges {
  @Input() arenaId: number;
  @Input() modalId: string;
  @Input() eventDay: Date;

  @Select(state => state.currentUser) user$: Observable<CurrentUser>;

  isInvalid = FormHelper.isFormControlInvalid;

  ModalActionType = ModalActionType;

  event: NewEvent;

  constructor(private store: Store) {
    this.event = new NewEvent();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.eventDay) {
      this.event.eventDay = changes.eventDay.currentValue;
    }
  }

  getActions(): Observable<ModalActionType> {
    return this.user$.pipe(
      flatMap(user => {
        if (!!user && user.type === CurrentUserType.Client) { return of(ModalActionType.CREATE_EVENT); }
        if (!!user && user.type === CurrentUserType.ComplexesOwner) { return of(ModalActionType.OWNER_CANT_DO_THIS); }
        return of(ModalActionType.SIGN_IN);
      })
    );
  }

  createEvent() {
    console.debug('NewEvent: ', this.event.dto());
    this.store.dispatch(new CreateEvent(this.arenaId, this.event));
  }

}
