import { DTO } from './dto';

export class SearchParams implements DTO {
  constructor(
    public disciplines: Array<number>,
    public price: number,
    public date: string,
    public location?: any,
    public searchRadius?: number
  ) { }

  dto(): SearchParamsDTO {
    const dto: SearchParamsDTO = {
      disciplines: this.disciplines,
      price: this.price,
      date: this.date
    };

    if (!!this.location && !!this.searchRadius) {
      dto.location = this.location;
      dto.search_radius = this.searchRadius;
    }

    return dto;
  }
}

interface SearchParamsDTO {
  disciplines: Array<number>;
  price: number;
  date: string;
  location?: any;
  search_radius?: number;
}
