import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SignInWithPassword } from '../../actions/sign-in.actions';

import { User } from '../../models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user: User = new User(null, null);

  constructor(
    private router: Router,
    private store: Store) { }

  ngOnInit() {}

  onSubmit(): void {
    this.store.dispatch(new SignInWithPassword(this.user))
      .subscribe(() => this.router.navigate(['/admin_dashboard']));
  }

}
