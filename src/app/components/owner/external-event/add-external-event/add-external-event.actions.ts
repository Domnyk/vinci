import { NewEvternalEvent } from '../../../../models/new-evternal-event';

export class FetchExternalEvents {
  static readonly type = 'Fetch external exents';

  constructor(public arenaId: number) { }
}

export class CreateExternalEvent {
  static readonly type = 'Add external event';

  constructor(public arenaId: number, public externalEvent: NewEvternalEvent) { }
}
