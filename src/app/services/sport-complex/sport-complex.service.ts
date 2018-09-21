import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { NewSportComplex, NewSportComplexError, SportComplexList, SportComplexListError } from '../../models/api-response';
import { flatMap } from 'rxjs/operators';
import { SportComplex } from '../../models/sport-complex';

@Injectable({
  providedIn: 'root'
})
export class SportComplexService {
  constructor(
    private http: HttpClient
  ) { }

  fetchAll(): Observable<any> {
    type dataHandlerType = (response: SportComplexList & SportComplexListError) => Observable<Object>;
    const dataHandler: dataHandlerType = (response: SportComplexList & SportComplexListError) => {
      console.log('Received data is: ', response);

      if (response.status === 'ok') {
        return of(response.data);
      }

      if (response.status === 'error') {
        return throwError(response.message);
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
      console.log('Received response is: ', response);

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
}
