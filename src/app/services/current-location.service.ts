import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import LatLngLiteral = google.maps.LatLngLiteral;

@Injectable({
  providedIn: 'root'
})
export class CurrentLocationService {
  private static readonly timeout = 5000;


  constructor() {}

  fetch(options?: FetchOptions): Observable<LatLngLiteral> {
    const subscribe = (subject: Subscriber<LatLngLiteral>) => {
      const isGeoLocationNotSupported: boolean = !('geolocation' in navigator);
      if (isGeoLocationNotSupported) {
        console.warn('Geolocation api not supported - returning fallback location');
        subject.next(options.fallbackLocation);
      }

      const handleSuccess = ({ coords: { latitude, longitude } }: Position) => {
        subject.next({ lat: latitude, lng: longitude });
      }, handleError = (_: PositionError) => {
        console.warn('Geolocation api timeout - returning fallback location');
        subject.next(options.fallbackLocation);
      };

      navigator.geolocation.getCurrentPosition(handleSuccess, handleError, { timeout: CurrentLocationService.timeout });
    };

    return Observable.create(subscribe);
  }
}

interface FetchOptions {
  fallbackLocation: LatLngLiteral;
}
