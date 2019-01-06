import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NGXS_PLUGINS, NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';


import { routes } from './routes';

import { CurrentUserState } from './state/user.state';

import { AppComponent } from './app.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MapComponent } from './components/client/map/map.component';
import { SportObjectComponent } from './components/owner/object/show/sport-object.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ComplexOwnerDashboardComponent } from './components/owner/complex-owner-dashboard/complex-owner-dashboard.component';
import { NewSportComplexComponent } from './components/owner/complex/new/new-sport-complex.component';
import { AdminDashboardSidebarComponent } from './components/owner/admin-dashboard-sidebar/admin-dashboard-sidebar.component';
import { SportComplexState } from './state/sport-complex.state';
import { NewSportObjectComponent } from './components/owner/object/new/new-sport-object.component';
import { ModalComponent } from './components/common/modal/modal.component';
import { SportComplexDashboardComponent } from './components/owner/complex/show/sport-complex-dashboard.component';
import { SportObjectState } from './state/sport-object.state';
import { NewSportArenaComponent } from './components/owner/arena/new/new-sport-arena.component';
import { SportDisciplineState } from './state/sport-discipline.state';
import { FlashMessageComponent } from './components/flash-message/flash-message.component';
import { FlashMessageState } from './state/flash-message.state';
import { WelcomeToDashboardComponent } from './welcome-to-dashboard/welcome-to-dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeleteSportComplexComponent } from './components/owner/complex/delete/delete-sport-complex.component';
import { SportArenaComponent } from './components/owner/arena/show/sport-arena.component';
import { EditSportComplexComponent } from './components/owner/complex/edit/edit-sport-complex.component';
import { DeleteSportObjectComponent } from './components/owner/object/delete/delete-sport-object.component';
import { EditSportObjectComponent } from './components/owner/object/edit/edit-sport-object.component';
import { SportArenaState } from './state/sport-arena.state';
import { DeleteSportArenaComponent } from './components/owner/arena/delete/delete-sport-arena.component';
import { EditSportArenaComponent } from './components/owner/arena/edit/edit-sport-arena.component';
import {
  CalendarDateFormatter,
  CalendarModule,
  DateAdapter,
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './components/owner/calendar/calendar.component';

import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { EventState } from './state/event.state';
import { ObjectComponent } from './components/client/object/show/object.component';
import { NgxsRouterPluginModule, RouterStateSerializer } from '@ngxs/router-plugin';
import { CustomRouterStateSerializer } from './state/custom-router-state-serializer';
import { ListArenasComponent } from './components/client/arena/list/list-arenas.component';
import { CustomDateFormatter } from './custom-date-formatter';
import { SearchComponent } from './components/client/search/search.component';
import { SelectDisciplinesComponent } from './components/common/select-disciplines/select-disciplines.component';
import { SearchState } from './state/search.state';
import { SearchResultsComponent } from './components/client/search-results/search-results.component';
import { CalendarComponent as CalendarComponentClient } from './components/client/calendar/calendar.component';
import { AddEventFormComponent } from './components/client/event/add/add-event-form.component';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { initStateFromStorage } from './plugins/init-state-from-storage.plugin';
import { ArenaComponent } from './components/client/arena/show/arena.component';
import { ShowEventComponent } from './components/client/event/show/show-event.component';
import { FormFieldComponent } from './components/common/form-field/form-field.component';
import { FormRowComponent } from './components/common/form-row/form-row.component';
import { FormSubmitButtonComponent } from './components/common/form-submit-button/form-submit-button.component';
import { UnauthorizedComponent } from './components/errors/unauthorized/unauthorized.component';
import { ProfileComponent } from './components/client/profile/profile.component';
import { FormCheckboxComponent } from './components/common/form-checkbox/form-checkbox.component';
import { PaymentComponent } from './components/client/payment/payment.component';
import { EventActionComponent } from './components/client/event/event-action/event-action.component';

registerLocaleData(localePl);



@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    WelcomeComponent,
    NotFoundComponent,
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
    SportArenaComponent,
    EditSportComplexComponent,
    DeleteSportObjectComponent,
    EditSportObjectComponent,
    DeleteSportArenaComponent,
    EditSportArenaComponent,
    CalendarComponent,
    ObjectComponent,
    ListArenasComponent,
    SearchComponent,
    SelectDisciplinesComponent,
    SearchResultsComponent,
    CalendarComponentClient,
    AddEventFormComponent,
    ArenaComponent,
    ShowEventComponent,
    FormFieldComponent,
    FormRowComponent,
    FormSubmitButtonComponent,
    UnauthorizedComponent,
    ProfileComponent,
    FormCheckboxComponent,
    PaymentComponent,
    EventActionComponent,
  ],
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: false }
    ),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([
      CurrentUserState,
      SportComplexState,
      SportObjectState,
      SportDisciplineState,
      FlashMessageState,
      SportArenaState,
      EventState,
      SearchState,
    ]),
    NgxsStoragePluginModule.forRoot({ key: 'currentUser' }),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    FontAwesomeModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }, {
      dateFormatter: {
        provide: CalendarDateFormatter,
        useClass: CustomDateFormatter
      }
    })
  ],
  providers: [
    { provide: NGXS_PLUGINS, useValue: initStateFromStorage, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
