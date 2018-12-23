import { DTO } from '../interfaces/dto';
import LatLngLiteral = google.maps.LatLngLiteral;

export class SearchParams implements DTO {
  constructor(
    public disciplines: Array<number>,
    public price: number,
    public date: string,
    public geoLocation: LatLngLiteral,
    public radius: number
  ) { }

  dto(): SearchParamsDTO {
    return {
      search_params: {
        disciplines: this.disciplines,
        price: this.price,
        date: this.date,
        geo_location: this.geoLocation,
        radius: this.radius
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
    radius: number;
  };
}
