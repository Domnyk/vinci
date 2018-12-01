import { Observable, of } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { flatMap, map } from 'rxjs/operators';
import { UserType } from '../models/current-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthorizationGuard implements CanActivate {

  constructor(
    private authorizationService: AuthorizationService,
    private store: Store,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    // TODO: Uncomment later. For now it is convenience mock

    // console.warn('AdminAuthorizationGuard.canActive is mocked and returns always true');
    // return of(true);
    // const adminStatusHandler: (value: boolean) => boolean = isAdmin => {
    //   if (isAdmin) {
    //     return true;
    //   } else {
    //     this.router.navigate(['/']);
    //     return false;
    //   }
    // };

    // return this.authorizationService.isAdmin(this.store).pipe(
    //   map(adminStatusHandler)
    // );

    return this.store.select(state => state.currentUser.type)
      .pipe(
        flatMap((userType: UserType) => of(userType === UserType.ComplexesOwner))
      );
  }
}
