import { TestBed } from '@angular/core/testing';

import { ColorService } from '../app/services/color.service';
import { Rgb } from '../app/models/colors';

describe('ColorService', () => {
  let service: ColorService = null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ColorService]
    });

    service = TestBed.get(ColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('interpolate', () => {
    it('should return first color when factor is 0', () => {
      const green: Rgb = { r: 0, g: 255, b: 0 },
            red: Rgb = { r: 255, g: 0, b: 0 },
            expectedResult = green;
      let actualResult: Rgb = null;

      actualResult = service.interpolate(green, red, 0);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return second color when factor is 1', () => {
      const green: Rgb = { r: 0, g: 255, b: 0 },
            red: Rgb = { r: 255, g: 0, b: 0 },
            expectedResult = red;
      let actualResult: Rgb = null;

      actualResult = service.interpolate(green, red, 1);

      expect(actualResult).toEqual(expectedResult);
    });

    it('should return interpolated color when factor is between 0 and 1', () => {
      const green: Rgb = { r: 0, g: 255, b: 0 },
        red: Rgb = { r: 255, g: 0, b: 0 };
      let actualResult: Rgb = null;

      actualResult = service.interpolate(green, red, 0.5);

      expect(actualResult).not.toEqual(green);
      expect(actualResult).not.toEqual(red);
    });
  });


});
