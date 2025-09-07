import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <div class="dashboard-content">
        <div class="left-column">
          <app-todo-list></app-todo-list>
          <app-tasks></app-tasks>
        </div>
        <div class="right-column">
          <app-stats-card></app-stats-card>
          <app-calendar></app-calendar>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
    }
    
    .dashboard-content {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: 24px;
      max-width: 1400px;
    }
    
    .left-column {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    
    .right-column {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
  `]
})
export class DashboardComponent { }