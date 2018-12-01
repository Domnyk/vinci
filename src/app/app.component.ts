import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { RouterStateParams } from './state/custom-router-state-serializer';
import { Observable } from 'rxjs';
import { UserHasSignedIn } from './actions/sign-in.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Vinci';

  constructor(private store: Store, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
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

      const { display_name: displayName, email } = <UserInfo>userInfo;
      if (!email || !displayName) {
        return;
      }

      this.store.dispatch(new UserHasSignedIn(email, displayName));
    });
  }
}

interface UserInfo {
  display_name: string;
  email: string;
}
