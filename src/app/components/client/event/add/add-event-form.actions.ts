import { Event } from '../../../../models/event';

export class CreateEvent {
  static readonly type = 'Create event';

  constructor(public arenaId: number, public event: Event) { }
}
