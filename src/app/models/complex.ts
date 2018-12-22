import { DTO } from './dto';

export class Complex implements DTO {
  constructor(public id: number, public name: string) { }

  dto(): ComplexDTO {
    return {
      name: this.name
    };
  }
}

interface ComplexDTO {
  name: string;
}
