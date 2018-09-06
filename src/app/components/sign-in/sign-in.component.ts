import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthorizationService } from '../../services/authorization/authorization.service';

import { Store } from '@ngxs/store';
import { SignInUser } from '../../actions/user.actions';

import { User } from '../../models/user';
import { FbUser } from '../../models/fb-user';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  fbSignInAddress = environment.api.fbSignInAddress;
  userLoginStatus: any;

  user: User = new User(null, null);
  fbUser: FbUser = new FbUser(null, null);

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router,
    private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new SignInUser({ name: 'Steve Wozniak', password: 'Haxor password'}))
  }

  onFBSignInClick(): void {
    this.authorizationService.signInWithFb()
      .subscribe(
        resp => console.log('Sign in ok: ', resp),
        err => console.log('Error occured: ', err)
      );
  }

  onSubmit(): void {
    this.authorizationService.signIn(this.user)
      .subscribe(resp => console.log(resp));
  }

}
