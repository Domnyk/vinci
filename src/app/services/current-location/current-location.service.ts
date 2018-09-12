import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentLocationService {

  constructor() {}

  fetchCurrentLocation(): Observable<any> {
    function subscribe(observer) {
      const isGeoLocationNotSupported = !('geolocation' in navigator);
      if (isGeoLocationNotSupported) {
        console.log('FetchCurrentLocation: in if');
        observer.error('Location api not supported');
      }

      navigator.geolocation.getCurrentPosition(
        (postion) => observer.next({lat: postion.coords.latitude, lng: postion.coords.longitude}),
        (error) => observer.error(error)
      );
    }

    return Observable.create(subscribe);
  }
}
