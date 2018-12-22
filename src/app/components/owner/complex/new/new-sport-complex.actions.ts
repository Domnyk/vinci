import { Complex } from '../../../../models/complex';


export class CreateNewSportComplex {
  static readonly type = `[New sport complex component] Create new sport complex`;

  constructor(public complex: Complex) { }
}
