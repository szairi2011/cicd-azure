import { Component } from '@angular/core';

interface Task {
  id: string;
  label: string;
  color: string;
  icon?: string;
  priority?: string;
}

@Component({
  selector: 'app-tasks',
  template: `
    <mat-card class="tasks-card">
      <mat-card-header>
        <mat-icon mat-card-avatar class="header-icon">bar_chart</mat-icon>
        <mat-card-title>Tasks</mat-card-title>
      </mat-card-header>
      
      <mat-card-content>
        <mat-list class="tasks-list">
          <mat-list-item *ngFor="let task of tasks" class="task-item">
            <div class="task-avatar" [style.background-color]="task.color">
              {{task.id}}
            </div>
            <div class="task-content">
              <span class="task-label">{{task.label}}</span>
            </div>
            <div class="task-actions">
              <mat-icon *ngIf="task.icon">{{task.icon}}</mat-icon>
              <mat-icon *ngIf="task.priority === 'high'">keyboard_arrow_up</mat-icon>
              <mat-icon *ngIf="!task.icon && task.priority !== 'high'">keyboard_arrow_down</mat-icon>
              <span *ngIf="task.priority === 'normal'" class="priority-dot"></span>
            </div>
          </mat-list-item>
        </mat-list>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .tasks-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .header-icon {
      background-color: #f5f5f5;
      color: #666;
    }
    
    .tasks-list {
      padding: 0;
    }
    
    .task-item {
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .task-item:last-child {
      border-bottom: none;
    }
    
    .task-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 11px;
      margin-right: 16px;
    }
    
    .task-content {
      flex: 1;
    }
    
    .task-label {
      font-size: 14px;
      color: #333;
    }
    
    .task-actions {
      color: #999;
      display: flex;
      align-items: center;
    }
    
    .priority-dot {
      width: 8px;
      height: 8px;
      background-color: #66bb6a;
      border-radius: 50%;
    }
    
    ::ng-deep .mat-list-item-content {
      padding: 0 !important;
      align-items: center;
    }
  `]
})
export class TasksComponent {
  tasks: Task[] = [
    { id: 'DW', label: 'Daily at Work-you Tasks', color: '#9c27b0', priority: 'high' },
    { id: 'NV', label: 'Review New Policy', color: '#00acc1', priority: 'normal' },
    { id: 'CS', label: 'Client Sprint Day', color: '#5c6bc0' },
    { id: 'CT', label: 'End Client Toe', color: '#42a5f5' },
    { id: 'CM', label: 'Calendar Manager', color: '#ff7043', icon: 'play_arrow' },
    { id: 'VM', label: 'Visit Ops Majors', color: '#8bc34a' }
  ];
}