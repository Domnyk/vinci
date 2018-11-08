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
      search_params: {
        disciplines: this.disciplines,
        price: this.price,
        date: this.date
      }
    };

    if (!!this.location && !!this.searchRadius) {
      dto.search_params.location = this.location;
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
    location?: any;
    search_radius?: number;
  };
}
