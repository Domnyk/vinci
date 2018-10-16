import { _ } from 'underscore';
import { Coords, SportObject } from '../models/sport-object';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { CreateNewSportObject } from '../components/components.complex-owner-dashboard/new-sport-object/new-sport-object.actions';
import { GeocoderService } from '../services/geocoder.service';
import { flatMap } from 'rxjs/operators';
import { tap } from 'rxjs/internal/operators';
import { EntityService } from '../services/entity.service';
import { FetchSportObjectsInSportComplex } from '../components/components.complex-owner-dashboard/sport-complex-dashboard/sport-complex-dashboard.actions';
import { environment } from '../../environments/environment.generated.dev';
import { HttpClient } from '@angular/common/http';
import { ShowFlashMessage } from '../actions/flash-message.actions';


type SportObjects = Array<SportObject>;

@State<SportObjects>({
  name: 'SportObjects',
  defaults: []
})

export class SportObjectState {

  constructor(
    private geoCoder: GeocoderService,
    private entityServiceForSportObject: EntityService<SportObject>,
    private http: HttpClient,
    private store: Store
  ) { }

  @Selector()
  static sportObject(state: SportObjects) {
    return (id: number) => {
      return state.filter(sportObject => sportObject.id === +id);
    };
  }

  @Selector()
  static sportObjectsInSportComplex(state: SportObjects) {
    return (sportComplexId: number) => {
      return state.filter(sportObject => sportObject.sport_complex_id === +sportComplexId);
    };
  }

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
          return this.entityServiceForSportObject.create(sportObject, 'sport_objects');
        }),
        tap(stateUpdater)
      );
  }

  @Action(FetchSportObjectsInSportComplex)
  fetchSportObjectNames({ getState, setState }: StateContext<SportObjects>, { sportComplexId }: FetchSportObjectsInSportComplex) {
    const url = environment.api.resource('sport_complexes', sportComplexId, 'sport_objects'),
      stateUpdater = (receivedData) => {
        if (receivedData.status === 'error') {
          this.store.dispatch(new ShowFlashMessage('Wystąpił błąd w czasie pobierania listy ośrodków sportowych'));
          return;
        }

        const sportObjects = receivedData.data.sport_objects,
              newState = _.uniq([...getState(), ...sportObjects], true, (sportObject) => sportObject.id);
        setState(newState);
      };

    return this.http.get(url).pipe(tap(stateUpdater));
  }
}
