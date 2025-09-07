import { Component } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  template: `
    <mat-card class="stats-card">
      <mat-card-content>
        <div class="stats-header">
          <div class="progress-circle">
            <mat-progress-spinner
              [value]="65"
              [diameter]="120"
              [strokeWidth]="8"
              color="warn">
            </mat-progress-spinner>
            <div class="progress-text">
              <span class="progress-value">65.0</span>
              <span class="progress-label">Tasks</span>
            </div>
          </div>
        </div>
        
        <div class="stats-row">
          <div class="stat-item">
            <span class="stat-number">12</span>
            <span class="stat-label">Open</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">8</span>
            <span class="stat-label">In Progress</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">25</span>
            <span class="stat-label">Done</span>
          </div>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .stats-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .stats-header {
      display: flex;
      justify-content: center;
      margin-bottom: 24px;
    }
    
    .progress-circle {
      position: relative;
      width: 120px;
      height: 120px;
    }
    
    .progress-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      z-index: 1;
    }
    
    .progress-value {
      display: block;
      font-size: 24px;
      font-weight: bold;
      color: #333;
      line-height: 1;
    }
    
    .progress-label {
      font-size: 12px;
      color: #666;
    }
    
    .stats-row {
      display: flex;
      justify-content: space-between;
      gap: 16px;
    }
    
    .stat-item {
      flex: 1;
      text-align: center;
    }
    
    .stat-number {
      display: block;
      font-size: 20px;
      font-weight: bold;
      color: #333;
      line-height: 1.2;
    }
    
    .stat-label {
      font-size: 11px;
      color: #666;
      text-transform: uppercase;
    }
  `]
})
export class StatsCardComponent { }