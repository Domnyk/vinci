import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Observable, of, throwError } from 'rxjs';
import { SportObject } from '../models/sport-object';
import { NewEntity, NewEntityError } from '../models/api-response';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SportObjectService {
  constructor(private http: HttpClient) { }

  fetchAll(): Observable<any> {
    return this.http.get(environment.api.sportObjectsAddress);
  }

  create(sportObject: SportObject): Observable<any> {
    type responseHandlerType = (response: NewEntity<SportObject> & NewEntityError) => Observable<Object>;
    const responseHandler: responseHandlerType = (response) => {

      if (response.status === 'ok') {
        return of(response.entity);
      } else if (response.status === 'error') {
        return throwError(response.errors);
      }
    };

    return this.http.post(environment.api.newSportObjectAddress, sportObject.dto)
      .pipe(
        flatMap(responseHandler)
      );
  }
}
