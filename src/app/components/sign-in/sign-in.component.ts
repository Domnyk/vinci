import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication/authentication.service';

import { Store } from '@ngxs/store';
import { SignInWithFb, SignInWithPassword } from '../../actions/sign-in.actions';

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
    private authorizationService: AuthenticationService,
    private router: Router,
    private store: Store) { }

  ngOnInit() {}

  onFBSignInClick(): void {
    this.store.dispatch(new SignInWithFb())
      .subscribe(() => this.router.navigate(['/admin_dashboard']));
  }

  onSubmit(): void {
    this.store.dispatch(new SignInWithPassword());
  }

}
