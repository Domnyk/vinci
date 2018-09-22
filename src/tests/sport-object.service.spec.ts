import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SportObjectService } from '../app/services/sport-object.service';
import { environment } from '../environments/environment';
import {Coords, SportObject} from '../app/models/sport-object';

describe('SportObjectService', () => {
  const subscriptionErrorHandler = () => console.error('Error occurred in SportObjectService test');
  let service: SportObjectService = null,
      http: HttpTestingController = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SportObjectService],
      imports: [
        HttpClientTestingModule
      ],
    });

    service = TestBed.get(SportObjectService);
    http = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchAll', () => {
    it('should return all sport objects', () => {
      const apiResponse: Array<SportObject> = [ { id: 1, name: 'Pływalnia Polonez', geo_coordinates: new Coords(2, 3) }],
        functionResponse: Array<Object> = apiResponse;


      service.fetchAll().subscribe(
        sportObjects => expect(sportObjects).toEqual(functionResponse),
        subscriptionErrorHandler
      );

      http
        .expectOne(environment.api.sportObjectsAddress)
        .flush(apiResponse);

      http.verify();
    });
  });
});
