import { RouterStateSerializer } from '@ngxs/router-plugin';
import { Params, RouterStateSnapshot } from '@angular/router';

export interface RouterStateParams {
  url: string;
  params: Params;
  queryParams: Params;
}

export class CustomRouterStateSerializer implements RouterStateSerializer<RouterStateParams> {
  serialize(routerState: RouterStateSnapshot): RouterStateParams {
    const { url, root: { queryParams } } = routerState;

    let { root: route } = routerState;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const { params } = route;

    return { url, params, queryParams };
  }
}
