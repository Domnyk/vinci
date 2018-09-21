import { Component, Input, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input()
  title: string;

  isAdmin = false;

  constructor(private authorizationService: AuthorizationService, private store: Store) { }

  ngOnInit() {
    this.authorizationService.isAdmin(this.store)
      .subscribe(isAdmin => this.isAdmin = isAdmin);
  }

}
