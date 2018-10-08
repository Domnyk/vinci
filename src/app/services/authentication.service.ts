import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';

import { environment } from '../../environments/environment.generated.dev';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private http: HttpClient
  ) { }

  signIn(user: User): Observable<any> {
    return this.makeAuthenticationReq(user);
  }

  private makeAuthenticationReq(userData: Object): Observable<Object> {
    const payload = {
      auth_method: 'in_app',
      user: {
        email: userData['email'],
        password: userData['password']
      }
    };

    return this.http.post(environment.api.signInURL, payload);
  }
}
