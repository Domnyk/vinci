import { Component, DoCheck, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { JoinEvent, Pay, ResignFromEvent } from './show-event.actions';
import { Event, Participator } from '../../../../models/event';
import { Observable, of, zip } from 'rxjs';
import { CurrentUser } from '../../../../models/current-user';
import { flatMap, map } from 'rxjs/operators';
import { ParticipationStatus } from '../../../../models/participation-status';
import { format } from 'date-fns';
import * as pl from 'date-fns/locale/pl';
import { CurrentUserState } from '../../../../state/user.state';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.css']
})
export class ShowEventComponent implements DoCheck {
  private static readonly timeFormat = 'HH:mm';
  private static readonly dateTimeFormat = 'DD MMM YYYY ' + ShowEventComponent.timeFormat;

  @Select(state => state.currentUser) currentUser$: Observable<CurrentUser>;
  isSignedIn$: Observable<boolean>;
  @Input() modalId: string;
  @Input() event: Event;
  ParticipationStatus = ParticipationStatus;

  constructor(private store: Store) { }

  ngDoCheck() {
    this.isSignedIn$ = this.store.select(CurrentUserState.isSignedIn).pipe(map(filterFn => filterFn()));
  }

  joinEvent() {
    this.store.dispatch(new JoinEvent(this.event.id));
  }

  resignFromEvent() {
    this.store.dispatch(new ResignFromEvent(this.event.id));
  }

  pay() {
    this.store.dispatch(new Pay(this.event.id));
  }

  get userStatus(): Observable<ParticipationStatus> {
    return this.currentUser$.pipe(
      flatMap((currentUser: CurrentUser) => of(this.defineParticipationStatus(currentUser, this.event.participators))
      )
    );
  }

  getActions(): Observable<string> {
    return zip(this.isSignedIn$, this.currentUser$).pipe(flatMap(([isSignedIn, user]) => {
      const isParticipator = this.event.isParticipator(user),
            isJoiningPossible = this.event.isJoiningPossible2(),
            isEventInJoinPhase = this.event.isInJoiningPhase(),
            hasUserPaid = this.event.hasUserPaid(user);

      if (!isSignedIn && isJoiningPossible) return of('Zaloguj się aby dołączyć');
      if (!isSignedIn && !isJoiningPossible) return of('Zaloguj się');
      if (isSignedIn && !isParticipator && isJoiningPossible) return of('Dołącz');
      if (isSignedIn && !isParticipator && !isJoiningPossible) return of('Do tego wydarzenia nie można już dołączyć');
      if (isSignedIn && isParticipator && isEventInJoinPhase) return of('Zrezygnuj');
      if (isSignedIn && isParticipator && !isEventInJoinPhase && hasUserPaid) return of('Dziękujemy za dokonanie płatności');
      if (isSignedIn && isParticipator && !isEventInJoinPhase && !hasUserPaid) return of('Zapłać');
    }));
  }

  formatTime(time: Date): string {
    return format(time, ShowEventComponent.timeFormat, { locale: pl });
  }

  formatDateTime(date: Date): string {
    return format(date, ShowEventComponent.dateTimeFormat, { locale: pl });
  }

  private defineParticipationStatus(currentUser: CurrentUser, participators: Participator[]): ParticipationStatus {
    if (!!currentUser && participators.length !== 0 && this.isUserAParticipator(currentUser, participators)) {
      if (this.hasUserPayed(currentUser, participators)) {
        return ParticipationStatus.PAYED;
      } else {
        return ParticipationStatus.JOINED;
      }
    } else {
      return !!currentUser ? ParticipationStatus.DID_NOT_JOIN : ParticipationStatus.NOT_SIGNED_IN;
    }
  }

  private isUserAParticipator(user: CurrentUser, participators: Participator[]): boolean {
    return participators.filter(p => p.email === user.email).length !== 0;
  }

  private hasUserPayed(user: CurrentUser, participators: Participator[]): boolean {
    const [currentUser] = participators.filter(participator => participator.email === user.email);

    return !!currentUser && currentUser.hasPaid;
  }
}
