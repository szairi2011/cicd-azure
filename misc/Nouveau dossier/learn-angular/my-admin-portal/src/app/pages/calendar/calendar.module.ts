import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFullCalendarComponent } from './components/user-fullcalendar/user-fullcalendar.component';
import { CalendarPageComponent } from './containers/calendar-page/calendar-page.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'; //Add plugin to the project using > ng add @fullcalendar/interaction
import { UserTasksComponent } from '../user/profile/components/todo';
import { ProfileModule } from '../user/profile/profile.module';
import { MatCardModule } from '@angular/material/card';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    UserFullCalendarComponent,
    CalendarPageComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    SharedModule,
    ProfileModule,
    MatToolbarModule,
    MatCardModule
  ]
})
export class CalendarModule { }
