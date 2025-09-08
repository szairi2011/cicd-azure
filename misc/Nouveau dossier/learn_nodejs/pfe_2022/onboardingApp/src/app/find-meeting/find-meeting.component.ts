import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {GraphService} from "../graph.service";
import {AlertsService} from "../alerts.service";
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import {parseISO} from "date-fns";
import {NewEvent} from "../new-event/new-event";
import {FindMeetingTimes} from "../models/findMeetingTimes"

@Component({
  selector: 'app-find-meeting',
  templateUrl: './find-meeting.component.html',
  styleUrls: ['./find-meeting.component.css']
})
export class FindMeetingComponent implements OnInit {
  attendees?: string;
  result?: any;
  model = new NewEvent();

  constructor(
      private authService: AuthService,
      private graphService: GraphService,
      private alertsService: AlertsService) { }

  ngOnInit(): void {
  }

  async onSubmit(): Promise<void> {
    const timeZone = this.authService.user?.timeZone ?? 'UTC';
    const attendees = this.model.getGraphEvent(timeZone);

    try {
      this.result = await this.graphService.findMeetingTimes(attendees);
      console.log(this.result)
      //this.alertsService.addSuccess('Event created.');
    } catch (error) {
      this.alertsService.addError('Error finding meetings time.', error.message);
    }
  }

  formatDateTimeTimeZone(dateTime: MicrosoftGraph.DateTimeTimeZone | undefined | null): Date | undefined {
    if (dateTime == undefined || dateTime == null) {
      return undefined;
    }

    try {
      return parseISO(dateTime.dateTime!);
    }
    catch(error) {
      this.alertsService.addError('DateTimeTimeZone conversion error', JSON.stringify(error));
      return undefined;
    }
  }

}
