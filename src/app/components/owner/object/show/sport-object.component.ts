import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Params } from '@angular/router';
import { SportObject } from '../../../../models/sport-object';
import { Observable } from 'rxjs/index';
import { Store } from '@ngxs/store';
import { SportObjectState } from '../../../../state/sport-object.state';
import { map } from 'rxjs/operators';
import { FetchSportArenasInSportObject } from './sport-object.actions';
import { SportArenaState } from '../../../../state/sport-arena.state';

@Component({
  selector: 'app-sport-object',
  templateUrl: './sport-object.component.html',
  styleUrls: ['./sport-object.component.css']
})
export class SportObjectComponent implements OnInit {
  public sportObject$: Observable<SportObject>;
  public sportArenas$: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      ({ id }: Params) => {
        this.sportObject$ = this.store.select(SportObjectState.sportObject).pipe(
          map(filterFn => filterFn(id))
        );

        this.store.dispatch(new FetchSportArenasInSportObject(id));

        this.sportArenas$ = this.store.select(SportArenaState.sportArenasInSportObject).pipe(
          map(filterFn => filterFn(id))
        );
      }
    );
  }

}
