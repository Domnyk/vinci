import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Coords } from '../models/sport-object';

@Injectable({
  providedIn: 'root'
})
export class CurrentLocationService {

  constructor() {}

  fetchCurrentLocation(fallbackLocation: Coords): Observable<Coords> {
    function subscribe(subject) {
      const isGeoLocationNotSupported = !('geolocation' in navigator);
      if (isGeoLocationNotSupported) {
        subject.error('Location api not supported');
      }

      /* navigator.geolocation.watchPosition(
        (postion) => {subject.next({lat: postion.coords.latitude, lng: postion.coords.longitude}); subject.complete(); },
        (error) => {subject.next(fallbackLocation); subject.complete(); }
      ); */
      // TODO: Location service hangs application. Why?

      subject.next(fallbackLocation);
    }

    return Observable.create(subscribe);
  }
}
