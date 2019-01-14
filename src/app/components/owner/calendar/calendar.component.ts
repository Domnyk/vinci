import { Component, Input, OnInit } from '@angular/core';
import { CalendarNativeDateFormatter, CalendarView } from 'angular-calendar';
import { Select, Store } from '@ngxs/store';
import { FetchEvents } from './calendar.actions';
import { concat, merge, Observable, of, zip } from 'rxjs';
import { Event } from '../../../models/event';
import { FetchExternalEvents } from '../external-event/add-external-event/add-external-event.actions';
import { ExternalEvent } from '../../../models/external-event';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() sportArenaId: number;

  @Select(state => state.Events) events$: Observable<Array<Event>>;
  @Select(state => state.ExternalEvents) externalEvents$: Observable<Array<ExternalEvent>>;
  allEvents$: Observable<Array<Event | ExternalEvent>>;

  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  isTodayViewActive = true;

  // This is necessary to use CalendarView in html template
  CalendarView = CalendarView;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new FetchEvents(this.sportArenaId));
    this.store.dispatch(new FetchExternalEvents(this.sportArenaId));

    this.allEvents$ = zip(this.events$, this.externalEvents$).pipe(
      flatMap(([events, externalEvents]) => of([...events, ...externalEvents]))
    );
  }

  getTodayButtonClass(): string {
    if (this.isTodayViewActive) {
      return 'btn-info';
    }

    return 'btn-outline-info';
  }

  getClassForTimeIntervalButton(view: CalendarView): string {
    if (this.view === view) {
      return 'btn-info';
    }

    return 'btn-outline-info';
  }

}
