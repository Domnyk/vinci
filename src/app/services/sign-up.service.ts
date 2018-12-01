import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Credentials } from '../models/credentials';

import { environment } from '../../environments/environment.generated.dev';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  constructor(private http: HttpClient) { }

  // TODO: This function should do more i.e: return Observable with new credentials data and return error when credentials registration fails
  signUp(model: Credentials): Observable<Object> {
    return this.http.post(environment.api.urls.signUp, model);
  }
}
