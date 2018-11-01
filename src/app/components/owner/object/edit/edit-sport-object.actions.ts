import { SportObject } from '../../../../models/sport-object';

export class UpdateSportObject {
  static readonly type = '[Edit sport object component] Button edit has been clicked';

  constructor(public sportObjectToUpdate: SportObject) { }
}
