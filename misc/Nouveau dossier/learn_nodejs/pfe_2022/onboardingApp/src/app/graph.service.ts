// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Injectable } from '@angular/core';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

import { AuthService } from './auth.service';
import { AlertsService } from './alerts.service';
import {Client} from "@microsoft/microsoft-graph-client";

@Injectable({
  providedIn: 'root'
})

export class GraphService {
  graphClient?: Client;
  constructor(
    private authService: AuthService,
    private alertsService: AlertsService) {}

  async getCalendarView(start: string, end: string, timeZone: string): Promise<MicrosoftGraph.Event[] | undefined> {

    if (!this.authService.graphClient) {
      this.alertsService.addError('Graph client is not initialized.');
      return undefined;
    }

    try {
      // GET /me/calendarview?startDateTime=''&endDateTime=''
      // &$select=subject,organizer,start,end
      // &$orderby=start/dateTime
      // &$top=50
      const result =  await this.authService.graphClient
        .api('/me/calendarview')
        .header('Prefer', `outlook.timezone="${timeZone}"`)
        .query({
          startDateTime: start,
          endDateTime: end
        })
        .select('subject,organizer,start,end')
        .orderby('start/dateTime')
        .top(50)
        .get();

      return result.value;
    } catch (error) {
      this.alertsService.addError('Could not get events', JSON.stringify(error, null, 2));
    }
    return undefined;
  }

  // <AddEventSnippet>
  async addEventToCalendar(newEvent: MicrosoftGraph.Event): Promise<void> {
    if (!this.authService.graphClient) {
      this.alertsService.addError('Graph client is not initialized.');
      return undefined;
    }
    try {
      // POST /me/events
      await this.authService.graphClient
        .api('/me/events')
        .post(newEvent);
    } catch (error) {
      throw Error(JSON.stringify(error, null, 2));
    }
  }
  // </AddEventSnippet>

  // <AddEventSnippet>
  async findMeetingTimes(model?: MicrosoftGraph.Event): Promise<any | undefined> {
    if (!this.authService.graphClient) {
      this.alertsService.addError('Graph client is not initialized.');
      return undefined;
    }

    try {
      // POST /me/events
      const findEvent = {
        "attendees": model?.attendees,
        "locationConstraint": {
          "isRequired": "false",
          "suggestLocation": "false"
        },
        "timeConstraint": {
          "activityDomain":"work",
          "timeSlots": [
            {
              "start": model?.start,
              "end": model?.end
            }
          ]
        },
        "meetingDuration": "PT1H",
        "returnSuggestionReasons": "true",
        "minimumAttendeePercentage": "100"
      };
      return await this.authService.graphClient
        .api('/me/findMeetingTimes')
        .post(findEvent)
        .then((value?: any)=>{
          return value;
        });
    } catch (error) {
      throw Error(JSON.stringify(error, null, 2));
    }
  }
  // </AddEventSnippet>
}
