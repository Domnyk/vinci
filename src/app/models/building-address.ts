/**
 * Class to represent a building address
 * @member {string} street - Name of the street without 'ul.' prefix
 * @member {number} buildingNumber
 * @member {string} postalCode - postal code in format 'XX-XXX' where X is a digit
 * @member {string} city
 */
export class BuildingAddress {
  static equals(address1: BuildingAddressLiteral, address2: BuildingAddressLiteral) {
    const isStreetSame = address1.street === address2.street,
          isBuldingNumberSame = address1.buildingNumber === address2.buildingNumber,
          isCitySame = address1.city === address2.city,
          isPostalCodeSame = address1.postalCode === address2.postalCode;

    return isStreetSame && isBuldingNumberSame && isCitySame && isPostalCodeSame;
  }

  constructor(
    private street: string,
    private buildingNumber: string,
    private city: string,
    private postalCode: string
  ) { }

  get asString(): string {
    return [`${this.street} `, `${this.buildingNumber}, `, `${this.postalCode} `, `${this.city}`]
      .reduce((prev: string, curr: string) => prev.concat(this.replaceReservedCharacters(curr), ''));
  }

  private replaceReservedCharacters(field: string): string {
    return field
      .split('')
      .map(this.replaceSpace)
      .join('');
  }

  private replaceSpace(character: string): string {
    if (character === ' ') {
      return '+';
    }
    return character;
  }
}

export interface BuildingAddressLiteral {
  street: string;
  buildingNumber: string;
  city: string;
  postalCode: string;
}
