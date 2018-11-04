import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SignInWithPassword } from '../../actions/sign-in.actions';

import { User } from '../../models/user';
import { environment } from '../../../environments/environment.generated.dev';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user: User = new User(null, null);
  backendSignInAddress: string = environment.api.signInURL;

  constructor(
    private router: Router,
    private store: Store) { }

  ngOnInit() {}

  onSubmit(): void {
    this.store.dispatch(new SignInWithPassword(this.user))
      .subscribe(() => this.router.navigate(['/admin_dashboard']));
  }

}
