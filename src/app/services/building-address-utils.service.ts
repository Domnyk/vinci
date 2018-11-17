import { Injectable } from '@angular/core';
import { BuildingAddressLiteral } from '../models/building-address-literal';

@Injectable({
  providedIn: 'root'
})
export class BuildingAddressUtils {
  static areEqual(address1: BuildingAddressLiteral, address2: BuildingAddressLiteral) {
    const isStreetSame = address1.street === address2.street,
          isBuldingNumberSame = address1.buildingNumber === address2.buildingNumber,
          isCitySame = address1.city === address2.city,
          isPostalCodeSame = address1.postalCode === address2.postalCode;

    return isStreetSame && isBuldingNumberSame && isCitySame && isPostalCodeSame;
  }

  static asString(buildingAddress: BuildingAddressLiteral): string {
    const { street, buildingNumber, postalCode, city } = buildingAddress;

    return [`${street} `, `${buildingNumber}, `, `${postalCode} `, `${city}`]
      .reduce((prev: string, curr: string) => {
        return prev.concat(BuildingAddressUtils.replaceReservedCharacters(curr), '');
      });
  }

  static replaceReservedCharacters(field: string): string {
    return field
      .split('')
      .map(this.replaceSpace)
      .join('');
  }

  private static replaceSpace(character: string): string {
    if (character === ' ') {
      return '+';
    }
    return character;
  }
}
