import { TestBed } from '@angular/core/testing';

import { SignUpService } from '../app/services/sign-up.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../environments/environment.dev';
import { Credentials } from '../app/models/credentials';
import { SignUpResponse } from '../app/models/api-response';

describe('SignUpService', () => {
  const subscriptionErrorHandler = () => console.error('Error occurred in SignUpService test');
  let service: SignUpService = null,
      http: HttpTestingController = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignUpService],
      imports: [
        HttpClientTestingModule
      ]
    });

    service = TestBed.get(SignUpService);
    http = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signUp', () => {
    it('should return response with new credentials data when registration was successful', () => {
      const newUserData = new Credentials('john@test.com', 'This is my very strong password'),
        apiResponse: SignUpResponse = { status: 'ok', email: newUserData.email, id: 1 },
        functionResponse: SignUpResponse = apiResponse;

      service.signUp(newUserData).subscribe(
        newSportComplex => expect(newSportComplex).toEqual(functionResponse),
        subscriptionErrorHandler
      );

      http
        .expectOne(environment.api.urls.signUp)
        .flush(apiResponse);

      http.verify();
    });
  });
});
