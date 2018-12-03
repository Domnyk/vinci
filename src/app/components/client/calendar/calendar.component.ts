import { Component, Input, OnInit } from '@angular/core';
import { CalendarView, CalendarEvent, collapseAnimation } from 'angular-calendar';
import { Select, Store } from '@ngxs/store';
import { FetchEvents } from '../../owner/calendar/calendar.actions';
import { Observable, of, Subject } from 'rxjs';
import { Event } from '../../../models/event';
import { isEqual, startOfDay } from 'date-fns';
import { flatMap, tap } from 'rxjs/operators';
import { CustomEventView } from '../../../models/custom-event-view';

@Component({
  selector: 'app-calendar-client',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  animations: [collapseAnimation]
})
export class CalendarComponent implements OnInit {
  @Input() arenaId$: Observable<number>;
  public events$: Observable<Array<CalendarEvent>>;

  createEventModalName = 'createEvent';
  showEventModalName = 'showEvent';
  view: CalendarView = CalendarView.Month;
  viewDate: Date = startOfDay(new Date());
  isTodayViewActive = true;
  activeDayIsOpen = true;
  clickedEvent: CustomEventView = null;

  // This is necessary to use CalendarView in html template
  CalendarView = CalendarView;

  constructor(private store: Store) { }

  ngOnInit() {
    this.events$ = this.store.select(state => state.Events);
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

  dayClicked({ date }: { date: Date }): void {
    const dayWasOpenNowOtherClicked = !isEqual(this.viewDate, date) && this.activeDayIsOpen;
    if (dayWasOpenNowOtherClicked) {
      console.log('Day was open and other day was clicked');
    }

    this.viewDate = date;
    this.activeDayIsOpen = !this.activeDayIsOpen;
  }

  eventClicked(event: CustomEventView) {
    this.clickedEvent = event;
  }

}
