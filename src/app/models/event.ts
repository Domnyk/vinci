import { CalendarEvent } from 'angular-calendar';
import { isFuture, isPast, parse } from 'date-fns';
import { CurrentUser } from './current-user';

export class Event implements CalendarEvent {
  public static fromDTO(eventDTO: any): Event {
    const start = Event.createDatetime(eventDTO.event_day, eventDTO.start_time),
          end = Event.createDatetime(eventDTO.event_day, eventDTO.end_time),
          payingEnd = Event.createDate(eventDTO.end_of_paying_phase),
          joiningEnd = Event.createDate(eventDTO.end_of_joining_phase);


    return new Event(eventDTO.id, start, eventDTO.name, end, eventDTO.max_num_of_participants,
                     eventDTO.min_num_of_participants, payingEnd, joiningEnd,
                     Event.parseParticipators(eventDTO.participators));
  }

  constructor(
    public id: number,
    public start: Date,
    public title: string,
    public end: Date,
    public maxParticipants: number,
    public minParticipants: number,
    public payingEnd: Date,
    public joiningEnd: Date,
    public participators: Participator[]
  ) { }

  public isEventInJoinPhase(): boolean {
    return true;
  }

  /**
   * @Deprecated
   * @param user
   */
  public isJoiningPossible(user: CurrentUser): boolean {
    const isSpaceForNextParticipant = this.participators.length < this.maxParticipants;
    const isEventInJoinPhase = true;
    const hasUserJoined = this.participators.filter(p => p.email === user.email).length === 1;

    return isSpaceForNextParticipant && isEventInJoinPhase;
  }

  public isJoiningPossible2(): boolean {
    const isSpaceForNextParticipant = this.participators.length < this.maxParticipants;
    const isEventInJoinPhase = this.isInJoiningPhase();

    return isSpaceForNextParticipant && isEventInJoinPhase;
  }

  public isParticipator(user: CurrentUser): boolean {
    return !!user && this.participators.filter(p => p.id === user.id).length === 1;
  }

  public isInJoiningPhase(): boolean {
    return isFuture(this.joiningEnd);
  }

  public hasUserPaid(user: CurrentUser): boolean {
    if (!!user) {
      const participator = this.participators.filter(p => p.id === user.id)[0];
      return !!participator && participator.hasPaid;
    }

    return false;
  }

  private static createDatetime(day: string, time: string): Date {
    return parse(day + 'T' + time);
  }

  private static createDate(day: string): Date {
    return parse(day);
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


