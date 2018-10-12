import { SportObject } from '../../../models/sport-object';

export class CreateNewSportObject {
  static readonly type = `[New sport object component] Create new sport object`;

  constructor(public sportObject: SportObject) { }
}
