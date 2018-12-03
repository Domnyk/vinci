import { DTO } from './dto';
import { addDays } from 'date-fns';

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

  public dto(): EventDTO {
    const endOfJoiningPhase: Date = addDays(new Date(), this.daysForJoining),
          endOfPayingPhase: Date = addDays(endOfJoiningPhase, this.daysForPaying);

    return {
      event: {
        name: this.name,
        event_day: toCustomDate(this.day),
        min_num_of_participants: this.minParticipants,
        max_num_of_participants: this.maxParticipants,
        end_of_joining_phase: toCustomDate(endOfJoiningPhase),
        end_of_paying_phase: toCustomDate(endOfPayingPhase),
        start_time: this.startTime,
        end_time: this.endTime
      }
    };

  }
}

function toCustomDate(date: Date): CustomDate {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate()
  };
}


interface EventDTO {
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

export interface CustomTime {
  hour: number;
  minute: number;
}

/*
 * First day's number: 1
 * First month's number: 1
 */
interface CustomDate {
  year: number;
  month: number;
  day: number;
}
