import { Action, State, StateContext, Store } from '@ngxs/store';
import { FetchEvents } from '../components/owner/calendar/calendar.actions';
import { Event } from '../models/event';

type Events = Array<Event>;

@State<Events>({
  name: 'Events',
  defaults: []
})
export class EventState {
  constructor(private store: Store) { }

  @Action(FetchEvents)
  fetchEvents({ getState, setState }: StateContext<Events>, { sportArenaId }: FetchEvents): void {
    const newState: Events = [];

    setState(newState);
  }
}
