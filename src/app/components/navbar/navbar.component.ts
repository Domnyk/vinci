import { Component, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CurrentUser, UserType } from '../../models/current-user';
import { SignOut } from '../../actions/user.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() title: string;
  @Select(state => state.currentUser) currentUser$: Observable<CurrentUser>;

  isAdmin = false;

  UserType = UserType;

  constructor(private store: Store) { }

  ngOnInit() { }

  signOut() {
    this.store.dispatch(new SignOut());
  }

}
