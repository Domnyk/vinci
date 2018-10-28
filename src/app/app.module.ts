import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SportObjectComponent } from './components/owner/object/show/sport-object.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ComplexOwnerDashboardComponent } from './components/owner/complex-owner-dashboard/complex-owner-dashboard.component';
import { NewSportComplexComponent } from './components/owner/complex/new/new-sport-complex.component';
import { AdminDashboardSidebarComponent } from './components/owner/admin-dashboard-sidebar/admin-dashboard-sidebar.component';
import { SportComplexState } from './state/sport-complex.state';
import { NewSportObjectComponent } from './components/owner/object/new/new-sport-object.component';
import { ModalComponent } from './components/components.common/modal/modal.component';
import { SportComplexDashboardComponent } from './components/owner/complex/show/sport-complex-dashboard.component';
import { SportObjectState } from './state/sport-object.state';
import { NewSportArenaComponent } from './components/owner/new-sport-arena/new-sport-arena.component';
import { SportDisciplineState } from './state/sport-discipline.state';
import { FlashMessageComponent } from './components/flash-message/flash-message.component';
import { FlashMessageState } from './state/flash-message.state';
import { WelcomeToDashboardComponent } from './welcome-to-dashboard/welcome-to-dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeleteSportComplexComponent } from './components/owner/complex/delete/delete-sport-complex.component';
import { SidebarListElemComponent } from './components/owner/sidebar-list-elem/sidebar-list-elem.component';
import { SportArenaComponent } from './components/owner/sport-arena/sport-arena.component';
import { EditSportComplexComponent } from './components/owner/complex/edit/edit-sport-complex.component';
import { DeleteSportObjectComponent } from './components/owner/object/delete/delete-sport-object.component';
import { EditSportObjectComponent } from './components/owner/object/edit/edit-sport-object.component';

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
    ComplexOwnerDashboardComponent,
    NewSportComplexComponent,
    AdminDashboardSidebarComponent,
    NewSportObjectComponent,
    ModalComponent,
    SportComplexDashboardComponent,
    NewSportArenaComponent,
    FlashMessageComponent,
    WelcomeToDashboardComponent,
    DeleteSportComplexComponent,
    SidebarListElemComponent,
    SportArenaComponent,
    EditSportComplexComponent,
    DeleteSportObjectComponent,
    EditSportObjectComponent
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
      SportDisciplineState,
      FlashMessageState,
    ]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
