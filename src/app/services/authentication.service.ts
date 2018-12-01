import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Credentials } from '../models/credentials';

import { environment } from '../../environments/environment.generated.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private http: HttpClient
  ) { }

  signIn(user: Credentials): Observable<any> {
    return this.makeAuthenticationReq(user);
  }

  private makeAuthenticationReq(userData: Object): Observable<Object> {
    const payload = {
      email: userData['email'],
      password: userData['password']
    };

    return this.http.post(environment.api.urls.signIn(), payload);
  }
}
