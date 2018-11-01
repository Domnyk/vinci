import { SportArena } from '../../../../models/sport-arena';

export class UpdateSportArena {
  static readonly type = 'Update sport arena';

  constructor(public sportArena: SportArena) { }

}
