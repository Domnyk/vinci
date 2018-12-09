import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { flatMap, tap } from 'rxjs/operators';
import { FetchEvents } from '../../../owner/calendar/calendar.actions';
import { Event } from '../../../../models/event';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css']
})
export class ArenaComponent implements OnInit {
  private events$: Observable<Event[]>;
  public arenaId$: Observable<number>;

  constructor(private activatedRoute: ActivatedRoute, private store: Store) { }

  ngOnInit() {
    this.arenaId$ = this.activatedRoute.params.pipe(
      flatMap(({ id }: Params) => of(+id)),
      tap((id: number) => this.store.dispatch(new FetchEvents(id)))
    );
  }

}
