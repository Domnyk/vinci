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
import { AdminDashboardComponent } from './components/components.admin-dashboard/admin-dashboard/admin-dashboard.component';
import { NewSportComplexComponent } from './components/new-sport-complex/new-sport-complex.component';
import { AdminDashboardSidebarComponent } from './components/components.admin-dashboard/admin-dashboard-sidebar/admin-dashboard-sidebar.component';
import { SportComplexState } from './state/sport-complex.state';
import { NewSportObjectComponent } from './components/new-sport-object/new-sport-object.component';
import { ModalComponent } from './components/components.common/modal/modal.component';
import { SportComplexDashboardComponent } from './components/components.admin-dashboard/sport-complex-dashboard/sport-complex-dashboard.component';
import { SportObjectState } from './state/sport-object.state';


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
    AdminDashboardSidebarComponent,
    NewSportObjectComponent,
    ModalComponent,
    SportComplexDashboardComponent,
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
      CurrentUserState,
      SportComplexState,
      SportObjectState,
    ]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
