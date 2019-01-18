import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { startLaterThanEndValidator } from '../components/client/event/add/start-later-than-end.validator';
import { DTO } from '../interfaces/dto';


export class NewEvternalEvent implements DTO {
  eventDay = new FormControl('', [Validators.required]);
  startTime = new FormControl('', [Validators.required]);
  endTime = new FormControl('', [Validators.required]);

  timeFrame = new FormGroup({
    start: this.startTime,
    end: this.endTime
  }, { validators: startLaterThanEndValidator });

  get isValid(): boolean {
    const controls: AbstractControl[] = [this.startTime, this.endTime, this.timeFrame];

    return controls.reduce((prev: boolean, curr: AbstractControl) => prev && curr.valid, true);
  }

  dto(): NewEvternalEventDTO {
    return {
      event_day: this.eventDay.value,
      start_time: this.startTime.value,
      end_time: this.endTime.value
    };
  }
}

export interface NewEvternalEventDTO {
  event_day: string;
  start_time: string;
  end_time: string;
}

