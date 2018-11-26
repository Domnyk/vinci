import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { startLaterThanEndValidator } from './start-later-than-end.directive';
import { Event } from '../../../models/event';

@Component({
  selector: 'app-add-event-form',
  templateUrl: './add-event-form.component.html',
  styleUrls: ['./add-event-form.component.css']
})
export class AddEventFormComponent implements OnInit {
  @Input() modalId: string;

  name: FormControl;
  startTime: FormControl;
  endTime: FormControl;
  minPeople: FormControl;
  maxPeople: FormControl;
  joinPhaseDuration: FormControl;
  paymentPhaseDuration: FormControl;

  timeFrame: FormGroup;


  constructor() {
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
    const day = new Date();

    const event = new Event(day, this.minPeople.value, this.maxPeople.value, this.startTime.value, this.endTime.value,
      this.joinPhaseDuration.value, this.paymentPhaseDuration.value, this.name.value);

    console.debug('Event: ', event.dto());
  }

}
