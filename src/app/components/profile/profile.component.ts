import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CurrentUserType } from '../../models/current-user-type';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userType$: Observable<CurrentUserType>;

  CurrentUserType = CurrentUserType;

  constructor(private store: Store) { }

  ngOnInit() {
    this.userType$ = this.store.select(state => state.currentUser.type);
  }
}
