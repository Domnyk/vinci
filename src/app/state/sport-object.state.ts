import { Coords, SportObject } from '../models/sport-object';
import { Action, State, StateContext } from '@ngxs/store';
import { CreateNewSportObject } from '../components/new-sport-object/new-sport-object.actions';
import { GeocoderService } from '../services/geocoder.service';
import { flatMap } from 'rxjs/operators';
import { SportObjectService } from '../services/sport-object.service';
import { tap } from 'rxjs/internal/operators';

type SportObjects = Array<SportObject>;

@State<SportObjects>({
  name: 'SportObjects',
  defaults: []
})

export class SportObjectState {

  constructor(
    private geoCoder: GeocoderService,
    private sportObjectService: SportObjectService
  ) { }

  @Action(CreateNewSportObject)
  createNewSportObject({ getState, setState }: StateContext<SportObjects>, { sportObject }: CreateNewSportObject ){
    const stateUpdater = (newSportObject: SportObject) => {
      setState(
        [...getState().concat(newSportObject)]
      );
    };

    return this.geoCoder.geocode(sportObject.address)
      .pipe(
        flatMap((coords: Coords) => {
          sportObject.geoCoordinates = coords;
          return this.sportObjectService.create(sportObject);
        }),
        tap(stateUpdater)
      );
  }
}
