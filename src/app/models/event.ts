import { CalendarEvent } from 'angular-calendar';

export class Event implements CalendarEvent {
  constructor(
    public id: number,
    public title: string,
    public start: Date
  ) { }
}

export interface EventParams {
  id?: number;
  title: string;
  start: Date;
}
