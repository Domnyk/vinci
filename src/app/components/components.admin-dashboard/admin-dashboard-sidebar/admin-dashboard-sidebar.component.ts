import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteSportComplex } from './admin-dashboard-sidebar.actions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-dashboard-sidebar',
  templateUrl: './admin-dashboard-sidebar.component.html',
  styleUrls: ['./admin-dashboard-sidebar.component.css']
})
export class AdminDashboardSidebarComponent implements OnInit {
  @Select(state => state.sportComplexes) sportComplexes$: Observable<any>;

  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit() {
  }

  deleteSportComplex(id: number) {
    this.router.navigate(['admin_dashboard'])
      .then((didNavigationSucceeded) => {
        if (didNavigationSucceeded) {
          this.store.dispatch(new DeleteSportComplex(id));
        } else {
          console.error('Navigation error occurred in admin dashboard sidebar component');
        }
      });
  }
}
