import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable, of, throwError } from 'rxjs';
import {
  DeletedSportComplex, DeletedSportComplexError, NewSportComplex, NewSportComplexError,
  SportComplexList
} from '../models/api-response';
import { flatMap } from 'rxjs/operators';
import { SportComplex } from '../models/sport-complex';

@Injectable({
  providedIn: 'root'
})
export class SportComplexService {
  constructor(
    private http: HttpClient
  ) { }

  fetchAll(): Observable<any> {
    type dataHandlerType = (response: SportComplexList) => Observable<Object>;
    const dataHandler: dataHandlerType = response => {
      if (response.status === 'ok') {
        return of(response.data);
      }
    };

    return this.http.get(environment.api.sportComplexesAddress)
      .pipe(
        flatMap(dataHandler)
      );
  }

  create(data: SportComplex): Observable<any> {
    type responseHandlerType = (response: NewSportComplex & NewSportComplexError) => Observable<Object>;
    const responseHandler: responseHandlerType = (response) => {

      if (response.status === 'ok') {
        return of(response.data);
      } else if (response.status === 'error') {
        return throwError(response.errors);
      }
    };

    return this.http.post(environment.api.newSportComplexAddress, data)
      .pipe(
        flatMap(responseHandler)
      );
  }

  delete(sportComplexId: number): Observable<any> {
    type responseHandlerType = (response: DeletedSportComplex & DeletedSportComplexError) => Observable<Object>;
    const responseHandler: responseHandlerType = (response) => {

      if (response.status === 'ok') {
        return of(response.data.sport_complex);
      } else if (response.status === 'error') {
        return throwError(response.errors);
      }
    };

    return this.http.delete(environment.api.deleteSportComplexAddress(sportComplexId))
      .pipe(
        flatMap(responseHandler)
      );
  }
}
