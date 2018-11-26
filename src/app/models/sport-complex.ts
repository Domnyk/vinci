import { DTO } from './dto';

export class SportComplex implements DTO {
  constructor(
    public name: string,
    public id?: number,
  ) { }

  dto(): SportComplexDTO {
    return {
      data: {
        sport_complex: {
          name: this.name
        }
      }
    };
  }
}

export interface SportComplexDTO {
  data: {
    sport_complex: {
      name: string;
    }
  };
}
