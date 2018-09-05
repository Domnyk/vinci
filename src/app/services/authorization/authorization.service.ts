import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { User } from '../../models/user';

import { FacebookService } from '../facebook/facebook.service';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  constructor(
    private http: HttpClient, 
    private facebookService: FacebookService
  ) { }

  get isUserSignedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  get currentUser(): JSON {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
  
  signIn(user: User): Observable<any> {
    return this.makeAuthenticationReq(AuthMethod.IN_APP, user);
  }

  signInWithFb(): Observable<any> {
    if(this.facebookService.isUserSignedIn) {
      return this.facebookService.getUserEmail()
        .pipe(
          flatMap(resp => of({ email: resp['email'] , accessToken: FB.getAuthResponse().accessToken })),
          flatMap(resp => this.makeAuthenticationReq(AuthMethod.FACEBOOK, resp)))
    }
  
    return this.facebookService.signInUser()
      .pipe(
        flatMap(() => this.facebookService.getUserEmail()),
        flatMap(resp => of({ email: resp.authResponse, accessToken: FB.getAuthResponse().accessToken })),
        flatMap(resp => this.makeAuthenticationReq(AuthMethod.FACEBOOK, resp))
      );
  }

  private makeAuthenticationReq(authMethod: AuthMethod, userData: Object): Observable<Object> {
    const payload = this.calculatePayload(authMethod, userData);
    return this.http.post(environment.api.signInAddress, payload)
  }

  private calculatePayload(authMethod: AuthMethod, userData: Object): Object {
    const payload = {
      auth_method: authMethod,
      user: {}
    }

    if(authMethod === AuthMethod.IN_APP) {
      payload.user = { email: userData['email'], password: userData['password'] }
    } else { 
      payload.user = { email: userData['email'], access_token: userData['accessToken'] }
    }

    return payload;
  }
}

enum AuthMethod {
  IN_APP = 'in_app',
  FACEBOOK = 'facebook'
}
