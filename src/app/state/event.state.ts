import { Action, State, StateContext, Store } from '@ngxs/store';
import { FetchEvents } from '../components/owner/calendar/calendar.actions';
import { Event } from '../models/event';
import { addDays } from 'date-fns';

type Events = Array<Event>;

@State<Events>({
  name: 'Events',
  defaults: []
})
export class EventState {
  constructor(private store: Store) { }

  @Action(FetchEvents)
  fetchEvents({ getState, setState }: StateContext<Events>, { sportArenaId }: FetchEvents): void {
    const newState: Events = [
      new Event(0, 'Football match', new Date()),
      new Event(1, 'Basketball match', addDays(new Date(), 1))
    ];

    setState(newState);
  }
}
