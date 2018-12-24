import { DTO } from '../interfaces/dto';
import LatLngLiteral = google.maps.LatLngLiteral;
import { BuildingAddressLiteral } from './building-address-literal';
import { ObjectFormModel } from '../components/owner/object/form-model/object-form-model';

export class SportObject implements DTO {
  id: number;
  name: string;
  address: BuildingAddressLiteral;
  geoCoordinates: LatLngLiteral;
  bookingMargin: BookingMargin;
  complexId: number;

  static fromDTO(dto: any): SportObject {
    const address = {
        street: dto.address.street,
        buildingNumber: dto.address.building_number,
        postalCode: dto.address.postal_code,
        city: dto.address.city
      },
      geoCoordinates = { lat: dto.geo_coordinates.latitude, lng: dto.geo_coordinates.longitude },
      params = { id: dto.id, name: dto.name, address: address, geoCoordinates: geoCoordinates,
        bookingMargin: dto.booking_margin, complexId: dto.sport_complex_id };

    return new SportObject(params);
  }

  constructor(object: ObjectFormModel | ObjectLiteral) {
    if (object instanceof ObjectFormModel) {
      this.initWithFormModel(object);
    } else {
      this.initWithLiteral(object);
    }
  }

  private initWithFormModel(object: ObjectFormModel) {
    const { city, postalCode, buildingNumber, street, bookingMarginInMonths, bookingMarginInDays } = object;

    this.id = object.id;
    this.name = object.name.value;
    this.address = { city: city.value, postalCode: postalCode.value, buildingNumber: buildingNumber.value, street: street.value };
    this.geoCoordinates = object.geoCoordinates;
    this.bookingMargin = { months: +bookingMarginInMonths.value, days: +bookingMarginInDays.value, seconds: 0 };
    this.complexId = object.complexId;
  }

  private initWithLiteral(object: ObjectLiteral) {
    const { id, name, address, geoCoordinates, bookingMargin, complexId } = object;

    this.id = id;
    this.name = name;
    this.address = address;
    this.geoCoordinates = geoCoordinates;
    this.bookingMargin = bookingMargin;
    this.complexId = complexId;
  }

   dto(): SportObjectDTO {
    return {
      data: {
        sport_object: {
          id: this.id,
          name: this.name,
          geo_coordinates: { latitude: this.geoCoordinates.lat, longitude: this.geoCoordinates.lng },
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
          sport_complex_id: this.complexId
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
      geo_coordinates: HadrianGeoLocation;
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

interface ObjectLiteral {
  id: number;
  name: string;
  address: BuildingAddressLiteral;
  geoCoordinates: LatLngLiteral;
  bookingMargin: BookingMargin;
  complexId: number;
}

interface HadrianGeoLocation {
  latitude: number;
  longitude: number;
}

export interface BookingMargin {
  months: number;
  days: number;
  seconds: number;
}
