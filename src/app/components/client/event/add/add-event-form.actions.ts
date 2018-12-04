import { NewEvent } from '../../../../models/new-event';

export class CreateEvent {
  static readonly type = 'Create event';

  constructor(public arenaId: number, public event: NewEvent) { }
}
