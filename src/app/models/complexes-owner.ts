import { DTO } from './dto';

export class ComplexesOwner implements DTO {
  constructor(
    public email: string,
    public passowrd: string,
  ) { }

  dto(): SportComplexDTO {
    return {
      complexes_owner: {
        email: this.email,
        password: this.passowrd
      }
    };
  }
}

export interface SportComplexDTO {
  complexes_owner: {
    email: string;
    password: string;
  };
}
