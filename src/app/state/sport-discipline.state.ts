
import { Action, State, StateContext, Store } from '@ngxs/store';
import { FetchSportDisciplines } from '../components/owner/complex-owner-dashboard/complex-owner-dasboard.actions';
import { catchError, tap } from 'rxjs/operators';
import { SportDiscipline } from '../models/sport-discipline';
import { environment } from '../../environments/environment.generated.dev';
import { HttpClient } from '@angular/common/http';
import { ErrorResponse, Response } from '../models/api-response';
import { ShowFlashMessageOnSuccessfulOperation } from '../actions/flash-message.actions';
import { handleError } from './error-handler';

type SportDisciplines = Array<SportDiscipline>;

@State<SportDisciplines>({
  name: 'sportDisciplines',
  defaults: []
})

export class SportDisciplineState {
  static readonly resourceName: string = 'sport_disciplines';

  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  @Action(FetchSportDisciplines)
  fetchAllSportDisciplines({ setState }: StateContext<SportDisciplines>) {type StateUpdaterType = (SportComplexes) => void;
    const url = environment.api.resource(SportDisciplineState.resourceName),
          stateUpdater: StateUpdaterType = (response: Response) => {
            setState([...response.data.sport_disciplines]);
          };

    return this.http.get(url, { withCredentials: true }).pipe(
      tap(stateUpdater),
      catchError(error => handleError(error, this.store))
    );
  }
}
