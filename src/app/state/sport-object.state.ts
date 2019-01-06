import { _ } from 'underscore';
import { SportObject } from '../models/sport-object';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { CreateNewSportObject } from '../components/owner/object/new/new-sport-object.actions';
import { GeocoderService } from '../services/geocoder.service';
import { flatMap } from 'rxjs/operators';
import { catchError, map, tap } from 'rxjs/internal/operators';
import { FetchSportObjectsInSportComplex } from '../components/owner/complex/show/sport-complex-dashboard.actions';
import { environment } from '../../environments/environment.generated.dev';
import { HttpClient } from '@angular/common/http';
import { ShowFlashMessageOnError, ShowFlashMessageOnSuccess } from '../actions/flash-message.actions';
import { DeleteSportObject } from '../components/owner/object/delete/delete-sport-object.actions';
import { EMPTY, empty, Observable, of, throwError } from 'rxjs';
import { UpdateSportObject } from '../components/owner/object/edit/edit-sport-object.actions';
import { ErrorResponse, Response } from '../models/api-response';
import { FetchAllObjects } from '../components/client/map/map.actions';
import { InsertArenas } from '../actions/sport-arena.actions';
import { BuildingAddressUtils } from '../services/building-address-utils.service';
import { ERROR } from '../models/error';
import LatLngLiteral = google.maps.LatLngLiteral;


type SportObjects = Array<SportObject>;

@State<SportObjects>({
  name: 'SportObjects',
  defaults: []
})

export class SportObjectState {
  static readonly resourceName = 'sport_objects';
  static readonly parentResourceName = 'complexes';


  constructor(
    private geoCoder: GeocoderService,
    private http: HttpClient,
    private store: Store
  ) { }

  @Selector()
  static getById(state: SportObjects) {
    return (id: number) => {
      return state.filter(sportObject => sportObject.id === +id)[0];
    };
  }

  @Selector()
  static getByIds(state: SportObjects) {
    return (ids: number[]) => {

      const objects = state.filter(sportObject => ids.some(id => +id === sportObject.id));
      console.log('Objects from state selector: ', objects);
      return objects;
    };
  }

  @Selector()
  static sportObjectsInSportComplex(state: SportObjects) {
    return (sportComplexId: number) => {
      return state.filter(sportObject => sportObject.complexId === +sportComplexId);
    };
  }


  @Action(FetchAllObjects)
  fetchAllObjects({ getState, setState }: StateContext<SportObjects>, { }: FetchAllObjects ) {
    const url: string = environment.api.resource(SportObjectState.resourceName),
          stateUpdater = (response: Response) => {
            const sportObjectsData = response.data.sport_objects,
                  sportObjects = sportObjectsData.map((sportObjectData: any) => SportObject.fromDTO(sportObjectData)),
                  newState = _.uniq([...getState(), ...sportObjects], true, (sportObject) => sportObject.id);

            sportObjectsData.map(sport_object => this.store.dispatch(new InsertArenas(sport_object.sport_arenas)));
            setState(newState);
          };

    return this.http.get(url)
      .pipe(
        tap(console.log),
        tap((response: Response) => this.maybeLogError(response, 'Wystąpił błąd w czasie pobierania listy obiektów sportowych ')),
        tap(stateUpdater)
      );
  }

  @Action(CreateNewSportObject)
  createNewSportObject({ getState, setState }: StateContext<SportObjects>, { sportObject }: CreateNewSportObject ) {
    const url = environment.api.resource(SportObjectState.parentResourceName, sportObject.complexId, SportObjectState.resourceName),
          stateUpdater = (response: Response) => {
            if (response.status === 'error') {
              this.store.dispatch(new ShowFlashMessageOnSuccess('Wystąpił błąd w czasie tworzenia obiektu sportowego'));
              return;
            }

            const sportObjectFromResponse: SportObject = SportObject.fromDTO(response.data.sport_object),
                  newState = [...getState().concat(sportObjectFromResponse)];
            setState(newState);
            this.store.dispatch(new ShowFlashMessageOnSuccess('Obiekt sportowy został pomyślnie zaktualizowany'));
          };

    return this.geoCoder.geocode(BuildingAddressUtils.asString(sportObject.address)).pipe(
        flatMap((coords: LatLngLiteral) => {
          sportObject.geoCoordinates = coords;
          return this.http.post(url, sportObject.dto(), { withCredentials: true });
        }),
        tap(stateUpdater),
        catchError((error: ERROR) => this.handleError2(error))
      );
  }

