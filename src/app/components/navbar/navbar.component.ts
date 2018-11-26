import { Component, Input, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CurrentUser, UserType } from '../../models/current-user';

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

  constructor(private authorizationService: AuthorizationService, private store: Store) { }

  ngOnInit() {
    this.authorizationService.isAdmin(this.store)
      .subscribe(isAdmin => this.isAdmin = isAdmin);
  }

}
