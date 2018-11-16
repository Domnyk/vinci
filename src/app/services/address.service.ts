import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor() { }

  static replaceReservedCharacters(field: string): string {
    return field
      .split('')
      .map(this.replaceSpace)
      .join('');
  }

  private static replaceSpace(character: string): string {
    if (character === ' ') {
      return '+';
    }
    return character;
  }
}
