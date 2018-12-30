import { Injectable } from '@angular/core';
import { Hsl, Rgb } from '../models/colors';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  static getRgbString({ r, g, b }: Rgb): string {
    return `rgb(${r}, ${g}, ${b})`;
  }

  constructor() { }

  public interpolate(colorA: Rgb, colorB: Rgb, x: number): Rgb {
    const colorAHsl = ColorService.rgbToHsl(colorA),
          colorBHsl = ColorService.rgbToHsl(colorB);

    colorAHsl.h += x * (colorBHsl.h - colorAHsl.h);
    colorAHsl.s += x * (colorBHsl.s - colorAHsl.s);
    colorAHsl.l += x * (colorBHsl.l - colorAHsl.l);

    return ColorService.hslToRgb(colorAHsl);
  }

  private static rgbToHsl({ r, g, b }: Rgb): Hsl {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b),
          min = Math.min(r, g, b),
          l = (max + min) / 2;

    let h: number = null,
        s: number = null;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;

      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }

    return { h, s, l };
  }

  private static hslToRgb({ h, s, l }: Hsl): Rgb {
    let r: number = null,
        g: number = null,
        b: number = null;

    if ( s === 0 ) {
      r = g = b = l;
    } else {
      const hueToRgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s,
            p = 2 * l - q;

      r = hueToRgb(p, q, h + 1 / 3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1 / 3);
    }

    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  }
}

