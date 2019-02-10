import { DTO } from '../interfaces/dto';
import { SportDiscipline } from './sport-discipline';


export class SportArena implements DTO {
  static fromDTO(dto: any): SportArena {
    return new SportArena(dto.id, dto.name, dto.sport_disciplines.slice(0), dto.sport_object_id, dto.price_per_hour);
  }

  constructor(
    public id: number,
    public name: string,
    public sportDisciplines: Array<number> | Array<SportDiscipline>,
    public sportObjectId: number,
    public pricePerHour: number,
  ) {}

  dto(): SportArenaDTO {
    const dto = {
      data : {
        sport_arena: {
          id: this.id,
          name: this.name,
          sport_disciplines: <Array<number>> this.sportDisciplines.slice(0),
          sport_object_id: this.sportObjectId,
          price_per_hour: this.pricePerHour
        }
      }
    };

    return dto;
  }
}

interface SportArenaDTO {
  data: {
    sport_arena: {
      id: number;
      name: string;
      sport_disciplines: Array<number>;
      sport_object_id: number
      price_per_hour: number;
    }
  };
}

export interface SportArenaData {
  id: number;
  name: string;
  sport_disciplines: Array<number>;
  sport_object_id: number;
}
