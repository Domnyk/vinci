import { CalendarNativeDateFormatter, DateFormatterParams } from 'angular-calendar';

export class CustomDateFormatter extends CalendarNativeDateFormatter {

  public dayViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat('pl', {
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  }
}
