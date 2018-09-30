import { Routes } from '@angular/router';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';
import { MapComponent } from './components/components.maps/map/map.component';
import { SportObjectComponent } from './components/sport-object/sport-object.component';
import { AdminDashboardComponent } from './components/components.admin-dashboard/admin-dashboard/admin-dashboard.component';
import { AdminAuthorizationGuard } from './guards/admin-authorization.guard';
import { NewSportComplexComponent } from './components/new-sport-complex/new-sport-complex.component';
import { SportComplexDashboardComponent } from './components/components.admin-dashboard/sport-complex-dashboard/sport-complex-dashboard.component';
import {NewSportObjectComponent} from './components/new-sport-object/new-sport-object.component';

export const routes: Routes = [
  { path: 'sign_up', component: SignUpComponent },
  { path: 'sign_in', component: SignInComponent },
  { path: 'map', component: MapComponent },
  { path: 'sport_object/:id', component: SportObjectComponent },
  { path: 'admin_dashboard', component: AdminDashboardComponent, canActivate: [AdminAuthorizationGuard],
    children: [
      { path: 'new_sport_complex', component: NewSportComplexComponent },
      { path: 'sport_complex_dashboard/:id', component: SportComplexDashboardComponent },
      { path: 'sport_complex_dashboard/:id/new_sport_object', component: NewSportObjectComponent }
    ]
  },
  { path: '', component: WelcomeComponent },
  { path: '**', component: ErrorNotFoundComponent },
];
