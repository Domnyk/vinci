export class DateHelper {
  static toCustomDate(date: Date): CustomDate {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    };
  }
}
