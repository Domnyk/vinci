import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';
import { map, take, tap } from 'rxjs/operators';


export const eventsOverlapValidator: (events$: Observable<CalendarEvent>) => AsyncValidatorFn = (events$) => {
  return (control: AbstractControl) => {
    return events$.pipe(
      tap(console.log),
      take(1),
      map(event => of(null))
    );
  };
};
