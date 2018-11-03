import { SportArenaData } from '../models/sport-arena';

export class InsertArenas {
  static readonly type = 'Insert sport arena';

  constructor(public sportArenasData: SportArenaData[]) { }
}
