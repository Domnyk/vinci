import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SportComplex } from '../../../models/sport-complex';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-sport-complex-dashboard',
  templateUrl: './sport-complex-dashboard.component.html',
  styleUrls: ['./sport-complex-dashboard.component.css']
})
export class SportComplexDashboardComponent implements OnInit {
  public sportComplex: SportComplex;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit() {

    // TODO: Refactor process of retrieving sport complex based on ID
    this.activatedRoute.params.subscribe(
      ({ id }: Params) => {
        this.store.select(state => state.sportComplexes.filter(sportComplex => sportComplex.id === +id))
          .subscribe(([sportComplex]) => this.sportComplex = sportComplex);
      }
    );
  }

}
