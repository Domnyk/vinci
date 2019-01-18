import LatLngLiteral = google.maps.LatLngLiteral;
import { CurrentUserType } from '../app/models/current-user-type';

export class API {
  constructor(private domain: string, private googleMapsApiKey: string) { }

  get urls() {
    return {
      signUp: this.domain + '/users',
      signIn: this.calculateSignInAddress.bind(this),
      signOut: this.domain + '/session',
      search: this.domain + '/sport_objects/search',
      geocoder: this.calculateGeocoderAddress.bind(this),
      reverseGeocoder: this.calculateReverseGeocoderAddress.bind(this),
      status: this.domain + '/status',
      validate: {
        complex: this.domain + '/validate/complex'
      }
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

  private calculateSignInAddress(userType: CurrentUserType = CurrentUserType.Client, id?: number): string {
    if (!!id) {
      return this.domain + `/session/new?id=${id}&redirect_url=${window.location.origin}`;
    }

    if (userType === CurrentUserType.Client) {
      return this.domain + `/session/new?redirect_url=${window.location.origin}`;
    }

    return this.domain + '/session';
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
