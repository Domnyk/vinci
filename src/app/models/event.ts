import { Time } from '@angular/common';
import { DTO } from './dto';
import { addDays } from 'date-fns';

export class Event implements DTO {
  constructor(
    public day: Date,
    public minParticipants,
    public maxParticipants,
    public startTime: Time,
    public endTime: Time,
    public daysForJoining: number,
    public daysForPaying: number,
    public title: string
  ) { }

  public dto(): EventDTO {
    const endOfJoiningPhase: Date = addDays(this.day, this.daysForJoining),
          endOfPayingPhase: Date = addDays(endOfJoiningPhase, this.daysForPaying);

    console.log('daysForJoining: ', this.daysForJoining);
    console.log('joining: ', endOfJoiningPhase);
    console.log('paying: ', endOfPayingPhase);

    return {
      event: {
        day: this.day,
        title: this.title,
        min_participants: this.minParticipants,
        max_participants: this.maxParticipants,
        end_of_joining_phase: endOfJoiningPhase,
        end_of_paying_phase: endOfPayingPhase,
        start_time: this.startTime,
        end_time: this.endTime;
      }
    };

  }
}


interface EventDTO {
  event: {
    day: Date
    title: string;
    min_participants: number;
    max_participants: number;
    end_of_joining_phase: Date;
    end_of_paying_phase: Date;
    start_time: Time;
    end_time: Time;
  };
}
