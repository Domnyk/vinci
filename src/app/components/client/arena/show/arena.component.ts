import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { flatMap, map, tap } from 'rxjs/operators';
import { FetchEvents } from '../../../owner/calendar/calendar.actions';
import { Event } from '../../../../models/event';
import { FetchExternalEvents } from '../../../owner/external-event/add-external-event/add-external-event.actions';
import { SportArena } from '../../../../models/sport-arena';
import { SportArenaState } from '../../../../state/sport-arena.state';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css']
})
export class ArenaComponent implements OnInit {
  private events$: Observable<Event[]>;
  public arenaId$: Observable<number>;
  public arena: SportArena = null;

  constructor(private activatedRoute: ActivatedRoute, private store: Store) { }

  ngOnInit() {
    this.arenaId$ = this.activatedRoute.params.pipe(
      flatMap(({ id }: Params) => of(+id)),
      tap((id: number) => this.store.dispatch(new FetchEvents(id))),
      tap((id: number) => this.store.dispatch(new FetchExternalEvents(id))),
    );

    this.arenaId$.subscribe(id => {
      this.store.select(SportArenaState.sportArena)
        .pipe(map(filterFn => filterFn(id)))
        .subscribe(arenas => this.arena = arenas[0]);
    });
  }

}
