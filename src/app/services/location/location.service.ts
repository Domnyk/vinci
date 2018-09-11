import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { SportObject, Coords } from '../../models/sport-object';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private httpClient: HttpClient) { }

  fetchSportObjects() : Observable<any> {
    return this.httpClient.get(environment.api.sportObjectsAddress)
      .pipe(
        map(this.adjustSportObjectsData)
      );
  }

  private adjustSportObjectsData(sportObjects : Array<any>) : any {
    function adjust({id, latitude, longitude}) {
      return new SportObject(id, new Coords(latitude, longitude));
    }
    
    return sportObjects.map(adjust);
  }
}
