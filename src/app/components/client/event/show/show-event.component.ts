import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { JoinEvent, ResignFromEvent } from './show-event.actions';
import { Event, Participator } from '../../../../models/event';
import { Observable, of } from 'rxjs';
import { CurrentUser } from '../../../../models/current-user';
import { flatMap } from 'rxjs/operators';
import { ParticipationStatus } from '../../../../models/participation-status';

@Component({
  selector: 'app-show-event',
  templateUrl: './show-event.component.html',
  styleUrls: ['./show-event.component.css']
})
export class ShowEventComponent implements OnInit {
  @Select(state => state.currentUser) currentUser$: Observable<CurrentUser>;
  @Input() modalId: string;
  @Input() event: Event;
  ParticipationStatus = ParticipationStatus;


  constructor(private store: Store) { }

  ngOnInit() {
  }

  joinEvent() {
    this.store.dispatch(new JoinEvent(this.event.id));
  }

  resignFromEvent() {
    this.store.dispatch(new ResignFromEvent(this.event.id));
  }

  get participationStatus(): Observable<ParticipationStatus> {
    return this.currentUser$.pipe(
      flatMap((currentUser: CurrentUser) => of(this.defineParticipationStatus(currentUser, this.event.participators))
      )
    );
  }

  private defineParticipationStatus(currentUser: CurrentUser, participators: Participator[]): ParticipationStatus {
    console.warn('This method has been changed without appropriate testing. Verify it!');
    if (participators.length !== 0 && this.isUserAParticipator(currentUser, participators)) {
      if (this.hasUserPayed(currentUser, participators)) {
        return ParticipationStatus.PAYED;
      } else {
        return ParticipationStatus.JOINED;
      }
    } else {
      return ParticipationStatus.DID_NOT_JOIN;
    }
  }

  private isUserAParticipator(user: CurrentUser, participators: Participator[]): boolean {
    return participators.filter(participator => participator.email === user.email) !== [];
  }

  private hasUserPayed(user: CurrentUser, participators: Participator[]): boolean {
    const [currentUser] = participators.filter(participator => participator.email === user.email);

    return !!currentUser && currentUser.hasPaid;
  }
}
