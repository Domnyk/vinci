import { Action, State, StateContext, Store } from '@ngxs/store';
import { FetchEvents } from '../components/owner/calendar/calendar.actions';
import { environment } from '../../environments/environment.generated.dev';
import { HttpClient } from '@angular/common/http';
import { flatMap, tap } from 'rxjs/operators';
import { ErrorResponse } from '../models/api-response';
import { ShowFlashMessage } from '../actions/flash-message.actions';
import { of } from 'rxjs';
import { CustomEventView } from '../models/custom-event-view';
import { addDays, addHours } from 'date-fns';
import { CreateEvent } from '../components/client/event/add/add-event-form.actions';

type Events = Array<CustomEventView>;

const now: Date = new Date();
const mockEvents: Events = [{
  start: now,
  end: addHours(now, 2),
  title: 'Wydarzenie 1',
  minParticipants: 2,
  maxParticipants: 5,
  users: [{ displayName: 'Stephen' }, { displayName: 'Joshua' }, { displayName: 'Bob' }]
}, {
  start: addDays(now, 1),
  end: addHours(addDays(now, 1), 2),
  title: 'Wydarzenie 1',
  minParticipants: 4,
  maxParticipants: 6,
  users: [{ displayName: 'Mathew' }, { displayName: 'Colin' }, { displayName: 'Patrick' }]
}];

@State<Events>({
  name: 'Events',
  defaults: mockEvents
})
export class EventState {
  constructor(private http: HttpClient, private store: Store) { }

  @Action(FetchEvents)
  fetchEvents({ getState, setState }: StateContext<Events>, { sportArenaId }: FetchEvents) {
    const stateUpdater = (events: CustomEventView[]) => {
      const oldState = getState(),
            newState = [...oldState, ...events];

      setState(newState);
    };

    return this.http.get(environment.api.resource('sport_arenas', sportArenaId, 'events'), { withCredentials: true })
      .pipe(
        flatMap((response: any) => of(response.data)),
        flatMap((data: any[]) => of(data.map(dto => CustomEventView.fromDTO(dto)))),
        tap(stateUpdater)
      );
  }

  @Action(CreateEvent)
  createEvent({ getState, setState }: StateContext<Events>, { arenaId, event }: CreateEvent) {
    const stateUpdater = (response: any) => {
      const oldState = getState(),
            newState = [...oldState];

      console.warn('State updater in createEvents does nothing!');

      setState(newState);
    };

    return this.http.post(environment.api.resource('/sport_arenas', arenaId, 'events'), event.dto(), { withCredentials: true })
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
