import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { startLaterThanEndValidator } from './start-later-than-end.directive';

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

    this.minPeople = new FormControl(1, [Validators.required, Validators.min(1)]);

    // maxPeople is more complex - custom validator required to check that maxPeople > minPeople
    // Maybe use Validators.min ?
    // this.maxPeople = new FormControl(1, [Validators.required, Validators.min(this.minPeople.value)]);

    this.joinPhaseDuration = new FormControl(1, [Validators.required, Validators.min(1)]);
    this.paymentPhaseDuration = new FormControl(1, [Validators.required, Validators.min(1)]);

    this.timeFrame = new FormGroup({
      start: this.startTime,
      end: this.endTime
    }, { validators: startLaterThanEndValidator });

  }

  ngOnInit() {
  }

}
