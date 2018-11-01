import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FetchAllSportComplexes } from './complex-owner-dasboard.actions';
import { FetchSportDisciplines } from './complex-owner-dasboard.actions';

@Component({
  selector: 'app-complex-owner-dashboard',
  templateUrl: './complex-owner-dashboard.component.html',
  styleUrls: ['./complex-owner-dashboard.component.css'],
})
export class ComplexOwnerDashboardComponent implements OnInit {
  @HostBinding('class.row') true;

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    this.store.dispatch([new FetchAllSportComplexes(), new FetchSportDisciplines()]);
  }
}
