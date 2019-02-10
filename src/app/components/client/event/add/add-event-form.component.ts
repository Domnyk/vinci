import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NewEvent } from '../../../../models/new-event';
import { Select, Store } from '@ngxs/store';
import { CreateEvent } from './add-event-form.actions';
import { CurrentUser } from '../../../../models/current-user';
import { Observable, of } from 'rxjs';
import { ModalActionType } from '../../../../models/modal-action-type';
import { filter, flatMap, map } from 'rxjs/operators';
import { CurrentUserType } from '../../../../models/current-user-type';
import { FormHelper } from '../../../../helpers/form.helper';
import { MetaSelectorsService } from '../../../../services/meta-selectors.service';
import { CalendarEvent } from 'angular-calendar';
import { isEqual } from 'date-fns';

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
    const todayEvents$: Observable<Array<CalendarEvent>> = this.store.select(MetaSelectorsService.allEvents).pipe(
      map((events: CalendarEvent[]) => {
        return events.filter((event: CalendarEvent) => {
          const eventDay: Date = new Date(event.start.valueOf());
          eventDay.setHours(0);
          eventDay.setMinutes(0);
          eventDay.setSeconds(0);
          eventDay.setMilliseconds(0);

          return isEqual(eventDay, this.eventDay);
        });
      })
    );

    this.event = new NewEvent(todayEvents$);
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
    this.store.dispatch(new CreateEvent(this.arenaId, this.event));
  }

}
