import { Component } from '@angular/core';

interface MenuItem {
  icon: string;
  label: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar',
  template: `
    <mat-sidenav-container class="sidebar-container">
      <mat-sidenav opened mode="side" class="sidebar">
        <div class="sidebar-header">
          <div class="logo">
            <div class="logo-icon">A</div>
            <span class="logo-text">Anigato</span>
          </div>
        </div>
        
        <mat-nav-list class="nav-list">
          <mat-list-item 
            *ngFor="let item of menuItems" 
            [class.active]="item.active"
            class="nav-item">
            <mat-icon matListIcon>{{item.icon}}</mat-icon>
            <span matLine>{{item.label}}</span>
          </mat-list-item>
        </mat-nav-list>
        
        <div class="sidebar-footer">
          <mat-list-item class="nav-item">
            <mat-icon matListIcon>contact_mail</mat-icon>
            <span matLine>Contact</span>
          </mat-list-item>
        </div>
      </mat-sidenav>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidebar-container {
      width: 280px;
      height: 100vh;
    }
    
    .sidebar {
      width: 280px;
      background-color: #4a4a4a;
      color: white;
      padding: 0;
    }
    
    .sidebar-header {
      padding: 24px 16px;
      border-bottom: 1px solid #5a5a5a;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .logo-icon {
      width: 32px;
      height: 32px;
      background-color: #66bb6a;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 16px;
    }
    
    .logo-text {
      font-size: 18px;
      font-weight: 500;
    }
    
    .nav-list {
      padding: 16px 0;
    }
    
    .nav-item {
      color: #b0b0b0;
      margin: 4px 16px;
      border-radius: 8px;
      transition: all 0.2s;
    }
    
    .nav-item:hover {
      background-color: #5a5a5a;
      color: white;
    }
    
    .nav-item.active {
      background-color: #333;
      color: white;
    }
    
    .sidebar-footer {
      position: absolute;
      bottom: 16px;
      left: 0;
      right: 0;
    }
    
    ::ng-deep .mat-list-item-content {
      padding: 8px 16px !important;
    }
    
    ::ng-deep .mat-list-icon {
      color: inherit;
    }
  `]
})
export class SidebarComponent {
  menuItems: MenuItem[] = [
    { icon: 'today', label: 'Today', active: true },
    { icon: 'menu', label: 'Menu' },
    { icon: 'check_circle', label: 'Sessions' },
    { icon: 'settings', label: 'Options' },
    { icon: 'folder', label: 'Projects' },
    { icon: 'star', label: 'Categories' },
    { icon: 'list', label: 'Lists' }
  ];
}