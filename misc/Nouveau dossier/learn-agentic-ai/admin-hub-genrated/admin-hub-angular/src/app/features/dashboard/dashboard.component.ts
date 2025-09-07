import { Component, OnInit } from '@angular/core';

interface CalendarDay {
  day: string | number;
  type: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  calendarDays: CalendarDay[] = [];

  constructor() { }

  ngOnInit(): void {
    this.generateCalendarDays();
  }

  private generateCalendarDays(): void {
    // Generate days for the calendar display
    const days: CalendarDay[] = [];
    // Empty cell for the start of the month
    days.push({ day: '', type: 'empty' });

    for (let i = 1; i <= 31; i++) {
      let type = '';
      if (i === 6) type = 'today';
      else if (i === 14) type = 'highlighted';
      else if (i === 17 || i === 25) type = 'event';

      days.push({
        day: i,
        type: type
      });
    }

    this.calendarDays = days;
  }
}
