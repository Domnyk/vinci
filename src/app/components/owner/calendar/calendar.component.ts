import { Component, Input, OnInit } from '@angular/core';
import { CalendarNativeDateFormatter, CalendarView } from 'angular-calendar';
import { Select, Store } from '@ngxs/store';
import { FetchEvents } from './calendar.actions';
import { Observable } from 'rxjs';
import { Event } from '../../../models/event';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @Input() sportArenaId: number;

  @Select(state => state.Events) events$: Observable<Array<Event>>;

  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  isTodayViewActive = true;

  // This is necessary to use CalendarView in html template
  CalendarView = CalendarView;

  x: CalendarNativeDateFormatter

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new FetchEvents(this.sportArenaId));
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
