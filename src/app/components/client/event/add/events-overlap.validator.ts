import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';
import { map, take, tap } from 'rxjs/operators';


export const eventsOverlapValidator: (events$: Observable<Array<CalendarEvent>>) => AsyncValidatorFn = (events$) => {
  return (control: AbstractControl) => {
    const startTime: string = control.get('start').value,
          endTime: string = control.get('end').value;

    return events$.pipe(
      map((events: CalendarEvent[]) => {
        return events.map((event: CalendarEvent) => areOverlaping(startTime, endTime, event.start, event.end));
      }),
      map((values: boolean[]) => {
        return values.reduce((acc, val) => acc || val, false) ? { 'overlaps': true } : null;
      }),
      take(1)
    );
  };
};

const areOverlaping = (start1: string, end1: string, start2: Date, end2: Date): boolean => {
  const _start1 = convertToDate(start1, start2),
        _end1 = convertToDate(end1, start2);

  return ((_start1 >= start2 && _start1 < end2) || (_end1 > start2 && _end1 <= end2));
};

const convertToDate = (time: string, eventDay: Date): Date => {
  const [hour, minute]: number[] = time.split(':').map(elem => +elem),
        date = new Date();

  date.setFullYear(eventDay.getFullYear(), eventDay.getMonth(), eventDay.getDate());
  date.setHours(hour, minute, 0);

  return date;
};
