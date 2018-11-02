import { Injectable } from '@angular/core';
import { SportObject } from '../models/sport-object';

@Injectable({
  providedIn: 'root'
})
export class MarkerInfoWindowService {
  constructor() {}

  generateInfoWindowContent(sportObject: SportObject): string {
    const { id, name } = sportObject;

    return  `<div #infoWindowContainer>` +
            `<p class="lead">${name}</p>` +
            `<p>Dostępne dyscypliny sportowe:</p>` +
            `<ul><li>Piłka nożna</li><li>Piłka halowa</li></ul>` +
            `<button type="button" class="btn btn-outline-info btn-sm" id="sport-object-info-window-${id}">Przejdź do strony obiektu</button>` +
            `</div>`;
  }
}
