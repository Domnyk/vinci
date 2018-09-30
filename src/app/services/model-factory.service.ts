import { Injectable } from '@angular/core';
import { BookingMargin, Coords, SportObject } from '../models/sport-object';
import { UnescapedBuildingAddress } from '../models/building-address';

@Injectable({
  providedIn: 'root'
})
export class ModelFactoryService {
  constructor() { }

  get forForm(): ForForm {
    return {
      newSportObject: () => SportObjectFactory.sportObject
    };
  }
}

class SportObjectFactory {
  static get sportObject(): SportObject {
    const id: number = null,
          name = '',
          address: UnescapedBuildingAddress = { street: '', buildingNumber: null, postalCode: '', city: '' },
          geoCoordinates = new Coords(null, null),
          bookingMargin: BookingMargin = { months: null, days: null, seconds: 0 };

    return new SportObject(id, name, address, geoCoordinates, bookingMargin);
  }
}

interface ForForm {
  newSportObject: () => SportObject;
}


