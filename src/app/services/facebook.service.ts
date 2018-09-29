import { Injectable } from '@angular/core';
import { Observable, of, bindCallback } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {
  private signInStatus: string = null;

  constructor() {
    this.initFb();
    this.fetchSignInStatus();
  }

  get isUserSignedIn(): boolean {
    return this.signInStatus === 'connected';
  }

  signInUser(): Observable<fb.StatusResponse> {
    function subscribe(observer) {
      FB.login(resp => {
        if (resp.status === 'connected') {
          observer.next(resp);
        } else {
          observer.error(resp);
        }
      });
    }

    return Observable.create(subscribe);
  }

  getUserEmail(): Observable<fb.StatusResponse> {
    function subscribe(observer) {
      FB.api('/me', { fields: 'email' }, resp => {
        observer.next(resp);
      });
    }

    return Observable.create(subscribe);
  }

  private initFb() {
    FB.init({
      appId            : environment.facebookAppId,
      xfbml            : true,
      version          : 'v3.1',
      status           : true
    });
  }

  private fetchSignInStatus(): void {
    FB.getLoginStatus(resp => {
      this.signInStatus = resp.status;
    });
  }
}
