import { TestBed } from '@angular/core/testing';

import { MarkerInfoWindowService } from '../../app/services/marker-info-window.service';

describe('MarkerInfoWindowService', () => {
  let service: MarkerInfoWindowService = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkerInfoWindowService]
    });

    service = TestBed.get(MarkerInfoWindowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should have proper content', () => {
    /* const sportObject: sportObject = new sportObject(1, 'Pływalnia Polonez', { lat: 52.299046, lng: 21.033690 }),
          actualContent = service.generateInfoWindowContent(sportObject),
          expectedContent = `<div>` +
                            `<p class="lead">${sportObject.name}</p>` +
                            `<p>Dostępne dyscypliny sportowe:</p>` +
                            `<ul><li>Piłka nożna</li><li>Piłka halowa</li></ul>` +
                            `<a href="/sport_objects/${sportObject.id}">Przejdź do strony obiektu</a>` +
                            `</div>`; */

    // expect(actualContent).toEqual(expectedContent);
  });
});
