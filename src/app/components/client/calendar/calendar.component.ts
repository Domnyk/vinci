import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { CalendarView, CalendarEvent, collapseAnimation } from 'angular-calendar';
import { Select, Store } from '@ngxs/store';
import { Observable, of, zip } from 'rxjs';
import { isEqual, startOfDay } from 'date-fns';
import { Event } from '../../../models/event';
import { ExternalEvent } from '../../../models/external-event';
import { flatMap } from 'rxjs/operators';
import { MetaSelectorsService } from '../../../services/meta-selectors.service';

@Component({
  selector: 'app-calendar-client',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  animations: [collapseAnimation]
})
export class CalendarComponent implements OnInit {
  @Input() arenaId$: Observable<number>;
  @Select(state => state.Events) events$: Observable<Array<CalendarEvent>>;
  @Select(state => state.ExternalEvents) externalEvents$: Observable<Array<ExternalEvent>>;
  @Select(MetaSelectorsService.allEvents) allEvents$: Observable<CalendarEvent>;

  createEventModalName = 'createEvent';
  showEventModalName = 'showEvent';
  view: CalendarView = CalendarView.Month;
  viewDate: Date = startOfDay(new Date());
  isTodayViewActive = true;
  activeDayIsOpen = true;
  clickedEvent: Event = null;

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

  eventClicked(event: Event) {
    this.clickedEvent = event;
  }

}
