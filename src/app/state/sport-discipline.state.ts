
import { Action, State, StateContext } from '@ngxs/store';
import { EntityService } from '../services/entity.service';
import { FetchSportDisciplines } from '../components/components.admin-dashboard/new-sport-arena/new-sport-arena.actions';
import { tap } from 'rxjs/operators';

type SportDisciplines = Array<SportDiscipline>;

@State<SportDisciplines>({
  name: 'sportDisciplines',
  defaults: []
})

export class SportDisciplineState {

  constructor(
    private sportDisciplineService: EntityService<SportDiscipline>
  ) { }

  @Action(FetchSportDisciplines)
  fetchAllSportDisciplines({ setState }: StateContext<SportDisciplines>) {type StateUpdaterType = (SportComplexes) => void;
    const stateUpdater: StateUpdaterType = (sportDisciplines) => {
      setState([...sportDisciplines.sport_disciplines]);
    };

    return this.sportDisciplineService.fetchAll('sport_disciplines')
      .pipe(
        tap(stateUpdater)
      );
  }

}
