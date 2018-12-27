import { DTO } from '../interfaces/dto';
import LatLngLiteral = google.maps.LatLngLiteral;

export class SearchParams implements DTO {
  constructor(
    public disciplines: Array<number>,
    public date: string,
    public geoLocation: LatLngLiteral
  ) { }

  dto(): SearchParamsDTO {
    return {
      disciplines: this.disciplines,
      day: this.date,
      geo_location: this.geoLocation,
    };
  }
}

interface SearchParamsDTO {
    disciplines: Array<number>;
    day: string;
    geo_location: LatLngLiteral;
}
