import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import LatLngLiteral = google.maps.LatLngLiteral;

@Injectable({
  providedIn: 'root'
})
export class CurrentLocationService {

  constructor() {}

  fetch(options?: FetchOptions): Observable<LatLngLiteral> {
    const subscribe = (subject: Subscriber<LatLngLiteral>) => {
      const isGeoLocationNotSupported: boolean = !('geolocation' in navigator);
      if (isGeoLocationNotSupported) {
        subject.error('Location api not supported');
      }

      const handleSuccess = ({ coords: { latitude, longitude } }: Position) => {
        subject.next({ lat: latitude, lng: longitude });
      }, handleError = (error: PositionError) => {
          console.debug('Error in navigator.geolocation.getCurrentPosition: ', error);
          subject.next(options.fallbackLocation);
      };

      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    };

    return Observable.create(subscribe);
  }
}

interface FetchOptions {
  fallbackLocation: LatLngLiteral;
}
