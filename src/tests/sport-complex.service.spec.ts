import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SportComplexService } from '../app/services/sport-complex.service';
import { environment } from '../environments/environment';
import { NewSportComplex, NewSportComplexError, SportComplexList } from '../app/models/api-response';
import { SportComplex } from '../app/models/sport-complex';

describe('SportComplexService', () => {
  const subscriptionErrorHandler = () => console.error('Error occurred in SportComplexService test');
  let service: SportComplexService = null,
      http: HttpTestingController = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        SportComplexService
      ]
    });

    service = TestBed.get(SportComplexService);
    http = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchAll', () => {
    it('should return all sport complexes ', () => {
      const apiResponse: SportComplexList = { status: 'ok', data: [{ name: 'OSIR Marki' }] },
            functionResponse: Array<Object> = apiResponse.data;


      service.fetchAll().subscribe(
        sportComplexes => expect(sportComplexes).toEqual(functionResponse),
        subscriptionErrorHandler
      );

      http
        .expectOne(environment.api.sportComplexesAddress)
        .flush(apiResponse);

      http.verify();
    });
  });

  describe('create', () => {
    it('should return newly created sport complex when no errors occur', () => {
      const newSportComplexData = new SportComplex('OSIR Marki'),
            apiResponse: NewSportComplex = { status: 'ok', data: { name: newSportComplexData.name, id: 10 } },
            functionResponse: SportComplex = apiResponse.data;

      service.create(newSportComplexData).subscribe(
        newSportComplex => expect(newSportComplex).toEqual(functionResponse),
        subscriptionErrorHandler
      );

      http
        .expectOne(environment.api.newSportComplexAddress)
        .flush(apiResponse);

      http.verify();
    });

    it('should return which fields did not pass validation when errors occur', () => {
      const newSportComplexData = new SportComplex('OSIR Marki'),
        apiResponse: NewSportComplexError = { status: 'error', errors: { name: 'has already been taken' } },
        functionResponse: SportComplex = apiResponse.errors;

      service.create(newSportComplexData).subscribe(
        () => { },
        sportComplexCreationError => expect(sportComplexCreationError).toEqual(functionResponse)
      );

      http
        .expectOne(environment.api.newSportComplexAddress)
        .flush(apiResponse);

      http.verify();
    });
  });

});
