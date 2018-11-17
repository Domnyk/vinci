import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.generated.dev';
import { BuildingAddress, BuildingAddressLiteral } from '../models/building-address';
import { HttpClient } from '@angular/common/http';
import { flatMap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import LatLngLiteral = google.maps.LatLngLiteral;
import { AddressService } from './address.service';

@Injectable({
  providedIn: 'root'
})
export class GeocoderService {
  constructor(
    private http: HttpClient
  ) { }

  geocode({ street, buildingNumber, city, postalCode }: BuildingAddressLiteral): Observable<LatLngLiteral> {
    const buildingAddress = new BuildingAddress(street, buildingNumber, city, postalCode),
          geocoderURL = environment.api.geocoderAddress(buildingAddress.asString);

    return this.http.get(geocoderURL)
      .pipe(
        flatMap((response: any) => of(response.results[0].geometry.location))
      );
  }

  geocodeString(address: string): Observable<LatLngLiteral> {
    const geocoderURL = environment.api.geocoderAddress(AddressService.replaceReservedCharacters(address));

    return this.http.get(geocoderURL)
      .pipe(
        flatMap((response: any) => of(response.results[0].geometry.location))
      );
  }

  reverseGeocode(coords: LatLngLiteral): Observable<string> {
    const url = environment.api.reverseGeocoderAddress(coords);

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
