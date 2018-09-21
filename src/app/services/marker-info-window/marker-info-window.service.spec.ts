import { TestBed } from '@angular/core/testing';

import { MarkerInfoWindowService } from './marker-info-window.service';
import { SportObject } from '../../models/sport-object';

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

  it('should have proper content', () => {
    const sportObject: SportObject = new SportObject(1, 'Pływalnia Polonez', { latitude: 52.299046, longitude: 21.033690 }),
          actualContent = service.generateInfoWindowContent(sportObject),
          expectedContent = `<div>` +
                            `<p class="lead">${sportObject.name}</p>` +
                            `<p>Dostępne dyscypliny sportowe:</p>` +
                            `<ul><li>Piłka nożna</li><li>Piłka halowa</li></ul>` +
                            `<a href="/sport_objects/${sportObject.id}">Przejdź do strony obiektu</a>` +
                            `</div>`;

    expect(actualContent).toEqual(expectedContent);
  });
});
