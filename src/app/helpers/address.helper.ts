import { BuildingAddressLiteral } from '../models/building-address-literal';
import { SportObject } from '../models/sport-object';
import { Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

export class AddressHelper {
  static printAddress(object: SportObject): string {
    const getAddressAsString = (address: BuildingAddressLiteral): string => {
      const { street, buildingNumber, city, postalCode } = address;
      return `${street} ${buildingNumber}, ${postalCode} ${city}`;
    };

    return getAddressAsString(object.address);
  }
}
