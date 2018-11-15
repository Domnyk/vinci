import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { Coords } from '../models/sport-object';

@Injectable({
  providedIn: 'root'
})
export class CurrentLocationService {

  constructor() {}

  fetch(options?: FetchOptions): Observable<Coords> {
    const subscribe = (subject: Subscriber<Coords>) => {
      const isGeoLocationNotSupported: boolean = !('geolocation' in navigator);
      if (isGeoLocationNotSupported) {
        subject.error('Location api not supported');
      }

      const handleSuccess = ({ coords: { latitude, longitude } }: Position) => {
        subject.next(new Coords(latitude, longitude));
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
  fallbackLocation: Coords;
}
