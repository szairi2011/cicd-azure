import { Component, OnInit } from '@angular/core';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import {parseISO} from "date-fns";
import {ApiService} from "../services/api.service";
import {NewEvent} from "../new-event/new-event";
import {AuthService} from "../auth.service";
import {GraphService} from "../graph.service";
import {AlertsService} from "../alerts.service";

@Component({
  selector: 'app-calendarapi',
  templateUrl: './calendarapi.component.html',
  styleUrls: ['./calendarapi.component.css']
})
export class CalendarapiComponent implements OnInit {
  public events?: MicrosoftGraph.Event[];
  constructor(private serviceApi: ApiService,
              private authService: AuthService,
              private graphService: GraphService,
              private alertsService: AlertsService) { }
  result?: any;
  model = new NewEvent();

  ngOnInit(): void {
    /*this.serviceApi.getCalendar().subscribe(
      (res: any) => {
        console.log(res);
        this.result = res
      }
    );*/
  }

  async onSubmit(): Promise<void> {
    const timeZone = this.authService.user?.timeZone ?? 'UTC';
    const attendees = this.model.getGraphEvent(timeZone);

    try {
      this.serviceApi.getCalendar(attendees).subscribe(
        (res: any) => {
          console.log(res);
          this.result = res
        }
      );
    } catch (error) {
      this.alertsService.addError('Error finding meetings time.', error.message);
    }
  }

  // <formatDateTimeTimeZoneSnippet>
  formatDateTimeTimeZone(dateTime: MicrosoftGraph.DateTimeTimeZone | undefined | null): Date | undefined {
    if (dateTime == undefined || dateTime == null) {
      return undefined;
    }

    try {
      return parseISO(dateTime.dateTime!);
    }
    catch(error) {
      return undefined;
    }
  }
  // </formatDateTimeTimeZoneSnippet>

}
