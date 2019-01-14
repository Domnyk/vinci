import { CalendarEvent } from 'angular-calendar';
import { parse } from 'date-fns';
import { EventColor } from 'calendar-utils';

export class ExternalEvent implements CalendarEvent {
  public static fromDTO(eventDTO: any): ExternalEvent {
    const start = ExternalEvent.createDatetime(eventDTO.event_day, eventDTO.start_time),
      end = ExternalEvent.createDatetime(eventDTO.event_day, eventDTO.end_time);

    return new ExternalEvent(eventDTO.id, start, 'Wydarzenie zewnętrzne', end, { primary: '#e3bc08', secondary: '#FDF1BA' });
  }

  private static createDatetime(day: string, time: string): Date {
    return parse(day + 'T' + time);
  }

  constructor(
    public id: number,
    public start: Date,
    public title: string,
    public end: Date,
    public color: EventColor
  ) { }
}
