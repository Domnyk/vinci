import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { CurrentUser } from '../../models/current-user';
import { SignOut } from '../../actions/user.actions';
import { CurrentUserType } from '../../models/current-user-type';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() title: string;
  @Select(state => state.currentUser) private currentUser$: Observable<CurrentUser>;
  CurrentUserType = CurrentUserType;

  currentUser: CurrentUser = null;

  constructor(private store: Store) { }

  ngOnInit() {
    this.currentUser$.subscribe((user: CurrentUser) => {
      this.currentUser = user;
    });
  }

  signOut() {
    this.store.dispatch(new SignOut());
  }
}
