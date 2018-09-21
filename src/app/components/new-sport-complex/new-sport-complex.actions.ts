import { SportComplex } from '../../models/sport-complex';

export class CreateNewSportComplex {
  static readonly type = `[New sport complex component] Create new sport complex`;

  constructor(public sportComplex: SportComplex) { }
}
