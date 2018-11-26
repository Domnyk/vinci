import { ComplexesOwner } from '../models/complexes-owner';

export class SignUpComplexesOwner {
  static readonly type = '[USER] Sign up complexes owner'

  constructor(public complexesOwner: ComplexesOwner) { }
}
