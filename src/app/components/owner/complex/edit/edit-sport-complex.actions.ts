import { Complex } from '../../../../models/complex';

export class UpdateSportComplex {
  static readonly type = 'Update complexFormModel';

  constructor(public complex: Complex) { }
}
