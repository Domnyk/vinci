import { CalendarEvent } from 'angular-calendar';
import { parse } from 'date-fns';

export class Event implements CalendarEvent {
  public static fromDTO(eventDTO: any): Event {
    const start = Event.createDate(eventDTO.event_day, eventDTO.start_time),
          end = Event.createDate(eventDTO.event_day, eventDTO.end_time);


    return new Event(eventDTO.id, start, eventDTO.name, end, eventDTO.max_num_of_participants,
                     eventDTO.min_num_of_participants, Event.parseParticipators(eventDTO.participators));
  }

  constructor(
    public id: number,
    public start: Date,
    public title: string,
    public end: Date,
    public maxParticipants: number,
    public minParticipants: number,
    public participators: Participator[]
  ) { }

  private static createDate(day: string, time: string): Date {
    return parse(day + 'T' + time);
  }

  private static parseParticipators(participatorsDTO: any[]): Participator[] {
    return participatorsDTO.map(participatorDTO => Event.parseParticipator(participatorDTO));
  }

  private static parseParticipator(participatorDTO: any): Participator {
    return {
      id: participatorDTO.id,
      email: participatorDTO.email,
      displayName: participatorDTO.display_name,
      hasPaid: participatorDTO.has_paid,
      isEventOwner: participatorDTO.is_event_owner
    };
  }
}

export interface Participator {
  id: number;
  email: string;
  displayName: string;
  hasPaid: boolean;
  isEventOwner: boolean;
}


