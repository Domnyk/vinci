import { Injectable } from '@angular/core';
import { SportObject } from '../models/sport-object';

@Injectable({
  providedIn: 'root'
})
export class MarkerInfoWindowService {
  constructor() {}

  generateInfoWindowContent(sportObject: SportObject, disciplines: string[]): string {
    const { id, name } = sportObject,
          disciplinesStr: string = disciplines.reduce((prev: string, curr: string) => {
            return prev + '<li>' + curr + '</li>';
          }, '<ul>') + '</ul>';

    return  `<div #infoWindowContainer>` +
            `<p class="lead">${name}</p>` +
            `<p>Dostępne dyscypliny sportowe:</p>` +
            disciplinesStr +
            `<button type="button" class="btn btn-outline-info btn-sm" id="sport-object-info-window-${id}">Przejdź do strony obiektu</button>` +
            `</div>`;
  }
}
