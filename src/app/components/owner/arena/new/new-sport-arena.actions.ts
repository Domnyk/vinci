import { SportArena } from '../../../../models/sport-arena';

export class CreateSportArena {
  static readonly type = '[New sport arena component] Create sport arena';

  constructor(public sportArena: SportArena) { }
}
