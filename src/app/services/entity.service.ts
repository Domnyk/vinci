import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { DeletedEntity, DeleteEntityError, EntityList, NewEntity, NewEntityError, } from '../models/api-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { flatMap } from 'rxjs/operators';
import { DTO } from '../models/dto';

@Injectable({
  providedIn: 'root'
})
export class EntityService<T> {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Fetches all entities from API
   *
   * @param {string} entityURL - This argument is used to map generic type T to URL. Ideally proper URL should be determined by type T.
   *                             However, it is impossible to check what is exact type of T during runtime because generic types are compile
   *                             time only.
   */
  fetchAll(entityURL: string): Observable<T[]> {
    type dataHandlerType = (response: EntityList<T>) => Observable<T[]>;
    const dataHandler: dataHandlerType = response => {
      if (response.status === 'ok') {
        return of(response.data);
      }
    };

    return this.http.get(environment.api.entityURLs(entityURL).fetchAll)
      .pipe(
        flatMap(dataHandler)
      );
  }

  /**
   * Creates new entity
   *
   * @param {K} entity - entity to create
   * @param {string} entityURL - @see fetchAll
   */
  create<K extends (T & DTO)>(entity: K, entityURL: string): Observable<K> {
    type responseHandlerType = (response: NewEntity<K> & NewEntityError) => Observable<K>;
    const responseHandler: responseHandlerType = (response) => {

      if (response.status === 'ok') {
        return of(response.data);
      } else if (response.status === 'error') {
        return throwError(response.errors);
      }
    };

    return this.http.post(environment.api.entityURLs(entityURL).create, entity.dto())
      .pipe(
        flatMap(responseHandler)
      );
  }

  delete(entityId: number, entityURL: string): Observable<T> {
    type responseHandlerType = (response: DeletedEntity & DeleteEntityError) => Observable<any>;
    const responseHandler: responseHandlerType = (response) => {
      if (response.status === 'ok') {
        return of(response.data);
      } else if (response.status === 'error') {
        return throwError(response.errors);
      }
    };

    return this.http.delete(environment.api.entityURLs(entityURL).delete(entityId))
      .pipe(
        flatMap(responseHandler)
      );
  }
}
