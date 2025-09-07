import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-manager',
  templateUrl: './calendar-manager.component.html',
  styleUrls: ['./calendar-manager.component.scss']
})
export class CalendarManagerComponent implements OnInit {
  weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: Array<{
    number: number,
    active: boolean,
    hasEvents: boolean,
    isToday: boolean,
    currentMonth: boolean
  }> = [];
  
  ngOnInit(): void {
    this.generateCalendar();
  }
  
  generateCalendar(): void {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    // Previous month days to fill the first week
    const prevMonthDays = firstDay.getDay();
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      this.calendarDays.push({
        number: prevMonth.getDate() - i,
        active: false,
        hasEvents: false,
        isToday: false,
        currentMonth: false
      });
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      this.calendarDays.push({
        number: i,
        active: false,
        hasEvents: [6, 12, 13, 19].includes(i), // Sample days with events
        isToday: i === today.getDate(),
        currentMonth: true
      });
    }
    
    // Next month days to complete the grid
    const remaining = 42 - this.calendarDays.length; // 6 rows of 7 days
    for (let i = 1; i <= remaining; i++) {
      this.calendarDays.push({
        number: i,
        active: false,
        hasEvents: false,
        isToday: false,
        currentMonth: false
      });
    }
  }
}
