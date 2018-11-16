import { DTO } from './dto';
import { Coords } from './sport-object';

export class SearchParams implements DTO {
  constructor(
    public disciplines: Array<number>,
    public price: number,
    public date: string,
    public location: Coords,
    public searchRadius?: number
  ) { }

  dto(): SearchParamsDTO {
    const dto: SearchParamsDTO = {
      search_params: {
        disciplines: this.disciplines,
        price: this.price,
        date: this.date,
        location: { latitude: this.location.latitude, longitude: this.location.longitude }
      }
    };

    if (!!this.searchRadius) {
      dto.search_params.search_radius = this.searchRadius;
    }

    return dto;
  }
}

interface SearchParamsDTO {
  search_params: {
    disciplines: Array<number>;
    price: number;
    date: string;
    location: { latitude: number, longitude: number };
    search_radius?: number;
  };
}
