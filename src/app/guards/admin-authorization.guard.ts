import { Observable, of } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { flatMap, tap } from 'rxjs/operators';
import { UserType } from '../models/current-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthorizationGuard implements CanActivate {

  constructor(
    private store: Store,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.store.select(state => state.currentUser.type)
      .pipe(
        flatMap((userType: UserType) => of(userType === UserType.ComplexesOwner)),
        tap(console.log)
      );
  }
}
