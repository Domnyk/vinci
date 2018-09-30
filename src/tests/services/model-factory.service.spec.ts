import { TestBed, inject } from '@angular/core/testing';

import { ModelFactoryService } from '../../app/services/model-factory.service';

xdescribe('ModelFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelFactoryService]
    });
  });

  it('should be created', inject([ModelFactoryService], (service: ModelFactoryService) => {
    expect(service).toBeTruthy();
  }));
});
