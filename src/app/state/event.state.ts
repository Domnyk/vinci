import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { FetchEvents } from '../components/owner/calendar/calendar.actions';
import { environment } from '../../environments/environment.generated.dev';
import { HttpClient } from '@angular/common/http';
import { flatMap, tap } from 'rxjs/operators';
import { ErrorResponse } from '../models/api-response';
import { ShowFlashMessageOnSuccess } from '../actions/flash-message.actions';
import { of } from 'rxjs';
import { Event, Participator } from '../models/event';
import { CreateEvent } from '../components/client/event/add/add-event-form.actions';
import { JoinEvent, Pay, ResignFromEvent } from '../components/client/event/show/show-event.actions';
import { CurrentUser } from '../models/current-user';
import { JoinEventResponse } from '../models/api-responses/join-event-response';

type Events = Array<Event>;

@State<Events>({
  name: 'Events',
  defaults: []
})
export class EventState {
  private static readonly events = 'events';
  private static readonly participators = 'participators';
  private static readonly arenas = 'sport_arenas';

  constructor(private http: HttpClient, private store: Store) { }

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
      return dispatch(new ShowFlashMessageOnSuccess('Utworzono nowe wydarzenie'));
    };

    return this.http.post(environment.api.resource(EventState.arenas, arenaId, EventState.events), event.dto(), { withCredentials: true })
      .pipe(
        tap((response) => stateUpdater(response))
      )
      .subscribe(() => {}, (error) => this.handleError(error));
  }

  @Action(JoinEvent)
  joinEvent({ dispatch, getState, setState }: StateContext<Events>, { eventId }: JoinEvent) {
    const stateUpdater = (response: JoinEventResponse) => {
      this.store.select(state => state.currentUser).subscribe((currentUser: CurrentUser) => {
        console.warn('Join Event not working!');
        const { user_id: id, has_paid: hasPaid, is_event_owner: isEventOwner } = response,
              oldEvents = getState().filter(event => event.id !== eventId),
              [eventToModification] = getState().filter(event => event.id === eventId),
              participators = eventToModification.participators,
              newParticipator: Participator = { displayName: currentUser.displayName, email: currentUser.email,
                                                id: id, hasPaid: hasPaid, isEventOwner: isEventOwner },
              newParticipators = [...participators, newParticipator];

        eventToModification.participators = newParticipators;
        setState([...oldEvents, eventToModification]);
        return dispatch(new ShowFlashMessageOnSuccess('Dołączono do wydarzenia'));
      });
    };

    return this.http.post(environment.api.resource(EventState.events, eventId, EventState.participators), {} , { withCredentials: true })
      .pipe(
        tap((response: JoinEventResponse) => stateUpdater(response))
      )
      .subscribe(() => {}, (error) => this.handleError(error));
  }

  @Action(Pay)
  pay({ getState, setState }: StateContext<Events>, { eventId }: Pay) {
    const url = environment.api.resource(EventState.events, eventId, EventState.participators + '/pay');
    window.open(url, '_blank');
  }

  @Action(ResignFromEvent)
  resignFromEvent({ dispatch, getState, setState }: StateContext<Events>, { eventId }: ResignFromEvent) {
    const stateUpdater = (response: any) => {
      const oldEvents = getState().filter(event => event.id !== eventId),
            [eventToUpdate] = getState().filter(event => event.id === eventId),
            newParticipators = eventToUpdate.participators.filter(participator => participator.id !== response.user_id);

      eventToUpdate.participators = newParticipators;
      setState([...oldEvents, eventToUpdate]);
      dispatch(new ShowFlashMessageOnSuccess('Zrezygnowano z uczestnictwa'));
    };


    return this.http.delete(environment.api.resource(EventState.events, eventId, EventState.participators), { withCredentials: true })
      .pipe(
        tap(stateUpdater)
      );
  }

  private handleError(errorResponse: ErrorResponse) {
    console.debug('Error response: ', errorResponse);
    this.store.dispatch(new ShowFlashMessageOnSuccess('Wystąpił błąd'));
  }
}
