import { ComplexDTO } from '../../../../models/complex.form';


export class CreateNewSportComplex {
  static readonly type = `[New sport complex component] Create new sport complex`;

  constructor(public dto: ComplexDTO) { }
}
