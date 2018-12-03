import { CalendarEvent } from 'angular-calendar';

export class CustomEventView implements CalendarEvent{
  public static fromDTO(dto: any): CustomEventView {
    console.warn('Model.CustomEventView.fromDTO() returns object with only nulls');

    return new CustomEventView(null, null, null, null, null, null);
  }

  constructor(
    public start: Date,
    public title: string,
    public end: Date,
    public maxParticipants: number,
    public minParticipants: number,
    public users: User[]
  ) { }
}

interface User {
  displayName: string;
}
