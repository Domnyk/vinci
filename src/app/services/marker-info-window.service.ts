import { Injectable } from '@angular/core';
import { SportObject } from '../models/sport-object';

@Injectable({
  providedIn: 'root'
})
export class MarkerInfoWindowService {
  constructor() {}

  generateInfoWindowContent(sportObject: SportObject): string {
    const { id, name } = sportObject;

    return  `<div>` +
            `<p class="lead">${name}</p>` +
            `<p>Dostępne dyscypliny sportowe:</p>` +
            `<ul><li>Piłka nożna</li><li>Piłka halowa</li></ul>` +
            `<a href="/sport_objects/${id}">Przejdź do strony obiektu</a>` +
            `</div>`;
  }
}
