import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  isAdmin(store: Store): Observable<boolean> {
    const isAdmin$ = store.select(state => this._isAdmin(state.currentUser));

    return isAdmin$;
  }

  private _isAdmin(currentUser: any) {
    return this._isSignedIn(currentUser.token) && currentUser.accessType === 'admin';
  }

  private _isSignedIn(token: string) {
    return !!token;
  }
}
