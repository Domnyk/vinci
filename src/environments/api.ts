import { EscapedBuildingAddress } from '../app/models/building-address';

/**
 * @deprecated Use @class API2<T>
 */
export class API {
  constructor(private domain: string) { }

  get signUpURL() {
    return this.domain + '/api/users';
  }

  get fbSignInURL() {
    return this.domain + '/api/auth/facebook';
  }

  get signInURL() {
    return this.domain + '/token';
  }

  entityURLs(entityURL: string) {
    return {
      fetchAll: `${this.domain}/${entityURL}`,
      create: `${this.domain}/${entityURL}`,
      delete: (id: number) => `${this.domain}/${entityURL}/${id}`,
    };
  }

  /**
   * Returns URL which allows to translate address to geographic coordinates
   *
   * @returns {string} geocoderURL - Note that this URL contains comma character. Comma character is reserved character but official google
   *                                 maps API is using it without escaping.
   */
  geocoderAddress(address: EscapedBuildingAddress, apiKey: string): string {
    const { street, buildingNumber, postalCode, city } = address,
          geocoderURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${street}+${buildingNumber},+${postalCode}+${city}`
                        + `&key=${apiKey}`;

    return geocoderURL;
  }
}
