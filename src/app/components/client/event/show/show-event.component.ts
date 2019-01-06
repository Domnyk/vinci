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
import { ModalActionType } from '../../../../models/modal-action-type';

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

  constructor(public myStore: Store) { }

  ngDoCheck() {
    this.isSignedIn$ = this.myStore.select(CurrentUserState.isSignedIn).pipe(map(filterFn => filterFn()));
  }

  joinEvent(store: Store, eventId: number) {
    return () => store.dispatch(new JoinEvent(eventId));
  }

  resignFromEvent(store: Store, eventId: number) {
    return () => store.dispatch(new ResignFromEvent(eventId));
  }

  pay(store: Store, eventId: number) {
    return () => store.dispatch(new Pay(eventId));
  }

  getActions(): Observable<ModalActionType> {
    return zip(this.isSignedIn$, this.currentUser$).pipe(flatMap(([isSignedIn, user]) => {
      const isParticipator = this.event.isParticipator(user),
            isJoiningPossible = this.event.isJoiningPossible2(),
            isEventInJoinPhase = this.event.isInJoiningPhase(),
            hasUserPaid = this.event.hasUserPaid(user);

      if (!isSignedIn && isJoiningPossible) return of(ModalActionType.SIGN_IN_TO_JOIN);
      if (!isSignedIn && !isJoiningPossible) return of(ModalActionType.SIGN_IN);
      if (isSignedIn && !isParticipator && isJoiningPossible) return of(ModalActionType.JOIN);
      if (isSignedIn && !isParticipator && !isJoiningPossible) return of(ModalActionType.CANT_JOIN);
      if (isSignedIn && isParticipator && isEventInJoinPhase) return of(ModalActionType.RESIGN);
      if (isSignedIn && isParticipator && !isEventInJoinPhase && hasUserPaid) return of(ModalActionType.THANKS_FOR_PAYING);
      if (isSignedIn && isParticipator && !isEventInJoinPhase && !hasUserPaid) return of(ModalActionType.PAY);
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
