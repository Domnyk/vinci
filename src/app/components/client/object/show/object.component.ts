import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { SportObjectState } from '../../../../state/sport-object.state';
import { SportObject } from '../../../../models/sport-object';
import { catchError, map } from 'rxjs/operators';
import { SportArenaState } from '../../../../state/sport-arena.state';
import { SportArena } from '../../../../models/sport-arena';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {
  arenas$: Observable<SportArena[]>;
  object$: Observable<SportObject>;

  constructor(private store: Store, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }: Params) => {
      this.object$ = this.store.select(SportObjectState.sportObject).pipe(map(filterFn => filterFn(+id)));

      this.arenas$ = this.store.select(SportArenaState.sportArenasInSportObject).pipe(
        map(filterFn => filterFn(+id))
      );
    });
  }

}
