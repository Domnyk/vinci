import { UnescapedBuildingAddress } from './building-address';
import { DTO } from './dto';

export class SportObject extends DTO {
  constructor(
    public id: number,
    public name: string,
    public address: UnescapedBuildingAddress,
    public geoCoordinates: Coords,
    public bookingMargin: BookingMargin
  ) { super(); }

  get dto(): SportObjectDTO {
    return {
      data: {
        sport_object: {
          id: this.id,
          name: this.name,
          geo_coordinates: this.geoCoordinates,
          booking_margin: {
            months: this.bookingMargin.months,
            days: this.bookingMargin.days,
            secs: this.bookingMargin.seconds
          },
          sport_complex_id: 1
        }
      }
    };
  }
}

interface SportObjectDTO {
  data: {
    sport_object: {
      id: number;
      name: string;
      geo_coordinates: Coords;
      booking_margin: {
        months: number;
        days: number;
        secs: number;
      };
      sport_complex_id: number
    }
  };
}

export class Coords implements Coords {
  constructor(
    public latitude: number,
    public longitude: number
  ) { }

  get asGoogleCoords(): google.maps.LatLng {
    return new google.maps.LatLng(this.latitude, this.longitude);
  }
}

export interface BookingMargin {
  months: number;
  days: number;
  seconds: number;
}
