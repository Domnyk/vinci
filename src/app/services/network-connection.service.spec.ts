import { TestBed, inject } from '@angular/core/testing';

import { NetworkConnectionService } from './network-connection.service';

describe('NetworkConnectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NetworkConnectionService]
    });
  });

  it('should be created', inject([NetworkConnectionService], (service: NetworkConnectionService) => {
    expect(service).toBeTruthy();
  }));
});
