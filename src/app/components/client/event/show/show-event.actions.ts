export class JoinEvent {
  static readonly type = 'Join event';

  constructor(public eventId: number) { }
}

export class ResignFromEvent {
  static readonly type = 'Resign from event';

  constructor(public eventId: number) { }
}
