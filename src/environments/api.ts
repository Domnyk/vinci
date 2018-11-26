import LatLngLiteral = google.maps.LatLngLiteral;

export class API {
  constructor(private domain: string, private googleMapsApiKey: string) { }

  get urls() {
    return {
      signUp: this.domain + '/users',
      signIn: this.calculateSignInAddress.bind(this),
      geocoder: this.calculateGeocoderAddress.bind(this),
      reverseGeocoder: this.calculateReverseGeocoderAddress.bind(this)
    };
  }

  resource(resourceName: string, resourceId?: number, nestedResourceName?: string, nestedResourceId?: number): string {
    if (!!resourceId && !!nestedResourceName && !!nestedResourceId) {
      return `${this.domain}/${resourceName}/${resourceId}/${nestedResourceName}/${nestedResourceId}`;
    }

    if (!!resourceId && !!nestedResourceName) {
      return `${this.domain}/${resourceName}/${resourceId}/${nestedResourceName}`;
    }

    if (!!resourceId) {
      return `${this.domain}/${resourceName}/${resourceId}`;
    }

    return `${this.domain}/${resourceName}`;
  }

  private calculateSignInAddress(): string {
    const redirectURL = 'https://localhost:8080';
    return this.domain + `/session/new?redirect_url=${redirectURL}`;
  }

  /**
   * Returns URL which allows to translate address to geographic coordinates
   *
   * @returns {string} geocoderURL - Note that this URL contains comma character. Comma character is reserved character but official google
   *                                 maps API is using it without escaping.
   */
  private calculateGeocoderAddress(address: string): string {
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.googleMapsApiKey}`;
  }

  private calculateReverseGeocoderAddress({ lat, lng }: LatLngLiteral): string {
    return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.googleMapsApiKey}&` +
           'language=pl';
  }
}
