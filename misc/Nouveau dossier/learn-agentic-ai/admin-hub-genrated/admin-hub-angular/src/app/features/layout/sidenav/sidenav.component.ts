import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface NavItem {
  name: string;
  route: string;
  icon: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  navItems: NavItem[] = [
    { name: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { name: 'Todo Lists', route: '/todo-lists', icon: 'add_task' },
    { name: 'Calendar', route: '/calendar', icon: 'calendar_today' },
    { name: 'Task Scheduler', route: '/task-scheduler', icon: 'event_note' },
    { name: 'Analytics', route: '/analytics', icon: 'analytics' },
    { name: 'Settings', route: '/settings', icon: 'settings' },
    { name: 'User Management', route: '/users', icon: 'people' }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Track active route to highlight the active navigation item
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setActiveRoute();
    });

    // Set active route initially
    this.setActiveRoute();
  }

  private setActiveRoute(): void {
    const currentUrl = this.router.url;
    this.navItems.forEach(item => {
      item.active = currentUrl.includes(item.route);
    });
  }
}
