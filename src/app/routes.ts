import { Routes } from '@angular/router';

import { SignUpComponent } from './components/sign-up/sign-up.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';

export const routes: Routes = [
  { path: 'sign_up', component: SignUpComponent },
  { path: '', component: WelcomeComponent },
  { path: '**', component: ErrorNotFoundComponent },
];