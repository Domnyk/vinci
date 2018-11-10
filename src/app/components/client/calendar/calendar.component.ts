import { Component, OnInit } from '@angular/core';
import { CalendarView, CalendarEvent, collapseAnimation } from 'angular-calendar';
import { Select, Store } from '@ngxs/store';
import { FetchEvents } from '../../owner/calendar/calendar.actions';
import { Observable, Subject } from 'rxjs';
import { Event } from '../../../models/event';
import { isEqual, startOfDay } from 'date-fns';

@Component({
  selector: 'app-calendar-client',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  animations: [collapseAnimation]
})
export class CalendarComponent implements OnInit {
  @Select(state => state.Events) events$: Observable<Array<Event>>;

  view: CalendarView = CalendarView.Month;
  viewDate: Date = startOfDay(new Date());
  isTodayViewActive = true;
  activeDayIsOpen = true;

  // This is necessary to use CalendarView in html template
  CalendarView = CalendarView;

  constructor(private store: Store) { }

  ngOnInit() { }

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

  dayClicked({ date }: { date: Date }): void {

    const dayWasOpenNowOtherClicked = !isEqual(this.viewDate, date) && this.activeDayIsOpen;
    if (dayWasOpenNowOtherClicked) {
      console.log('Day was open and other day was clicked');
    }

    this.viewDate = date;
    this.activeDayIsOpen = !this.activeDayIsOpen;
  }

  show

}
