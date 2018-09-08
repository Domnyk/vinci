import { Injectable } from '@angular/core';
import { Observable, of, bindCallback } from 'rxjs';

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

  get isUserNotSignedIn(): boolean {
    return !this.isUserSignedIn;
  }

  fetchUserEmail(cb: Function): any {
    FB.api('/me', {fields: 'email'}, cb);
  }

  signInUser(): Observable<fb.StatusResponse> {
    function subscribe(observer) {
      FB.login(resp => {
        if(resp.status === 'connected') {
          observer.next(resp);
        } else {
          observer.error(resp);
        }
      });
    }

    return Observable.create(subscribe)
  }

  getUserEmail(): Observable<fb.StatusResponse> {
    function subscribe(observer) {
      FB.api('/me', {fields: 'email'}, resp => {
        observer.next(resp);
      });
    }
  
    return Observable.create(subscribe);
  }

  private initFb() {
    FB.init({
      appId            : '315422445647491',
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
