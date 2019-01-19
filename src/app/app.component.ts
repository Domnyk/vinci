import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { UserHasSignedIn } from './actions/sign-in.actions';
import { HideFlashMessage } from './actions/flash-message.actions';
import { FlashMessage } from './models/flash-message';
import { Observable, of, throwError, timer } from 'rxjs';
import { NetworkConnectionService } from './services/network-connection.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { GetCsrfToken } from './actions/user.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private static readonly PAIR_SEPARATOR = '&';
  private static readonly KEY_VALUE_SEPARATOR = '=';

  @Select(state => state.flashMessage) flashMessage$: Observable<FlashMessage>;

  isInternetConnection = true;
  isApiConnection = true;
  ApiStatus = AppStatus;
  title = 'Vinci';
  flashMsg: FlashMessage = null;

  constructor(private store: Store, private router: Router, private route: ActivatedRoute,
              private networkConnectionService: NetworkConnectionService) { }

  ngOnInit() {
    this.flashMessage$.subscribe((flash: FlashMessage) => this.flashMsg = flash);

    this.store.dispatch(new GetCsrfToken());

    this.parseURLFragments();

    timer(0, 1000).pipe(
      switchMap(() => this.networkConnectionService.isApiOnline())
    ).subscribe((status: boolean) => {
      this.isApiConnection = status;
    });

    window.addEventListener('online', () => {
      this.isInternetConnection = true;
    });

    window.addEventListener('offline', () => {
      this.isInternetConnection = false;
    });
  }

  @HostListener('document:click')
  hideFlashAfterClick() {
    if (!!this.flashMsg) {
      this.store.dispatch(new HideFlashMessage());
    }
  }

  private parseURLFragments(): void {
    this.route.fragment.pipe(
      map(fragment => fragment.split(AppComponent.PAIR_SEPARATOR)),
      map((fragments: string[]) => fragments && fragments.length > 0 ? fragments : throwError('Empty fragment')),
      map((fragments: string[]) => fragments.map(fragment => fragment.split(AppComponent.KEY_VALUE_SEPARATOR))),
      map((keyValuePairs: string[][]) => keyValuePairs.map(([key, value]) => ({ key: key, value: value }))),
      catchError(error => of([{ key: null, value: null }]))
    ).subscribe((pairs: Array<{key: string, value: string}>) => {
      const { id, paypal_email, display_name } = <UserInfo>pairs.reduce((prev: Object, current) => {
        return Object.assign(prev, { [current.key]: current.value });
      }, { });

      if (!!id && !!paypal_email && !!display_name) {
        this.store.dispatch(new UserHasSignedIn(+id, paypal_email, display_name));
      }
    });
  }

  get appStatus(): AppStatus {
    if (this.isInternetConnection && this.isApiConnection) { return AppStatus.ALL_GOOD; }
    if (this.isInternetConnection && !this.isApiConnection) { return AppStatus.API_NOT_WORKING; }
    return AppStatus.NO_INTERNET_CONNECTION;
  }
}

enum AppStatus {
  NO_INTERNET_CONNECTION = 'NO_INTERNET_CONNECTION',
  API_NOT_WORKING = 'API_NOT_WORKING',
  ALL_GOOD = 'ALL_GOOD'
}

interface UserInfo {
  id: string;
  paypal_email: string;
  display_name: string;
}
