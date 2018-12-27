import { DTO } from '../interfaces/dto';
import LatLngLiteral = google.maps.LatLngLiteral;

export class SearchParams implements DTO {
  constructor(
    public disciplines: Array<number>,
    public price: number,
    public date: string,
    public geoLocation: LatLngLiteral
  ) { }

  dto(): SearchParamsDTO {
    return {
      search_params: {
        disciplines: this.disciplines,
        price: this.price,
        date: this.date,
        geo_location: this.geoLocation,
      }
    };
  }
}

interface SearchParamsDTO {
  search_params: {
    disciplines: Array<number>;
    price: number;
    date: string;
    geo_location: LatLngLiteral;
  };
}