  @Action(UpdateSportObject)
  updateSportObject({ getState, setState }: StateContext<SportObjects>, { sportObjectToUpdate }: UpdateSportObject) {
    const url = environment.api.resource(SportObjectState.resourceName, sportObjectToUpdate.id),
          oldSportObject: SportObject = getState().filter((sportObject: SportObject) => sportObject.id === sportObjectToUpdate.id)[0],
          stateUpdater = (response) => {
            if (response.status === 'error') {
              this.store.dispatch(new ShowFlashMessageOnSuccess('Wystąpił błąd w czasie aktualizacja danych obiektu sportowego'));
              return;
            }

            const updatedSportObject = SportObject.fromDTO(response.data.sport_object),
                  newState = getState().map(sportObject => sportObject.id === sportObjectToUpdate.id ? updatedSportObject : sportObject);


            setState(newState);
            this.store.dispatch(new ShowFlashMessageOnSuccess('Obiekt sportowy został pomyślnie zaktualizowany'));
          };
    let call: Observable<any> = null;

    if (BuildingAddressUtils.areEqual(oldSportObject.address, sportObjectToUpdate.address)) {
      console.debug('Not calling geocoder');
      call = this.http.put(url, sportObjectToUpdate.dto())
        .pipe(tap(stateUpdater));
    } else {
      console.debug('Calling geocoder');
      call = this.geoCoder.geocode(BuildingAddressUtils.asString(sportObjectToUpdate.address))
        .pipe(
          flatMap((coords: LatLngLiteral) => {
            sportObjectToUpdate.geoCoordinates = coords;
            return this.http.put(url, sportObjectToUpdate.dto());
          }),
          tap(stateUpdater)
        );
    }

    return call.subscribe(() => {}, (error) => this.handleError(error));
  }

  @Action(FetchSportObjectsInSportComplex)
  fetchSportObjectNames({ getState, setState }: StateContext<SportObjects>, { sportComplexId }: FetchSportObjectsInSportComplex) {
    const url = environment.api.resource(SportObjectState.parentResourceName, sportComplexId, SportObjectState.resourceName),
      stateUpdater = (receivedData) => {
        if (receivedData.status === 'error') {
          this.store.dispatch(new ShowFlashMessageOnSuccess('Wystąpił błąd w czasie pobierania listy ośrodków sportowych'));
          return;
        }

        const sportObjectsData = receivedData.data.sport_objects,
              sportObjects = sportObjectsData.map((sportObjectData: any) => SportObject.fromDTO(sportObjectData)),
              newState = _.uniq([...getState(), ...sportObjects], true, (sportObject) => sportObject.id);
        setState(newState);
      };

    return this.http.get(url).pipe(tap(stateUpdater));
  }

  @Action(DeleteSportObject)
  deleteSportObject({ getState, setState }: StateContext<SportObjects>, { id }: DeleteSportObject) {
    const url = environment.api.resource(SportObjectState.resourceName, id),
      successDeletionHandler = () => {
        const updatedSportComplexList: SportObjects = getState().filter((sportObject: SportObject) => sportObject.id !== id);
        setState(
          [...updatedSportComplexList]
        );
      },
      failureDeletionHandler = (error: any) => {
        return throwError('Sport object still has sport arena');
      };

    return this.http.delete(url)
      .pipe(
        map(successDeletionHandler),
        catchError(failureDeletionHandler),
      );
  }

  /**
   * @Deprecated
   * @param errorResponse
   */
  private handleError(errorResponse: ErrorResponse) {
    console.error('Error response: ', errorResponse);
    this.store.dispatch(new ShowFlashMessageOnError('Wystąpił błąd'));
  }

  private handleError2(error: ERROR): Observable<never> {
    let msg: string = null;

    switch (error) {
      case ERROR.NO_SUCH_ADDRESS:
        msg = 'Nie ma takieg adresu. Podaj poprawny adres i spróbuj ponownie';
        break;
      default:
        msg = 'Wystąpił błąd. Spróbuj ponownie później';
    }

    this.store.dispatch(new ShowFlashMessageOnError(msg));
    return EMPTY;
  }

  private maybeLogError(response: Response | ErrorResponse, msg: string) {
    if (response.status === 'error') {
      console.debug('Error response: ', response);
      this.store.dispatch(new ShowFlashMessageOnSuccess(msg));
    }
  }
}
