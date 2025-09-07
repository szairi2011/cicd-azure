import { Component } from '@angular/core';
import { WeekService, MonthService, WorkWeekService, EventSettingsModel, AgendaService, View } from '@syncfusion/ej2-angular-schedule';
// import { defaultData } from './datasource';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-root',
  providers: [WeekService, MonthService, WorkWeekService, AgendaService],
  /* template: `<ejs-schedule width='100%' height='550px' [selectedDate]="selectedDate" [eventSettings]="eventSettings"><e-views> <e-view option="Week" startHour="07:00" endHour="15:00"></e-view>
  <e-view option="WorkWeek" startHour="10:00" endHour="18:00"></e-view> <e-view option="Month" [showWeekend]="showWeekend"></e-view></e-views></ejs-schedule>` */
  templateUrl: './app.component.html'
})
export class AppComponent {

  // Using local data binding
  /* title = 'angular11Scheduler-app';
  public selectedDate: Date = new Date(2018, 1, 15);
  public showWeekend: boolean = false;
  public allowVirtualScroll: boolean = true;
  public currentView:View = 'Agenda';
  public allowDrugAndDrop: boolean = true;
  public eventSettings: EventSettingsModel = { dataSource: defaultData }; */

  // Using syncfusion remote service
  public currentView: View = 'Month';
  public readonly = false;
  private dataManager: DataManager = new DataManager({
    // url: 'https://ej2services.syncfusion.com/production/web-services/api/Schedule',
    url: 'http://localhost:4000/events',
    adaptor: new WebApiAdaptor,
    crossDomain: true,
  });
  public eventSettings: EventSettingsModel = { dataSource: this.dataManager };

}
