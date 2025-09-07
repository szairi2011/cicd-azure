import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
} from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from './event_utils';

@Component({
  selector: 'app-user-fullcalendar',
  templateUrl: './user-fullcalendar.component.html',
  styleUrls: ['./user-fullcalendar.component.scss'],
})
export class UserFullCalendarComponent implements OnInit, AfterViewInit {
  calendarVisible: boolean;
  calendarOptions: CalendarOptions;
  currentEvents: EventApi[];

  constructor() {}

  ngOnInit(): void {
    // setTimeout(() => {
      this.calendarVisible = true;

      this.calendarOptions = {
        headerToolbar: {
          left: 'prev, next, today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listweek',
        },
        initialView: 'dayGridMonth',
        initialEvents: INITIAL_EVENTS,
        weekends: true,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        select: this.handleDateSelect.bind(this),
        eventClick: this.handleEventClick.bind(this),
        eventsSet: this.handleEventsSet.bind(this),
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      };
    // }, 0);
  }

  ngAfterViewInit(): void {

  }

  handleCalendarToggle(): void {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle(): void {
    this.calendarOptions.weekends = !this.calendarOptions.weekends;
  }

  // Add a new event when clicking inside a calendar cell
  handleDateSelect(selectInfo: DateSelectArg): void {
    const title = prompt('Please enter a title for the event ...');
    const calendarAPI = selectInfo.view.calendar;

    calendarAPI.unselect(); // Clear event selection

    if (title) {
      calendarAPI.addEvent({
        id: createEventId(),
        title: title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEventClick(eventClickInfo: EventClickArg): void {
    if (
      confirm(
        `Are you sure you want to delete the event '${eventClickInfo.event.title}' ?`
      )
    ) {
      eventClickInfo.event.remove();
    }
  }

  handleEventsSet(events: EventApi[]): void {
    this.currentEvents = events;
  }
}
