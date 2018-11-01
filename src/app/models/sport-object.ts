import { UnescapedBuildingAddress } from './building-address';
import { DTO } from './dto';

export class SportObject implements DTO {
   constructor(
     public id: number,
     public name: string,
      public address: UnescapedBuildingAddress,
      public geoCoordinates: Coords,
      public bookingMargin: BookingMargin,
      public sportComplexId?: number
   ) { }

   static fromDTO(dto: any): SportObject {
     const address = {
             street: dto.address.street,
             buildingNumber: dto.address.building_number,
             postalCode: dto.address.postal_code,
             city: dto.address.city
           },
           geoCoordinates = new Coords(dto.geo_coordinates.latitude, dto.geo_coordinates.longitude);

     return new SportObject(dto.id, dto.name, address, geoCoordinates, dto.booking_margin, dto.sport_complex_id);
   }

   dto(): SportObjectDTO {
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
          address: {
            city: this.address.city,
            building_number: this.address.buildingNumber,
            postal_code: this.address.postalCode,
            street: this.address.street,
          },
          sport_complex_id: this.sportComplexId
        }
      }
    };
  }
}

export class SportObjectBasicInformation {
  constructor(
    public id: number,
    public name: string,
  ) { }
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
      address: {
        city: string;
        building_number: string;
        postal_code: string;
        street: string;
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
