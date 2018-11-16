import { Injectable } from '@angular/core';
import { BookingMargin, SportObject } from '../models/sport-object';
import { UnescapedBuildingAddress } from '../models/building-address';
import { SportDiscipline } from '../models/sport-discipline';

@Injectable({
  providedIn: 'root'
})
export class ModelFactoryService {
  constructor() { }

  get forForm(): ForForm {
    return {
      newSportObject: () => SportObjectFactory.sportObject,
      newSportDiscipline: () => SportDisciplineFactory.sportDiscipline
    };
  }
}

class SportObjectFactory {
  static get sportObject(): SportObject {
    const id: number = null,
          name = '',
          address: UnescapedBuildingAddress = { street: '', buildingNumber: null, postalCode: '', city: '' },
          geoCoordinates = { lat: null, lng: null },
          bookingMargin: BookingMargin = { months: null, days: null, seconds: 0 };

    return new SportObject(id, name, address, geoCoordinates, bookingMargin);
  }
}

class SportDisciplineFactory {
  static get sportDiscipline(): SportDiscipline {
    const id: number = null,
          name = '';

    return new SportDiscipline(id, name);
  }


}

interface ForForm {
  newSportObject: () => SportObject;
  newSportDiscipline: () => SportDiscipline;
}


