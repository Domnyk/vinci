import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SportObjectState } from '../../../../state/sport-object.state';
import { SportObject } from '../../../../models/sport-object';
import { map } from 'rxjs/operators';
import { SportArenaState } from '../../../../state/sport-arena.state';
import { SportArena } from '../../../../models/sport-arena';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {
  @Select(state => state.router.state.params.id) objectId$: Observable<string>;
  arenas$: Observable<SportArena[]>;
  object$: Observable<SportObject>;

  constructor(private store: Store) { }

  ngOnInit() {
    this.objectId$.subscribe((id: string) => {
      this.object$ = this.store.select(SportObjectState.sportObject).pipe(map(filterFn => filterFn(+id)));

      this.arenas$ = this.store.select(SportArenaState.sportArenasInSportObject).pipe(
        map(filterFn => filterFn(+id))
      );
    });
  }

}