import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.generated.dev';
import { BuildingAddress, UnescapedBuildingAddress } from '../models/building-address';
import { HttpClient } from '@angular/common/http';
import { flatMap } from 'rxjs/operators';
import GeocoderStatus = google.maps.GeocoderStatus;
import GeocoderResult = google.maps.GeocoderResult;
import { Observable, of, throwError } from 'rxjs';
import { Coords } from '../models/sport-object';
import LatLngLiteral = google.maps.LatLngLiteral;

@Injectable({
  providedIn: 'root'
})
export class GeocoderService {
  constructor(
    private http: HttpClient
  ) { }

  geocode(address: UnescapedBuildingAddress): Observable<Coords> {
    const buildingAddress = new BuildingAddress(address),
          geocoderURL = environment.api.geocoderAddress(buildingAddress.escaped, environment.googleMapsApiKey),
          adjustLocationFormat = (latLng: LatLngLiteral): Coords => {
            return new Coords(latLng.lat, latLng.lng);
          };

    return this.http.get(geocoderURL)
      .pipe(
        flatMap((response: any) => of(adjustLocationFormat(response.results[0].geometry.location)))
      );
  }

  reverseGeocode(coords: Coords): Observable<string> {
    const url = environment.api.reverseGeocoderAddress(coords, environment.googleMapsApiKey);

    return this.http.get(url)
      .pipe(
        flatMap((response: any) => response.results.length === 0 ? throwError('No results') : of(response.results[0].formatted_address))
      );
  }
}

/*
  TODO: Fix error in typing file. results.geometry.location is LatLngLiteral not LatLng. This is commented until typing error will be fixed
*/
/* interface GoogleGeocoderResponse {
  results: GeocoderResult[];
  status: GeocoderStatus;
} */
