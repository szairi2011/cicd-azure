import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import the ScheduleModule for the Schedule component
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { WeekService, MonthService, AgendaService, MonthAgendaService, DragAndDropService, ResizeService } from '@syncfusion/ej2-angular-schedule';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ScheduleModule
  ],
  providers: [
    WeekService,
    MonthService,
    AgendaService,
    MonthAgendaService,
    DragAndDropService,
    ResizeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
