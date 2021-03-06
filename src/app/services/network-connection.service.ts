import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.dev';
import { catchError, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkConnectionService {
  private static readonly ONLINE_FLAG = 'online';

  constructor(private http: HttpClient) { }

  isApiOnline(): Observable<boolean> {
    let observable: Observable<boolean> = null;

    if (environment.production) {
      observable =  this.http.get(environment.api.urls.status, { withCredentials: true }).pipe(
        flatMap(resp => of(resp === NetworkConnectionService.ONLINE_FLAG)),
        catchError(error =>  of(false))
      );
    } else {
      observable = of(true);
    }

    return observable;
  }
}
