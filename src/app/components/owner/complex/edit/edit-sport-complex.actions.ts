import { SportComplex } from '../../../../models/sport-complex';

export class UpdateSportComplex {
  static readonly type = '[Edit sport complex component] Button edit has been clicked';

  constructor(public sportComplexToUpdate: SportComplex) { }
}
