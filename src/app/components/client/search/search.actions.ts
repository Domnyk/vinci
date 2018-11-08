import { SearchParams } from '../../../models/search-params';

export class Search {
  static readonly type = 'Search for arenas';

  constructor(public params: SearchParams) { }
}
