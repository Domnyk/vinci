import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { HttpClient } from '@angular/common/http';
import { flatMap, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import LatLngLiteral = google.maps.LatLngLiteral;
import { BuildingAddressUtils } from './building-address-utils.service';
import GeocoderResult = google.maps.GeocoderResult;
import LatLng = google.maps.LatLng;
import { ERROR } from '../models/error';

@Injectable({
  providedIn: 'root'
})
export class GeocoderService {
  constructor(
    private http: HttpClient
  ) { }

  geocode(address: string): Observable<LatLngLiteral> {
    const geocoderURL = environment.api.urls.geocoder(BuildingAddressUtils.replaceReservedCharacters(address)),
          parseResponse = (response: { results: any}): Observable<any> => {
            if (response.results.length === 0) {
              return throwError(ERROR.NO_SUCH_ADDRESS);
            }

            return of(response.results[0].geometry.location);
          };

    /*
      type of `results` should be GeocoderResult[] but file with typings contains error. It describies location as
      LatLng when in fact it is of type LatLngLiteral
     */
    return this.http.get(geocoderURL).pipe(
      flatMap(parseResponse)
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
