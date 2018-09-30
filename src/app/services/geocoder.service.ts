import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BuildingAddress, UnescapedBuildingAddress } from '../models/building-address';
import { HttpClient } from '@angular/common/http';
import { flatMap } from 'rxjs/operators';
import GeocoderStatus = google.maps.GeocoderStatus;
import GeocoderResult = google.maps.GeocoderResult;
import { Observable, of } from 'rxjs';
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
}

// TODO: Fix error in typing file. results.geometry.location is LatLngLiteral not LatLng
// TODO: This is commented until typing error will be fixed
/* interface GoogleGeocoderResponse {
  results: GeocoderResult[];
  status: GeocoderStatus;
} */
