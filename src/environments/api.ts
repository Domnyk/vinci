import { EscapedBuildingAddress } from '../app/models/building-address';

export class API {
  constructor(private domain: string) { }

  get signUpAddress() {
    return this.domain + '/api/users';
  }

  get fbSignInAddress() {
    return this.domain + '/api/auth/facebook';
  }

  get signInAddress() {
    return this.domain + '/api/token';
  }

  get sportObjectsAddress() {
    return this.domain + '/api/sport_objects';
  }

  get sportComplexesAddress() {
    return this.domain + '/api/sport_complexes';
  }

  get newSportComplexAddress() {
    return this.domain + '/api/sport_complexes';
  }

  deleteSportComplexAddress(id: number) {
    return this.domain + '/api/sport_complexes/' + id;
  }

  get newSportObjectAddress() {
    return this.domain + '/api/sport_objects';
  };

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
