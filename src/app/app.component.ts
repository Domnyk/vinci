import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { UserHasSignedIn } from './actions/sign-in.actions';
import { HideFlashMessage } from './actions/flash-message.actions';
import { FlashMessage } from './models/flash-message';
import { Observable, of, zip } from 'rxjs';
import { NetworkConnectionService } from './services/network-connection.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Select(state => state.flashMessage) flashMessage$: Observable<FlashMessage>;

  status: ApiStatus = null;
  ApiStatus = ApiStatus;
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

      const { display_name: displayName, paypal_email: paypalEmail } = <UserInfo>userInfo;
      if (!displayName) {
        return;
      }

      this.store.dispatch(new UserHasSignedIn(paypalEmail, displayName));
    });


    zip(this.networkConnection.isApiOnline(), of(this.networkConnection.isUserOnline())).subscribe(
      ([isApiOnline, isUserOnline]: boolean[]) => {
        if (isApiOnline && isUserOnline) { this.status = ApiStatus.ALL_GOOD; return; }
        if (isUserOnline && !isApiOnline) { this.status = ApiStatus.API_NOT_WORKING; return; }
        this.status = ApiStatus.NO_INTERNET_CONNECTION;
      });
  }

  @HostListener('document:click')
  hideFlashAfterClick() {
    if (!!this.flashMsg) {
      this.store.dispatch(new HideFlashMessage());
    }
  }
}

enum ApiStatus {
  NO_INTERNET_CONNECTION = 'NO_INTERNET_CONNECTION',
  API_NOT_WORKING = 'API_NOT_WORKING',
  ALL_GOOD = 'ALL_GOOD'
}

interface UserInfo {
  paypal_email: string;
  display_name: string;
}
