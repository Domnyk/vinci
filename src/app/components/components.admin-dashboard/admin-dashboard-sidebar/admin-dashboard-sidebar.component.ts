import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DeleteSportComplex } from './admin-dashboard-sidebar.actions';

@Component({
  selector: 'app-admin-dashboard-sidebar',
  templateUrl: './admin-dashboard-sidebar.component.html',
  styleUrls: ['./admin-dashboard-sidebar.component.css']
})
export class AdminDashboardSidebarComponent implements OnInit {
  @Select(state => state.sportComplexes) sportComplexes$: Observable<any>;

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
  }

  deleteSportComplex(id: number) {
    this.store.dispatch(new DeleteSportComplex(id));
  }
}
