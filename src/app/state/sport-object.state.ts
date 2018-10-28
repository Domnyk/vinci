import { _ } from 'underscore';
import { Coords, SportObject } from '../models/sport-object';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { CreateNewSportObject } from '../components/owner/new-sport-object/new-sport-object.actions';
import { GeocoderService } from '../services/geocoder.service';
import { flatMap } from 'rxjs/operators';
import { catchError, map, tap } from 'rxjs/internal/operators';
import { EntityService } from '../services/entity.service';
import { FetchSportObjectsInSportComplex } from '../components/owner/complex/show/sport-complex-dashboard.actions';
import { environment } from '../../environments/environment.generated.dev';
import { HttpClient } from '@angular/common/http';
import { ShowFlashMessage } from '../actions/flash-message.actions';
import { DeleteSportObject } from '../components/owner/object/delete/delete-sport-object.actions';
import { throwError } from 'rxjs/index';
import { UpdateSportObject } from '../components/owner/object/edit/edit-sport-object.actions';


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
  createNewSportObject({ getState, setState }: StateContext<SportObjects>, { sportObject }: CreateNewSportObject ) {
    const url = environment.api.resource('sport_complexes', sportObject.sport_complex_id, 'sport_objects'),
          stateUpdater = (newSportObject) => {
            setState(
              [...getState().concat(newSportObject.data.sport_object)]
            );
          };

    console.debug(sportObject);
    console.debug(url);

    return this.geoCoder.geocode(sportObject.address)
      .pipe(
        flatMap((coords: Coords) => {
          sportObject.geoCoordinates = coords;
          return this.http.post(url, sportObject.dto());
        }),
        tap(stateUpdater)
      );
  }

  @Action(UpdateSportObject)
  updateSportObject({ getState, setState }: StateContext<SportObjects>, { sportObjectToUpdate }: UpdateSportObject) {
    const url = environment.api.resource('sport_objects', sportObjectToUpdate.id),
          stateUpdater = (response) => {
            if (response.status === 'error') {
              this.store.dispatch(new ShowFlashMessage('Wystąpił błąd w czasie aktualizacja danych obiektu sportowego'));
              return;
            }

            const updatedSportObject = response.data.sport_object,
                  newState = getState().map(sportObject => sportObject.id === sportObjectToUpdate.id ? updatedSportObject : sportObject);


            setState(newState);
            this.store.dispatch(new ShowFlashMessage('Obiekt sportowy został pomyślnie zaktualizowany'));
          };

    return this.geoCoder.geocode(sportObjectToUpdate.address)
      .pipe(
        flatMap((coords: Coords) => {
          sportObjectToUpdate.geo_coordinates = coords;
          return this.http.put(url, { data: { sport_object: sportObjectToUpdate } });
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

  @Action(DeleteSportObject)
  deleteSportComplex({ getState, setState }: StateContext<SportObjects>, { id }: DeleteSportObject) {
    const url = environment.api.resource('sport_objects', id),
      successDeletionHandler = () => {
        const updatedSportComplexList: SportObjects = getState().filter((sportObject: SportObject) => sportObject.id !== id);
        setState(
          [...updatedSportComplexList]
        );
      },
      failureDeletionHandler = (error: any) => {
        return throwError('Sport object still has sport arenas');
      };

    return this.http.delete(url)
      .pipe(
        map(successDeletionHandler),
        catchError(failureDeletionHandler),
      );
  }
}
