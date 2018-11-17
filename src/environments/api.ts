import LatLngLiteral = google.maps.LatLngLiteral;

export class API {
  constructor(private domain: string, private googleMapsApiKey: string) { }

  get signUpURL() {
    return this.domain + '/users';
  }

  get signInURL() {
    return this.domain + '/token/new';
  }

  entityURLs(entityURL: string, childrenURL?: string) {
    return {
      fetchAll: `${this.domain}/${entityURL}`,
      fetchAllChildren: (id: number) => `${this.domain}/${entityURL}/${id}/${childrenURL}`,
      create: `${this.domain}/${entityURL}`,
      delete: (id: number) => `${this.domain}/${entityURL}/${id}`,
    };
  }

  rest(entityName: string, entityId: number, nestedEntity: string) {
    if ( (!!entityId) && (!!nestedEntity) ) {
      const baseURL = `${this.domain}/${entityName}/${entityId}/${nestedEntity}`,
        nestedEntityURLs = {
          index: baseURL
        };

      return nestedEntityURLs;
    }

    const entityURLs = {
      index: `${this.domain}/${entityName}`,
    };

    return entityURLs;
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
  /**
   * Returns URL which allows to translate address to geographic coordinates
   *
   * @returns {string} geocoderURL - Note that this URL contains comma character. Comma character is reserved character but official google
   *                                 maps API is using it without escaping.
   */
  geocoderAddress(address: string): string {
    return `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.googleMapsApiKey}`;
  }

  reverseGeocoderAddress({ lat, lng }: LatLngLiteral): string {
    return `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.googleMapsApiKey}&` +
           'language=pl';
  }
}
