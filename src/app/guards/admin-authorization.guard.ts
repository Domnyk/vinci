import { Observable, of } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { flatMap } from 'rxjs/operators';
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
    return this.store.select(state => state.currentUser.data.type)
      .pipe(
        flatMap((userType: UserType) => {
          if (userType === UserType.ComplexesOwner) {
            return of(true);
          } else {
            this.router.navigate(['/unauthorized']);
            return of(false);
          }
        })
      );
  }
}
