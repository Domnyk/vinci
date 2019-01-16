import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { FetchEvents } from '../components/owner/calendar/calendar.actions';
import { environment } from '../../environments/environment.generated.dev';
import { HttpClient } from '@angular/common/http';
import { catchError, flatMap, tap } from 'rxjs/operators';
import { ErrorResponse } from '../models/api-response';
import { ShowFlashMessageOnDeleted, ShowFlashMessageOnSuccessfulOperation } from '../actions/flash-message.actions';
import { of } from 'rxjs';
import { Event, Participator } from '../models/event';
import { CreateEvent } from '../components/client/event/add/add-event-form.actions';
import { JoinEvent, Pay, ResignFromEvent } from '../components/client/event/show/show-event.actions';
import { CurrentUser } from '../models/current-user';
import { JoinEventResponse } from '../models/api-responses/join-event-response';
import { handleError } from './error-handler';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

type Events = Array<Event>;

@State<Events>({
  name: 'Events',
  defaults: []
})
export class EventState {
  private static readonly events = 'events';
  private static readonly participators = 'participators';
  private static readonly arenas = 'sport_arenas';

  constructor(private http: HttpClient, private store: Store, @Inject(DOCUMENT) private document: any) { }

  @Selector()
  static getById(state: Events) {
    return (id: number) => {
      return state.filter(event => event.id === +id)[0];
    };
  }

  @Action(FetchEvents)
  fetchEvents({ getState, setState }: StateContext<Events>, { sportArenaId }: FetchEvents) {
    const stateUpdater = (events: Event[]) => {
      setState(events);
    };

    return this.http.get(environment.api.resource(EventState.arenas, sportArenaId, EventState.events), { withCredentials: true })
      .pipe(
        flatMap((response: any[]) => of(response.map(dto => Event.fromDTO(dto)))),
        tap(stateUpdater)
      );
  }

  @Action(CreateEvent)
  createEvent({ dispatch, getState, setState }: StateContext<Events>, { arenaId, event }: CreateEvent) {
    const stateUpdater = (response: any) => {
      const oldState = getState(),
            newState = [...oldState, Event.fromDTO(response)];

      setState(newState);
      return dispatch(new ShowFlashMessageOnSuccessfulOperation('Utworzono nowe wydarzenie'));
    };

    return this.http.post(environment.api.resource(EventState.arenas, arenaId, EventState.events), event.dto(), { withCredentials: true })
      .pipe(
        tap((response) => stateUpdater(response)),
        catchError(error => handleError(error, this.store))
      );
  }

  @Action(JoinEvent)
  joinEvent({ dispatch, getState, setState }: StateContext<Events>, { eventId }: JoinEvent) {
    const stateUpdater = (response: JoinEventResponse) => {
      this.store.select(state => state.currentUser).subscribe((currentUser: CurrentUser) => {
        const { user_id: id, has_paid: hasPaid, is_event_owner: isEventOwner } = response,
              oldEvents = getState().filter(event => event.id !== eventId),
              [eventToModification] = getState().filter(event => event.id === eventId),
              participators = eventToModification.participators,
              newParticipator: Participator = { displayName: currentUser.displayName, email: currentUser.email,
                                                id: id, hasPaid: hasPaid, isEventOwner: isEventOwner },
              newParticipators = [...participators, newParticipator];

        eventToModification.participators = newParticipators;
        setState([...oldEvents, eventToModification]);
        return dispatch(new ShowFlashMessageOnSuccessfulOperation('Dołączono do wydarzenia'));
      });
    };

    return this.http.post(environment.api.resource(EventState.events, eventId, EventState.participators), {} , { withCredentials: true })
      .pipe(
        tap((response: JoinEventResponse) => stateUpdater(response)),
        tap(() => console.log('Joined to event'))
      );
  }

  @Action(Pay)
  pay({ getState, setState }: StateContext<Events>, { eventId }: Pay) {
    const url = environment.api.resource(EventState.events, eventId, 'payments' + '/approve');
    this.document.location.href = url;
  }

  @Action(ResignFromEvent)
  resignFromEvent({ dispatch, getState, setState }: StateContext<Events>, { eventId }: ResignFromEvent) {
    const stateUpdater = (response: any) => {
      const oldEvents = getState().filter(event => event.id !== eventId),
            [eventToUpdate] = getState().filter(event => event.id === eventId),
            newParticipators = eventToUpdate.participators.filter(participator => participator.id !== response.user_id);

      eventToUpdate.participators = newParticipators;
      setState([...oldEvents, eventToUpdate]);
      dispatch(new ShowFlashMessageOnDeleted('Zrezygnowano z uczestnictwa'));
    };


    return this.http.delete(environment.api.resource(EventState.events, eventId, EventState.participators), { withCredentials: true })
      .pipe(
        tap(stateUpdater)
      );
  }
}
