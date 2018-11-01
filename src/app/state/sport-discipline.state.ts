
import { Action, State, StateContext, Store } from '@ngxs/store';
import { EntityService } from '../services/entity.service';
import { FetchSportDisciplines } from '../components/owner/complex-owner-dashboard/complex-owner-dasboard.actions';
import { tap } from 'rxjs/operators';
import { SportDiscipline } from '../models/sport-discipline';
import { environment } from '../../environments/environment.generated.dev';
import { HttpClient } from '@angular/common/http';
import { ErrorResponse, Response } from '../models/api-response';
import { ShowFlashMessage } from '../actions/flash-message.actions';

type SportDisciplines = Array<SportDiscipline>;

@State<SportDisciplines>({
  name: 'sportDisciplines',
  defaults: []
})

export class SportDisciplineState {
  static readonly resourceName: string = 'sport_disciplines';

  constructor(
    private sportDisciplineService: EntityService<SportDiscipline>,
    private http: HttpClient,
    private store: Store
  ) { }

  @Action(FetchSportDisciplines)
  fetchAllSportDisciplines({ setState }: StateContext<SportDisciplines>) {type StateUpdaterType = (SportComplexes) => void;
    const url = environment.api.resource(SportDisciplineState.resourceName),
          stateUpdater: StateUpdaterType = (response: Response) => {
            setState([...response.data.sport_disciplines]);
          };

    return this.http.get(url)
      .pipe(tap(stateUpdater))
      .subscribe(() => {}, (error) => this.handleError(error));
  }

  private handleError(errorResponse: ErrorResponse) {
    console.debug('Error response: ', errorResponse);
    this.store.dispatch(new ShowFlashMessage('Wystąpił błąd'));
  }

}
