import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.generated.dev';
import { BuildingAddressLiteral } from '../models/building-address-literal';
import { HttpClient } from '@angular/common/http';
import { flatMap, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import LatLngLiteral = google.maps.LatLngLiteral;
import { BuildingAddressUtils } from './building-address-utils.service';

@Injectable({
  providedIn: 'root'
})
export class GeocoderService {
  constructor(
    private http: HttpClient
  ) { }

  geocode(buildingAddress: BuildingAddressLiteral): Observable<LatLngLiteral> {
    console.debug('buildingAddress: ', buildingAddress);
    const geocoderURL = environment.api.urls.geocoder(BuildingAddressUtils.asString(buildingAddress));

    return this.http.get(geocoderURL)
      .pipe(
        tap(console.log),
        flatMap((response: any) => of(response.results[0].geometry.location))
      );
  }

  geocodeString(address: string): Observable<LatLngLiteral> {
    const geocoderURL = environment.api.urls.geocoder(BuildingAddressUtils.replaceReservedCharacters(address));

    return this.http.get(geocoderURL)
      .pipe(
        flatMap((response: any) => of(response.results[0].geometry.location))
      );
  }

  reverseGeocode(coords: LatLngLiteral): Observable<string> {
    const url = environment.api.urls.reverseGeocoder(coords);

    return this.http.get(url)
      .pipe(
        flatMap((response: any) => response.results.length === 0 ? throwError('No results') : of(response.results[0].formatted_address))
      );
  }
}

/*
  TODO: Fix error in typing file. results.geometry.geo_location is LatLngLiteral not LatLng. This is commented until typing error will be fixed
*/
/* interface GoogleGeocoderResponse {
  results: GeocoderResult[];
  status: GeocoderStatus;
} */
