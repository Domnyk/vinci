import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NewEvent } from '../../../../models/new-event';
import { Store } from '@ngxs/store';
import { CreateEvent } from './add-event-form.actions';

@Component({
  selector: 'app-add-event-form',
  templateUrl: './add-event-form.component.html',
  styleUrls: ['./add-event-form.component.css']
})
export class AddEventFormComponent implements OnChanges {
  @Input() arenaId: number;
  @Input() modalId: string;
  @Input() eventDay: Date;

  event: NewEvent;

  constructor(private store: Store) {
    this.event = new NewEvent();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.eventDay) {
      this.event.eventDay = changes.eventDay.currentValue;
    }
  }

  createEvent() {
    console.debug('NewEvent: ', this.event.dto());
    this.store.dispatch(new CreateEvent(this.arenaId, this.event));
  }

}
