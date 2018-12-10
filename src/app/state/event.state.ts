import { Action, State, StateContext, Store } from '@ngxs/store';
import { FetchEvents } from '../components/owner/calendar/calendar.actions';
import { environment } from '../../environments/environment.generated.dev';
import { HttpClient } from '@angular/common/http';
import { flatMap, tap } from 'rxjs/operators';
import { ErrorResponse } from '../models/api-response';
import { ShowFlashMessage } from '../actions/flash-message.actions';
import { of } from 'rxjs';
import { Event, Participator } from '../models/event';
import { CreateEvent } from '../components/client/event/add/add-event-form.actions';
import { JoinEvent, ResignFromEvent } from '../components/client/event/show/show-event.actions';
import { CurrentUser } from '../models/current-user';

type Events = Array<Event>;

@State<Events>({
  name: 'Events',
  defaults: []
})
export class EventState {
  constructor(private http: HttpClient, private store: Store) { }

  @Action(FetchEvents)
  fetchEvents({ getState, setState }: StateContext<Events>, { sportArenaId }: FetchEvents) {
    const stateUpdater = (events: Event[]) => {
      setState(events);
    };

    return this.http.get(environment.api.resource('sport_arenas', sportArenaId, 'events'), { withCredentials: true })
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
      return dispatch(new ShowFlashMessage('Utworzono nowe wydarzenie'));
    };

    return this.http.post(environment.api.resource('sport_arenas', arenaId, 'events'), event.dto(), { withCredentials: true })
      .pipe(
        tap((response) => stateUpdater(response))
      )
      .subscribe(() => {}, (error) => this.handleError(error));
  }

  @Action(JoinEvent)
  joinEvent({ dispatch, getState, setState }: StateContext<Events>, { eventId }: JoinEvent) {
    const stateUpdater = (response: any) => {
      this.store.select(state => state.currentUser).subscribe((currentUser: CurrentUser) => {
        const oldEvents = getState().filter(event => event.id !== eventId),
              [eventToModification] = getState().filter(event => event.id === eventId),
              participators = eventToModification.participators,
              newParticipator: Participator = { displayName: currentUser.data.displayName, email: currentUser.data.email,
                                                hasPaid: false, isEventOwner: false, id: currentUser.data.id },
              newParticipators = [...participators, newParticipator];

        eventToModification.participators = newParticipators;
        setState([...oldEvents, eventToModification]);
        return dispatch(new ShowFlashMessage('Dołączono do wydarzenia'));
      });
    };

    return this.http.post(environment.api.resource('events', eventId, 'participations'), {} , { withCredentials: true })
      .pipe(
        tap((response) => stateUpdater(response))
      )
      .subscribe(() => {}, (error) => this.handleError(error));
  }

  @Action(ResignFromEvent)
  resignFromEvent({ dispatch, getState, setState }: StateContext<Events>, { eventId }: ResignFromEvent) {
    const stateUpdater = (response: any) => {
      const oldEvents = getState().filter(event => event.id !== eventId),
            [eventToUpdate] = getState().filter(event => event.id === eventId),
            newParticipators = eventToUpdate.participators.filter(participator => participator.id !== response.user_id);

      eventToUpdate.participators = newParticipators;
      setState([...oldEvents, eventToUpdate]);
      dispatch(new ShowFlashMessage('Zrezygnowano z uczestnictwa'));
    };


    return this.http.delete(environment.api.resource('events', eventId, 'participations'), { withCredentials: true})
      .pipe(
        tap(stateUpdater)
      );
  }

  private handleError(errorResponse: ErrorResponse) {
    console.debug('Error response: ', errorResponse);
    this.store.dispatch(new ShowFlashMessage('Wystąpił błąd'));
  }
}
