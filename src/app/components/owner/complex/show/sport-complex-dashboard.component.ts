import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SportComplex } from '../../../../models/sport-complex';
import { Store } from '@ngxs/store';
import { SportComplexState } from '../../../../state/sport-complex.state';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/operators';
import { FetchSportObjectsInSportComplex } from './sport-complex-dashboard.actions';
import { SportObject } from '../../../../models/sport-object';
import { SportObjectState } from '../../../../state/sport-object.state';

@Component({
  selector: 'app-sport-complex-dashboard',
  templateUrl: './sport-complex-dashboard.component.html',
  styleUrls: ['./sport-complex-dashboard.component.css']
})
export class SportComplexDashboardComponent implements OnInit {
  public sportComplex$: Observable<SportComplex>;
  public sportObjects$: Observable<SportObject[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      ({ id }: Params) => {
        this.sportComplex$ = this.store.select(SportComplexState.sportComplex).pipe(
          map(filterFn => filterFn(id)),
          map((sportComplexes: Array<SportComplex>) => sportComplexes[0])
        );

        this.sportObjects$ = this.store.select(SportObjectState.sportObjectsInSportComplex).pipe(
          map(filterFn => filterFn(id)),
        );

        this.store.dispatch(new FetchSportObjectsInSportComplex(id));
      }
    );
  }
}
