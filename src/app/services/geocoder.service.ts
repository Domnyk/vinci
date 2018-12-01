import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.generated.dev';
import { HttpClient } from '@angular/common/http';
import { flatMap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import LatLngLiteral = google.maps.LatLngLiteral;
import { BuildingAddressUtils } from './building-address-utils.service';
import GeocoderResult = google.maps.GeocoderResult;
import LatLng = google.maps.LatLng;

@Injectable({
  providedIn: 'root'
})
export class GeocoderService {
  constructor(
    private http: HttpClient
  ) { }

  geocode(address: string): Observable<LatLngLiteral> {
    const geocoderURL = environment.api.urls.geocoder(BuildingAddressUtils.replaceReservedCharacters(address));

    return this.http.get(geocoderURL)
      .pipe(
        flatMap((response: { results: GeocoderResult[] }) => of(response.results[0].geometry.location)),
        flatMap((latlng: LatLng) => of({ lat: latlng.lng(), lng: latlng.lng() }))
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
