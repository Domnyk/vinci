import { DTO } from './dto';
import { addDays } from 'date-fns';
import { CustomTime } from './custom-time';
import { DateHelper } from '../helpers/date.helper';


export class Event implements DTO {
  private startTime: CustomTime;
  private endTime: CustomTime;

  constructor(
    public name: string,
    public day: Date,
    public minParticipants,
    public maxParticipants,
    startTime: string,
    endTime: string,
    public daysForJoining: number,
    public daysForPaying: number,
  ) {
    const [startHour, startMinute] = startTime.split(':').map((elem: string) => +elem);
    this.startTime = { hour: startHour, minute: startMinute };

    const [endHour, endMinute] = endTime.split(':').map((elem: string) => +elem);
    this.endTime = { hour: endHour, minute: endMinute };
  }

  public dto(): any {
    console.warn('Data type returned by Event.dto() is any!');

    const endOfJoiningPhase: Date = addDays(new Date(), this.daysForJoining),
          endOfPayingPhase: Date = addDays(endOfJoiningPhase, this.daysForPaying);

    return {
      event: {
        name: this.name,
        event_day: DateHelper.toCustomDate(this.day),
        min_num_of_participants: this.minParticipants,
        max_num_of_participants: this.maxParticipants,
        end_of_joining_phase: DateHelper.toCustomDate(endOfJoiningPhase),
        end_of_paying_phase: DateHelper.toCustomDate(endOfPayingPhase),
        start_time: this.startTime,
        end_time: this.endTime
      }
    };

  }
}
