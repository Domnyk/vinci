import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FetchAllSportComplexes } from './admin-dashboard.actions';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.store.dispatch(new FetchAllSportComplexes());
  }
}
