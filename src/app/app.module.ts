import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';


import { routes } from './routes';

import { CurrentUserState } from './state/user.state';

import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MapComponent } from './components/components.maps/map/map.component';
import { SportObjectComponent } from './components/sport-object/sport-object.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NewSportComplexComponent } from './components/new-sport-complex/new-sport-complex.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    WelcomeComponent,
    ErrorNotFoundComponent,
    SignInComponent,
    MapComponent,
    SportObjectComponent,
    NavbarComponent,
    AdminDashboardComponent,
    NewSportComplexComponent,
  ],
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: false }
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxsModule.forRoot([
      CurrentUserState
    ]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
