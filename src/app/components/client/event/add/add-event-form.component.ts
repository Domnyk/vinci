import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { startLaterThanEndValidator } from './start-later-than-end.directive';
import { Event } from '../../../../models/event';
import { Store } from '@ngxs/store';
import { CreateEvent } from './add-event-form.actions';

@Component({
  selector: 'app-add-event-form',
  templateUrl: './add-event-form.component.html',
  styleUrls: ['./add-event-form.component.css']
})
export class AddEventFormComponent implements OnInit {
  @Input() arenaId: number;
  @Input() modalId: string;
  @Input() eventDay: Date;

  name: FormControl;
  startTime: FormControl;
  endTime: FormControl;
  minPeople: FormControl;
  maxPeople: FormControl;
  joinPhaseDuration: FormControl;
  paymentPhaseDuration: FormControl;

  timeFrame: FormGroup;


  constructor(private store: Store) {
    this.name = new FormControl('', [Validators.required]);
    this.startTime = new FormControl('', [Validators.required]);
    this.endTime = new FormControl('', [Validators.required]);

    // TODO: Add cross validation to check maxPeople > minPeople
    this.minPeople = new FormControl(1, [Validators.required, Validators.min(1)]);
    this.maxPeople = new FormControl(1, [Validators.required, Validators.min(this.minPeople.value)]);

    this.joinPhaseDuration = new FormControl(1, [Validators.required, Validators.min(1)]);
    this.paymentPhaseDuration = new FormControl(1, [Validators.required, Validators.min(1)]);

    this.timeFrame = new FormGroup({
      start: this.startTime,
      end: this.endTime
    }, { validators: startLaterThanEndValidator });

  }

  ngOnInit() {
  }

  createEvent() {
    const event = new Event(this.name.value, this.eventDay, this.minPeople.value, this.maxPeople.value, this.startTime.value, this.endTime.value,
      this.joinPhaseDuration.value, this.paymentPhaseDuration.value);

    console.debug('Event: ', event.dto());
    this.store.dispatch(new CreateEvent(this.arenaId, event));
  }

}
