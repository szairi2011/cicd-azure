import { Component } from '@angular/core';

interface TodoItem {
  id: string;
  label: string;
  color: string;
  icon?: string;
}

@Component({
  selector: 'app-todo-list',
  template: `
    <mat-card class="todo-card">
      <mat-card-header>
        <mat-icon mat-card-avatar class="header-icon">assignment</mat-icon>
        <mat-card-title>Todo List</mat-card-title>
      </mat-card-header>
      
      <mat-card-content>
        <mat-list class="todo-list">
          <mat-list-item *ngFor="let item of todoItems" class="todo-item">
            <div class="todo-avatar" [style.background-color]="item.color">
              {{item.id}}
            </div>
            <div class="todo-content">
              <span class="todo-label">{{item.label}}</span>
            </div>
            <div class="todo-actions">
              <mat-icon *ngIf="item.icon">{{item.icon}}</mat-icon>
              <mat-icon *ngIf="!item.icon">keyboard_arrow_down</mat-icon>
            </div>
          </mat-list-item>
        </mat-list>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .todo-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .header-icon {
      background-color: #f5f5f5;
      color: #666;
    }
    
    .todo-list {
      padding: 0;
    }
    
    .todo-item {
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .todo-item:last-child {
      border-bottom: none;
    }
    
    .todo-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 12px;
      margin-right: 16px;
    }
    
    .todo-content {
      flex: 1;
    }
    
    .todo-label {
      font-size: 14px;
      color: #333;
    }
    
    .todo-actions {
      color: #999;
    }
    
    ::ng-deep .mat-list-item-content {
      padding: 0 !important;
      align-items: center;
    }
  `]
})
export class TodoListComponent {
  todoItems: TodoItem[] = [
    { id: 'TL', label: 'Todo List', color: '#42a5f5' },
    { id: 'CL', label: 'Complete Audio End Tasks', color: '#66bb6a', icon: 'play_arrow' },
    { id: 'FP', label: 'File for Client Proposals', color: '#ff7043' }
  ];
}