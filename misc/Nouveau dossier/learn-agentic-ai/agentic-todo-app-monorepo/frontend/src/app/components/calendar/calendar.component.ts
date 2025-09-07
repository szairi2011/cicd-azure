import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  template: `
    <div class="calendar-section">
      <mat-card class="calendar-card">
        <mat-card-header>
          <mat-icon mat-card-avatar class="header-icon">calendar_today</mat-icon>
          <mat-card-title>Calendar Manager</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <div class="calendar-grid">
            <div class="calendar-header">
              <div class="day-header" *ngFor="let day of dayHeaders">{{day}}</div>
            </div>
            <div class="calendar-days">
              <div 
                class="calendar-day"
                *ngFor="let day of calendarDays"
                [class.today]="day.isToday"
                [class.selected]="day.isSelected"
                [class.other-month]="day.isOtherMonth">
                {{day.date}}
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
      
      <mat-card class="calendar-summary">
        <mat-card-header>
          <mat-icon mat-card-avatar class="header-icon">event</mat-icon>
          <mat-card-title>Calendar</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <div class="summary-row">
            <div class="summary-item">
              <span class="summary-number">5</span>
              <span class="summary-label">Events Today</span>
            </div>
            <div class="summary-item">
              <span class="summary-number">18 Jul</span>
              <span class="summary-label">Next Meeting</span>
            </div>
            <div class="summary-item">
              <span class="summary-number">85%</span>
              <span class="summary-label">Schedule</span>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .calendar-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .calendar-card, .calendar-summary {
      background: white;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .header-icon {
      background-color: #f5f5f5;
      color: #666;
    }
    
    .calendar-grid {
      font-size: 12px;
    }
    
    .calendar-header {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
      margin-bottom: 8px;
    }
    
    .day-header {
      text-align: center;
      font-weight: 500;
      color: #666;
      padding: 8px 4px;
    }
    
    .calendar-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
    }
    
    .calendar-day {
      text-align: center;
      padding: 8px 4px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .calendar-day:hover {
      background-color: #f5f5f5;
    }
    
    .calendar-day.today {
      background-color: #ff7043;
      color: white;
    }
    
    .calendar-day.selected {
      background-color: #42a5f5;
      color: white;
    }
    
    .calendar-day.other-month {
      color: #ccc;
    }
    
    .summary-row {
      display: flex;
      justify-content: space-between;
      gap: 16px;
    }
    
    .summary-item {
      flex: 1;
      text-align: center;
    }
    
    .summary-number {
      display: block;
      font-size: 14px;
      font-weight: bold;
      color: #333;
      line-height: 1.2;
    }
    
    .summary-label {
      font-size: 10px;
      color: #666;
    }
  `]
})
export class CalendarComponent {
  dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  calendarDays = [
    // Previous month days
    { date: 28, isOtherMonth: true },
    { date: 29, isOtherMonth: true },
    { date: 30, isOtherMonth: true },
    { date: 31, isOtherMonth: true },
    
    // Current month days
    { date: 1 },
    { date: 2 },
    { date: 3 },
    { date: 4 },
    { date: 5 },
    { date: 6, isToday: true },
    { date: 7 },
    { date: 8 },
    { date: 9 },
    { date: 10 },
    { date: 11 },
    { date: 12 },
    { date: 13 },
    { date: 14, isSelected: true },
    { date: 15 },
    { date: 16 },
    { date: 17, isSelected: true },
    { date: 18 },
    { date: 19 },
    { date: 20 },
    { date: 21 },
    { date: 22 },
    { date: 23 },
    { date: 24 },
    { date: 25, isSelected: true },
    { date: 26 },
    { date: 27 },
    { date: 28 },
    { date: 29 },
    { date: 30 },
    { date: 31 }
  ];
}