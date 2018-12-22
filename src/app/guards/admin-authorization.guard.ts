import { Observable, of } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { flatMap } from 'rxjs/operators';
import { CurrentUserType } from '../models/current-user-type';

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
        flatMap((userType: CurrentUserType) => {
          if (userType === CurrentUserType.ComplexesOwner) {
            return of(true);
          } else {
            this.router.navigate(['/unauthorized']);
            return of(false);
          }
        })
      );
  }
}
