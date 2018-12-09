import { Action, State, StateContext, Store } from '@ngxs/store';
import { FetchEvents } from '../components/owner/calendar/calendar.actions';
import { environment } from '../../environments/environment.generated.dev';
import { HttpClient } from '@angular/common/http';
import { flatMap, tap } from 'rxjs/operators';
import { ErrorResponse } from '../models/api-response';
import { ShowFlashMessage } from '../actions/flash-message.actions';
import { of } from 'rxjs';
import { Event } from '../models/event';
import { CreateEvent } from '../components/client/event/add/add-event-form.actions';
import { JoinEvent } from '../components/client/event/show/join-event.actions';

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
  createEvent({ dispatch }: StateContext<Events>, { arenaId, event }: CreateEvent) {
    const stateUpdater = (response: any) => {
      return dispatch([
        new ShowFlashMessage('Utworzono nowe wydarzenie'),
        new FetchEvents(response.sport_arena_id)
      ]);
    };

    return this.http.post(environment.api.resource('sport_arenas', arenaId, 'events'), event.dto(), { withCredentials: true })
      .pipe(
        tap((response) => stateUpdater(response))
      )
      .subscribe(() => {}, (error) => this.handleError(error));
  }

  @Action(JoinEvent)
  joinEvent({ dispatch }: StateContext<Events>, { eventId }: JoinEvent) {
    const stateUpdater = (response: any) => {
      return dispatch(new ShowFlashMessage('Dołączono do wydarzenia'));
    };

    return this.http.post(environment.api.resource('events', eventId, 'participations'), {} , { withCredentials: true })
      .pipe(
        tap((response) => stateUpdater(response))
      )
      .subscribe(() => {}, (error) => this.handleError(error));
  }

  private handleError(errorResponse: ErrorResponse) {
    console.debug('Error response: ', errorResponse);
    this.store.dispatch(new ShowFlashMessage('Wystąpił błąd'));
  }
}
