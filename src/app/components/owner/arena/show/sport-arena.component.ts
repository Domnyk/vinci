import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { SportArenaState } from '../../../../state/sport-arena.state';
import { SportArena } from '../../../../models/sport-arena';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sport-arena-component',
  templateUrl: './sport-arena.component.html',
  styleUrls: ['./sport-arena.component.css']
})
export class SportArenaComponent implements OnInit {
  sportArena$: Observable<SportArena>;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      ({ id }: Params) => {
        this.sportArena$ = this.store.select(SportArenaState.sportArena).pipe(
          map(filterFn => filterFn(id)),
          map((sportArenas: Array<SportArena>) => sportArenas[0])
        );
      }
    );
  }
}
