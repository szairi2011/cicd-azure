// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalendarComponent } from './calendar/calendar.component';
import { NewEventComponent } from './new-event/new-event.component';
import {FindMeetingComponent} from "./find-meeting/find-meeting.component";
import {CalendarapiComponent} from "./calendarapi/calendarapi.component";
import {SchedualMeetingComponent} from "./schedual-meeting/schedual-meeting.component";
import {ListsComponent} from "./lists/lists.component";
import {StepperComponent} from "./stepper/stepper.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'newevent', component: NewEventComponent },
  { path: 'findmeeting', component: FindMeetingComponent },
  { path: 'api/findmeeting', component: CalendarapiComponent },
  { path: 'schedule-meeting', component:SchedualMeetingComponent },
  { path: 'lists', component:ListsComponent },
  { path: 'stepper', component:StepperComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
