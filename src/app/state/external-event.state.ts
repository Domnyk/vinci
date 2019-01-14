import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { environment } from '../../environments/environment.generated.dev';
import { HttpClient } from '@angular/common/http';
import { catchError, flatMap, tap } from 'rxjs/operators';
import { ShowFlashMessageOnSuccessfulOperation } from '../actions/flash-message.actions';
import { of } from 'rxjs';
import { ExternalEvent } from '../models/external-event';
import { handleError } from './error-handler';
import { CreateExternalEvent, FetchExternalEvents } from '../components/owner/external-event/add-external-event/add-external-event.actions';

type ExternalEvents = Array<ExternalEvent>;

@State<ExternalEvents>({
  name: 'ExternalEvents',
  defaults: []
})
export class ExternalEventState {
  private static readonly externalEvents = 'external_events';
  private static readonly arenas = 'sport_arenas';

  constructor(private http: HttpClient, private store: Store) { }

  @Selector()
  static getById(state: ExternalEvents) {
    return (id: number) => {
      return state.filter(externalEvent => externalEvent.id === +id)[0];
    };
  }

  @Action(FetchExternalEvents)
  fetchExternalEvents({ getState, setState }: StateContext<ExternalEvents>, { arenaId }: FetchExternalEvents) {
    const stateUpdater = (events: ExternalEvents) => {
      setState(events);
    };

    return this.http.get(environment.api.resource(ExternalEventState.arenas, arenaId, ExternalEventState.externalEvents), { withCredentials: true })
      .pipe(
        flatMap((response: any[]) => of(response.map(dto => ExternalEvent.fromDTO(dto)))),
        tap(stateUpdater)
      );
  }

  @Action(CreateExternalEvent)
  createExternalEvent({ dispatch, getState, setState }: StateContext<ExternalEvents>, { arenaId, externalEvent }: CreateExternalEvent) {
    const stateUpdater = (response: any) => {
      const oldState = getState(),
        newState = [...oldState, ExternalEvent.fromDTO(response)];

      setState(newState);
      return dispatch(new ShowFlashMessageOnSuccessfulOperation('Utworzono nowe wydarzenie zewnętrzne'));
    };

    return this.http.post(environment.api.resource(ExternalEventState.arenas, arenaId, ExternalEventState.externalEvents), externalEvent.dto(), { withCredentials: true })
      .pipe(
        tap((response) => stateUpdater(response)),
        catchError(error => handleError(error, this.store))
      );
  }
}
