/**
 * Class to represent a building address
 * @member {string} street - Name of the street without 'ul.' prefix
 * @member {number} buildingNumber
 * @member {string} postalCode - postal code in format 'XX-XXX' where X is a digit
 * @member {string} city
 */
export class BuildingAddress {
  constructor(
    private unescapedBuildingAddress: UnescapedBuildingAddress
  ) { }

  get escaped(): EscapedBuildingAddress {
    const unescapedAddress = {
      street: this.unescapedBuildingAddress.street,
      city: this.unescapedBuildingAddress.city
    }, escapedAddress = {};

    Object.entries(unescapedAddress).forEach(([key, value]) => {
      escapedAddress[key] = this.replaceReservedCharacters(value);
    });

    escapedAddress['buildingNumber'] = this.unescapedBuildingAddress.buildingNumber.toString();
    escapedAddress['postalCode'] = this.unescapedBuildingAddress.postalCode;

    return (escapedAddress as EscapedBuildingAddress);
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

/**
 * Interface to represent data from BuildingAddress class with all fields escaped so that they could be placed in URL query string
 */
export interface EscapedBuildingAddress {
  street: string;
  buildingNumber: string;
  postalCode: string;
  city: string;
}

/**
 * Interface to represent data with unescaped characters
 */
export interface UnescapedBuildingAddress {
  street: string;
  buildingNumber: number;
  postalCode: string;
  city: string;
}
