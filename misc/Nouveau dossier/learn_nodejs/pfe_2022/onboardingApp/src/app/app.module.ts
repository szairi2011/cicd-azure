// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { IPublicClientApplication,
         PublicClientApplication,
         BrowserCacheLocation } from '@azure/msal-browser';
import { MsalModule,
         MsalService,
         MSAL_INSTANCE } from '@azure/msal-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { AlertsComponent } from './alerts/alerts.component';
import { OAuthSettings } from '../oauth';
import { CalendarComponent } from './calendar/calendar.component';
import { NewEventComponent } from './new-event/new-event.component';
import { FindMeetingComponent } from './find-meeting/find-meeting.component';
import {
	IgxAvatarModule,
	IgxFilterModule,
	IgxIconModule,
	IgxListModule,
	IgxInputGroupModule,
	IgxButtonGroupModule,
	IgxRippleModule
 } from "igniteui-angular";
 import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { ReactiveFormsModule } from '@angular/forms';
import { CalendarapiComponent } from './calendarapi/calendarapi.component';
import {HttpClientModule} from "@angular/common/http";
import {SchedualMeetingComponent} from "./schedual-meeting/schedual-meeting.component";
import {ListsComponent} from "./lists/lists.component";
import {FeedbackComponent} from "./feedback/feedback.component";
import {MentorsComponent} from "./mentors/mentors.component";
import {NewJoinersComponent} from "./new-joiners/new-joiners.component";
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {StepperComponent} from "./stepper/stepper.component";

// <MSALFactorySnippet>
let msalInstance: IPublicClientApplication | undefined = undefined;

export function MSALInstanceFactory(): IPublicClientApplication {
  msalInstance = msalInstance ?? new PublicClientApplication({
    auth: {
      clientId: OAuthSettings.appId,
      redirectUri: OAuthSettings.redirectUri,
      postLogoutRedirectUri: OAuthSettings.redirectUri
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    }
  });

  return msalInstance;
}
// </MSALFactorySnippet>

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    AlertsComponent,
    CalendarComponent,
    NewEventComponent,
    FindMeetingComponent,
    CalendarapiComponent,
    SchedualMeetingComponent,
    FileUploadComponent,
    NewJoinersComponent,
    MentorsComponent,
    ListsComponent,
    HomeComponent,
    FeedbackComponent,
    StepperComponent
  ],
  // <ImportsSnippet>
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    MsalModule,IgxAvatarModule,
    IgxFilterModule,
    IgxIconModule,
    IgxListModule,
    IgxInputGroupModule,
    IgxButtonGroupModule,
    IgxRippleModule,BrowserAnimationsModule, ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,MatIconModule,MatStepperModule,BrowserAnimationsModule ,ReactiveFormsModule,MatFormFieldModule,MatGridListModule,
    MatToolbarModule, HttpClientModule,MatTableModule
  ],
  // </ImportsSnippet>
  // <ProvidersSnippet>
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService
  ],
  // </ProvidersSnippet>
  bootstrap: [AppComponent]
})
export class AppModule { }
