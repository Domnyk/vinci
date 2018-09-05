import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';

import { User } from '../../models/user';
import { FbUser } from '../../models/fb-user';

import { FacebookService } from '../facebook/facebook.service';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  constructor(private http: HttpClient, private facebookService: FacebookService) { }

  get isUserSignedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  get currentUser(): JSON {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
  
  signIn(user: User): Observable<any> {
    const payload = {
      auth_method: "in_app",
      user: user
    }  
 
    return this.http.post(environment.api.signInAddress, payload);
  }

  signInWithFb(): Observable<any> {
    if(this.facebookService.isUserSignedIn) {
      return from(this.facebookService.getUserEmail()
        .catch(() => Promise.reject('Error in promise from facebookService.getUserEmail'))
        .then(this.authenticateUserInApi)
        .catch(() => Promise.reject('Error in promise from this.authenticateUserInApi')));
    }
  
    return from(this.facebookService.signInUser()
      .catch(() => Promise.reject('Error in promise from facebookService.getUserEmail'))
      .then(this.authenticateUserInApi)
      .catch(() => Promise.reject('Error in promise from this.authenticateUserInApi')));
  }

  private authenticateUserInApi(resp): Observable<Object> {
    const accessToken = FB.getAuthResponse().accessToken,
      payload = {
      auth_method: "facebook",
      user: {
        email: resp.email,
        access_token: accessToken
      }
    }
    
    console.log('Right before POST');
    return this.http.post(environment.api.signInAddress, payload)
  }
}
