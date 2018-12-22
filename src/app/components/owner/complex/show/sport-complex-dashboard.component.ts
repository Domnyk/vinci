import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngxs/store';
import { SportComplexState } from '../../../../state/sport-complex.state';
import { Observable } from 'rxjs/index';
import { map } from 'rxjs/operators';
import { FetchSportObjectsInSportComplex } from './sport-complex-dashboard.actions';
import { SportObject } from '../../../../models/sport-object';
import { SportObjectState } from '../../../../state/sport-object.state';
import { Complex } from '../../../../models/complex';

@Component({
  selector: 'app-sport-complex-dashboard',
  templateUrl: './sport-complex-dashboard.component.html',
  styleUrls: ['./sport-complex-dashboard.component.css']
})
export class SportComplexDashboardComponent implements OnInit {
  public sportObjects$: Observable<SportObject[]>;
  public complex: Complex;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }: Params) => {
      this.store.select(SportComplexState.getById)
        .pipe(map(filterFn => filterFn(id)))
        .subscribe((complex: Complex) => this.complex = complex);

      this.sportObjects$ = this.store.select(SportObjectState.sportObjectsInSportComplex).pipe(
        map(filterFn => filterFn(id)),
      );

      this.store.dispatch(new FetchSportObjectsInSportComplex(id));
    });
  }
}
