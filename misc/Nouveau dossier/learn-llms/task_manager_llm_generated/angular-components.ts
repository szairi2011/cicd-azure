// frontend/src/app/components/navigation/navigation.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  template: `
    <div class="sidebar">
      <div class="logo">
        <img src="assets/logo.png" alt="Anigaita" />
        <span>Anigaita</span>
      </div>
      <nav>
        <ul>
          <li><a routerLink="/tasks" routerLinkActive="active"><i class="icon-tasks"></i> Tasks</a></li>
          <li><a routerLink="/menu" routerLinkActive="active"><i class="icon-menu"></i> Menu</a></li>
          <li><a routerLink="/settings" routerLinkActive="active"><i class="icon-settings"></i> Settings</a></li>
          <li><a routerLink="/options" routerLinkActive="active"><i class="icon-options"></i> Options</a></li>
          <li><a routerLink="/poplogs" routerLinkActive="active"><i class="icon-logs"></i> Poplogs</a></li>
          <li><a routerLink="/collages" routerLinkActive="active"><i class="icon-collages"></i> Collages</a></li>
          <li><a routerLink="/legal" routerLinkActive="active"><i class="icon-legal"></i> Legal</a></li>
        </ul>
      </nav>
      <div class="contact">
        <i class="icon-contact"></i> Contact
      </div>
    </div>
  `,
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {}

// frontend/src/app/components/task-list/task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  template: `
    <div class="task-container">
      <div class="header">
        <h2>Todo List</h2>
        <button class="expand-btn"><i class="icon-expand"></i></button>
      </div>
      
      <div class="task-groups">
        <div class="task-group">
          <div class="task-item">
            <div class="icon task-icon">T</div>
            <span>Todo List</span>
            <i class="icon-dropdown"></i>
          </div>
        </div>
        
        <div class="task-group" *ngFor="let task of tasks">
          <div class="task-item">
            <div class="avatar" *ngIf="task.assignee?.avatar">
              <img [src]="task.assignee.avatar" [alt]="task.assignee.name">
            </div>
            <div class="avatar" *ngIf="!task.assignee?.avatar">
              {{ getInitials(task.assignee?.name) }}
            </div>
            <span>{{ task.title }}</span>
            <i class="icon-dropdown"></i>
          </div>
        </div>
      </div>
      
      <div class="tasks-section">
        <h3>Tasks:</h3>
        <div class="task-list">
          <div class="task" *ngFor="let task of activeTasks">
            <div class="task-avatar">
              <img [src]="task.assignee?.avatar || 'assets/default-avatar.png'" [alt]="task.assignee?.name">
            </div>
            <div class="task-content">
              <div class="task-title">{{ task.title }}</div>
            </div>
            <i class="icon-expand"></i>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  activeTasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.activeTasks = tasks.filter(task => !task.completed);
    });
  }

  getInitials(name?: string): string {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
}

// frontend/src/app/components/progress-chart/progress-chart.component.ts
import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-progress-chart',
  template: `
    <div class="chart-container">
      <div class="chart-header">
        <span class="number">{{ completionPercentage.toFixed(0) }}</span>
        <span class="percent">{{ completionPercentage.toFixed(2) }}%</span>
        <span class="label">Tasks</span>
      </div>
      <canvas id="progressChart"></canvas>
    </div>
  `,
  styleUrls: ['./progress-chart.component.scss']
})
export class ProgressChartComponent implements OnInit {
  completionPercentage: number = 0;
  
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTaskData();
  }

  loadTaskData(): void {
    this.taskService.getTasks().subscribe(tasks => {
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(task => task.completed).length;
      
      this.completionPercentage = totalTasks > 0 
        ? (completedTasks / totalTasks) * 100 
        : 0;
        
      this.createChart(completedTasks, totalTasks - completedTasks);
    });
  }

  createChart(completed: number, remaining: number): void {
    const data = {
      datasets: [{
        data: [completed, remaining],
        backgroundColor: ['#FFC978', '#F0F0F0'],
        borderWidth: 0,
        cutout: '80%'
      }]
    };
    
    const config: ChartConfiguration = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    };
    
    new Chart('progressChart', config);
  }
}

// frontend/src/app/components/calendar-manager/calendar-manager.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-manager',
  template: `
    <div class="calendar-container">
      <h3>Calendar Manager</h3>
      
      <div class="calendar">
        <div class="weekdays">
          <div *ngFor="let day of weekdays">{{ day }}</div>
        </div>
        
        <div class="days">
          <div 
            *ngFor="let day of calendarDays" 
            class="day" 
            [class.active]="day.active"
            [class.has-events]="day.hasEvents"
            [class.today]="day.isToday"
            [class.other-month]="!day.currentMonth">
            {{ day.number }}
          </div>
        </div>
      </div>
      
      <div class="calendar-footer">
        <div class="event">
          <div class="event-dot"></div>
          <span>30 June</span>
        </div>
        <div class="current-time">
          <span class="time">20:17</span>
          <span class="location">Eindhoven</span>
        </div>
      </div>
    </div>
  `,
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

// frontend/src/app/app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <app-navigation></app-navigation>
      
      <div class="main-content">
        <div class="content-area">
          <router-outlet></router-outlet>
        </div>
        
        <div class="sidebar-right">
          <app-progress-chart></app-progress-chart>
          <app-calendar-manager></app-calendar-manager>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
