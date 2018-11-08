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
    return {
      disciplines: this.disciplines,
      price: this.price,
      date: this.date,
      location: this.location,
      search_radius: this.searchRadius
    };
  }
}

interface SearchParamsDTO {
  disciplines: Array<number>;
  price: number;
  date: string;
  location?: any;
  search_radius?: number;
}
