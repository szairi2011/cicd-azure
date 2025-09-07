import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { AuthModule } from './pages/auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './pages/user/user.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { MatCardModule } from '@angular/material/card';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { environment } from '../environments/environment';
import { StoreDevModules } from './store/config/devtool.prod';
import { CalendarPageComponent } from './pages/calendar/containers/calendar-page/calendar-page.component';
import { CalendarModule } from './pages/calendar/calendar.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    DashboardModule,
    UserModule,
    CalendarModule,
    SharedModule,
    MatCardModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    // This module module will only load for Dev environments, making the build quicker, reducing its size on disk, and its runtime footprint
    // check under -- https://ngohungphuc.wordpress.com/2020/02/26/turn-off-ngrxs-store-dev-tool-in-prod-mode/
    StoreDevModules,
    EffectsModule.forRoot() // NB: It is mandatory to register a root effect to kisckstart the effects providers for other feature effects, otherwise effects won't work at start up
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
