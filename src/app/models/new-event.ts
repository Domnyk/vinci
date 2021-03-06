import { DTO } from '../interfaces/dto';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { startLaterThanEndValidator } from '../components/client/event/add/start-later-than-end.validator';
import { addDays } from 'date-fns';
import { DateHelper } from '../helpers/date.helper';
import { CustomTime } from './custom-time';
import { minBiggerThanMaxValidator } from '../components/client/event/add/min-bigger-than-max.validator';
import { CalendarEvent } from 'angular-calendar';
import { Observable } from 'rxjs';
import { eventsOverlapValidator } from '../components/client/event/add/events-overlap.validator';

export class NewEvent implements DTO {
  eventDay: Date = null;
  name: FormControl = null;
  startTime: FormControl = null;
  endTime: FormControl = null;
  minParticipants: FormControl = null;
  maxParticipants: FormControl = null;
  joinPhaseDuration: FormControl = null;
  paymentPhaseDuration: FormControl = null;
  timeFrame: FormGroup = null;
  minMaxParticipants: FormGroup = null;

  private internalData: { startTime: CustomTime, endTime: CustomTime };

  constructor(allEvents$: Observable<Array<CalendarEvent>>) {


    this.name = new FormControl('', [Validators.required]);
    this.startTime = new FormControl('', [Validators.required]);
    this.endTime = new FormControl('', [Validators.required]);

    this.minParticipants = new FormControl(1, [Validators.required, Validators.min(1)]);
    this.maxParticipants = new FormControl(1, [Validators.required, Validators.min(1)]);
    this.minMaxParticipants = new FormGroup({
      minParticipants: this.minParticipants,
      maxParticipants: this.maxParticipants,
    }, { validators: minBiggerThanMaxValidator });

    this.joinPhaseDuration = new FormControl(1, [Validators.required, Validators.min(1)]);
    this.paymentPhaseDuration = new FormControl(1, [Validators.required, Validators.min(1)]);

    this.timeFrame = new FormGroup({
      start: this.startTime,
      end: this.endTime
    }, { validators: startLaterThanEndValidator, asyncValidators: eventsOverlapValidator(allEvents$) });

    this.internalData = {
      startTime: null,
      endTime: null,
    };

    this.handleChanges();
  }

  get isValid(): boolean {

    const controls: AbstractControl[] = [
      this.name, this.startTime, this.endTime, this.minParticipants, this.maxParticipants, this.joinPhaseDuration,
      this.paymentPhaseDuration, this.timeFrame
    ];

    return controls.reduce((prev: boolean, curr: AbstractControl) => prev && curr.valid, true);
  }

  dto(): NewEventDTO {
    const endOfJoiningPhase: Date = addDays(new Date(), this.joinPhaseDuration.value),
      endOfPayingPhase: Date = addDays(endOfJoiningPhase, this.paymentPhaseDuration.value);

    return {
      event: {
        name: this.name.value,
        event_day: DateHelper.toCustomDate(this.eventDay),
        min_num_of_participants: this.minParticipants.value,
        max_num_of_participants: this.maxParticipants.value,
        end_of_joining_phase: DateHelper.toCustomDate(endOfJoiningPhase),
        end_of_paying_phase: DateHelper.toCustomDate(endOfPayingPhase),
        start_time: this.internalData.startTime,
        end_time: this.internalData.endTime
      }
    };
  }

  private handleChanges() {
    const parseTime = (time: string): Array<number> => time.split(':').map(timePiece => +timePiece);

    this.startTime.valueChanges.subscribe((val: string) => {
      const [hour, minute] = parseTime(val);
      this.internalData.startTime = { hour: hour, minute: minute };
    });

    this.endTime.valueChanges.subscribe((val: string) => {
      const [hour, minute] = parseTime(val);
      this.internalData.endTime = { hour: hour, minute: minute };
    });
  }
}

interface NewEventDTO {
  event: {
    name: string;
    event_day: CustomDate
    min_num_of_participants: number;
    max_num_of_participants: number;
    end_of_joining_phase: CustomDate;
    end_of_paying_phase: CustomDate;
    start_time: CustomTime;
    end_time: CustomTime;
  };
}
