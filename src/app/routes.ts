import { Routes } from '@angular/router';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';
import { MapComponent } from './components/components.maps/map/map.component';
import { SportObjectComponent } from './components/owner/object/show/sport-object.component';
import { ComplexOwnerDashboardComponent } from './components/owner/complex-owner-dashboard/complex-owner-dashboard.component';
import { AdminAuthorizationGuard } from './guards/admin-authorization.guard';
import { NewSportComplexComponent } from './components/owner/complex/new/new-sport-complex.component';
import { SportComplexDashboardComponent } from './components/owner/complex/show/sport-complex-dashboard.component';
import {NewSportObjectComponent} from './components/owner/object/new/new-sport-object.component';
import {NewSportArenaComponent} from './components/owner/new-sport-arena/new-sport-arena.component';
import { WelcomeToDashboardComponent } from './welcome-to-dashboard/welcome-to-dashboard.component';

export const routes: Routes = [
  { path: 'sign_up', component: SignUpComponent },
  { path: 'sign_in', component: SignInComponent },
  { path: 'map', component: MapComponent },
  { path: 'sport_object/:id', component: SportObjectComponent },
  { path: 'owner', component: ComplexOwnerDashboardComponent, canActivate: [AdminAuthorizationGuard],
    children: [
      { path: '', component: WelcomeToDashboardComponent },
      { path: 'new_sport_complex', component: NewSportComplexComponent },
      { path: 'new_sport_arena', component: NewSportArenaComponent },
      { path: 'complex/:id', component: SportComplexDashboardComponent },
      { path: 'object/:id', component: SportObjectComponent },
      { path: 'sport_complex_dashboard/:id/new_sport_object', component: NewSportObjectComponent }
    ]
  },
  { path: '', component: WelcomeComponent },
  { path: '**', component: ErrorNotFoundComponent },
];
