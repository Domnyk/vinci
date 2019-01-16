import { Injectable } from '@angular/core';
import { Selector } from '@ngxs/store';
import { EventState } from '../state/event.state';
import { ExternalEventState } from '../state/external-event.state';

@Injectable({
  providedIn: 'root'
})
export class MetaSelectorsService {
  constructor() {}

  @Selector([EventState, ExternalEventState])
  static allEvents(events, externalEvents) {
    return [
      ...events,
      ...externalEvents
    ];
  }
}
