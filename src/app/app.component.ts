import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { UserHasSignedIn } from './actions/sign-in.actions';
import { HideFlashMessage } from './actions/flash-message.actions';
import { FlashMessage } from './models/flash-message';
import { Observable, timer } from 'rxjs';
import { NetworkConnectionService } from './services/network-connection.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Select(state => state.flashMessage) flashMessage$: Observable<FlashMessage>;

  isInternetConnection = true;
  isApiConnection = true;
  ApiStatus = AppStatus;
  title = 'Vinci';
  flashMsg: FlashMessage = null;

  constructor(private store: Store, private router: Router, private route: ActivatedRoute,
              private networkConnection: NetworkConnectionService) { }

  ngOnInit() {
    this.flashMessage$.subscribe((flash: FlashMessage) => this.flashMsg = flash);

    this.route.fragment.subscribe((fragment: string) => {
      if (!fragment || !fragment.split('&')) {
        return;
      }

      const fragments = fragment.split('&'),
            userInfo: Object =
              fragments
                .map((keyValuePair: string) => {
                  const [key, value]: Array<string> = keyValuePair.split('=');
                  return { key: key, value: value };
                })
                .reduce((prev: Object, current) => {
                  return Object.assign(prev, { [current.key]: current.value });
                }, { });

      const { id, display_name: displayName, paypal_email: paypalEmail } = <UserInfo>userInfo;
      if (!id && !displayName) {
        return;
      }

      this.store.dispatch(new UserHasSignedIn(+id, paypalEmail, displayName));
    });

    timer(0, 1000).pipe(
      switchMap(() => this.networkConnection.isApiOnline())
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
