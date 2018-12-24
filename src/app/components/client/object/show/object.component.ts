import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { SportObjectState } from '../../../../state/sport-object.state';
import { SportObject } from '../../../../models/sport-object';
import { catchError, map } from 'rxjs/operators';
import { SportArenaState } from '../../../../state/sport-arena.state';
import { SportArena } from '../../../../models/sport-arena';
import { ActivatedRoute, Params } from '@angular/router';
import { AddressHelper } from '../../../../helpers/address.helper';
import { FetchSportArenasInSportObject } from '../../../owner/object/show/sport-object.actions';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {
  arenas$: Observable<SportArena[]>;
  object$: Observable<SportObject>;

  AddressHelper = AddressHelper;

  constructor(private store: Store, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ id }: Params) => {
      this.object$ = this.store.select(SportObjectState.getById).pipe(map(filterFn => filterFn(+id)));

      this.store.dispatch(new FetchSportArenasInSportObject(id));

      this.arenas$ = this.store.select(SportArenaState.sportArenasInSportObject).pipe(
        map(filterFn => filterFn(+id))
      );
    });
  }

}
