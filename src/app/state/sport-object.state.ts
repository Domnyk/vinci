import { _ } from 'underscore';
import { Coords, SportObject } from '../models/sport-object';
import { Action, createSelector, Selector, State, StateContext, Store } from '@ngxs/store';
import { CreateNewSportObject } from '../components/owner/object/new/new-sport-object.actions';
import { GeocoderService } from '../services/geocoder.service';
import { flatMap } from 'rxjs/operators';
import { catchError, map, tap } from 'rxjs/internal/operators';
import { EntityService } from '../services/entity.service';
import { FetchSportObjectsInSportComplex } from '../components/owner/complex/show/sport-complex-dashboard.actions';
import { environment } from '../../environments/environment.generated.dev';
import { HttpClient } from '@angular/common/http';
import { ShowFlashMessage } from '../actions/flash-message.actions';
import { DeleteSportObject } from '../components/owner/object/delete/delete-sport-object.actions';
import { Observable, throwError } from 'rxjs';
import { UpdateSportObject } from '../components/owner/object/edit/edit-sport-object.actions';
import { ErrorResponse, Response } from '../models/api-response';
import { BuildingAddress } from '../models/building-address';
import { SelectObject } from '../components/client/object/show/object.actions';
import { FetchAllObjects } from '../components/client/map/map.actions';
import { InsertArenas } from '../actions/sport-arena.actions';


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
      return state.filter(sportObject => sportObject.id === +id)[0];
    };
  }

  @Selector()
  static sportObjectsInSportComplex(state: SportObjects) {
    return (sportComplexId: number) => {
      return state.filter(sportObject => sportObject.sportComplexId === +sportComplexId);
    };
  }

  static sportObject2(id$: Observable<string>) {
    return createSelector([SportObjectState], (state: SportObjects) => {
      id$.subscribe((id: string) => {
        return state.filter((sportObject: SportObject) => sportObject.id === +id)[0];
      });
    });
  }


  @Action(FetchAllObjects)
  fetchAllObjects({ getState, setState }: StateContext<SportObjects>, { }: FetchAllObjects ) {
    const url: string = environment.api.resource('sport_objects'),
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
    const url = environment.api.resource('sport_complexes', sportObject.sportComplexId, 'sport_objects'),
          stateUpdater = (response: Response) => {
            if (response.status === 'error') {
              this.store.dispatch(new ShowFlashMessage('Wystąpił błąd w czasie tworzenia obiektu sportowego'));
              return;
            }

            const sportObjectFromResponse: SportObject = SportObject.fromDTO(response.data.sport_object),
                  newState = [...getState().concat(sportObjectFromResponse)];
            setState(newState);
            this.store.dispatch(new ShowFlashMessage('Obiekt sportowy został pomyślnie zaktualizowany'));
          };

    return this.geoCoder.geocode(sportObject.address)
      .pipe(
        flatMap((coords: Coords) => {
          sportObject.geoCoordinates = coords;
          return this.http.post(url, sportObject.dto());
        }),
        tap(stateUpdater)
      )
      .subscribe(() => {}, (error) => this.handleError(error));
  }

  @Action(UpdateSportObject)
  updateSportObject({ getState, setState }: StateContext<SportObjects>, { sportObjectToUpdate }: UpdateSportObject) {
    const url = environment.api.resource('sport_objects', sportObjectToUpdate.id),
          oldSportObject: SportObject = getState().filter((sportObject: SportObject) => sportObject.id === sportObjectToUpdate.id)[0],
          stateUpdater = (response) => {
            if (response.status === 'error') {
              this.store.dispatch(new ShowFlashMessage('Wystąpił błąd w czasie aktualizacja danych obiektu sportowego'));
              return;
            }

            const updatedSportObject = SportObject.fromDTO(response.data.sport_object),
                  newState = getState().map(sportObject => sportObject.id === sportObjectToUpdate.id ? updatedSportObject : sportObject);


            setState(newState);
            this.store.dispatch(new ShowFlashMessage('Obiekt sportowy został pomyślnie zaktualizowany'));
          };
    let call: Observable<any> = null;

    if (BuildingAddress.equals(oldSportObject.address, sportObjectToUpdate.address)) {
      console.debug('Not calling geocoder');
      call = this.http.put(url, sportObjectToUpdate.dto())
        .pipe(tap(stateUpdater));
    } else {
      console.debug('Calling geocoder');
      call = this.geoCoder.geocode(sportObjectToUpdate.address)
        .pipe(
          flatMap((coords: Coords) => {
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
    const url = environment.api.resource('sport_complexes', sportComplexId, 'sport_objects'),
      stateUpdater = (receivedData) => {
        if (receivedData.status === 'error') {
          this.store.dispatch(new ShowFlashMessage('Wystąpił błąd w czasie pobierania listy ośrodków sportowych'));
          return;
        }

        const sportObjectsData = receivedData.data.sport_objects,
              sportObjects = sportObjectsData.map((sportObjectData: any) => SportObject.fromDTO(sportObjectData)),
              newState = _.uniq([...getState(), ...sportObjects], true, (sportObject) => sportObject.id);
        setState(newState);
      };

    return this.http.get(url).pipe(tap(stateUpdater));
  }

  // @Action(SelectObject)
  // selectObject({ getState, setState }: StateContext<SportObjects>, { id }: SelectObject) {
  //   const url = environment.api.resource('sport_objects', id),
  //         isObjectAlreadyInState = getState().find((sportObject: SportObject) => sportObject.id === id) !== undefined,
  //         stateUpdater = (resposnse: Response) => {
  //           if (resposnse.status === 'error') {
  //             this.store.dispatch(new ShowFlashMessage('Wystąpił błąd w czasie pobierania danych obiektu sportowego'));
  //             return;
  //           }
  //
  //           const sportObject = SportObject.fromDTO(resposnse.data.sport_object);
  //           let newState = null;
  //           if (isObjectAlreadyInState) {
  //             newState = getState().map((sportObject: SportObject) => sportObject.id === id ? )
  //
  //               _.uniq([...getState(), sportObject]);
  //           } else {
  //             newState = ([...getState(), sportObject]);
  //           }
  //
  //           setState(newState);
  //         };
  //
  //   return this.http.get(url)
  //     .pipe(tap(stateUpdater))
  //     .subscribe(() => {}, (error) => this.handleError(error));
  // }

  @Action(DeleteSportObject)
  deleteSportObject({ getState, setState }: StateContext<SportObjects>, { id }: DeleteSportObject) {
    const url = environment.api.resource('sport_objects', id),
      successDeletionHandler = () => {
        const updatedSportComplexList: SportObjects = getState().filter((sportObject: SportObject) => sportObject.id !== id);
        setState(
          [...updatedSportComplexList]
        );
      },
      failureDeletionHandler = (error: any) => {
        return throwError('Sport show still has sport arena');
      };

    return this.http.delete(url)
      .pipe(
        map(successDeletionHandler),
        catchError(failureDeletionHandler),
      );
  }

  private handleError(errorResponse: ErrorResponse) {
    console.debug('Error response: ', errorResponse);
    this.store.dispatch(new ShowFlashMessage('Wystąpił błąd'));
  }

  private maybeLogError(response: Response | ErrorResponse, msg: string) {
    if (response.status === 'error') {
      console.debug('Error response: ', response);
      this.store.dispatch(new ShowFlashMessage(msg));
    }
  }
}
