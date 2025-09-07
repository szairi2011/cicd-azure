import { NavItem } from './nav-item';
import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent {

  // title: string;
  // icon: string;
  // color: string;

  @ViewChild('drawer') sidenav: MatSidenav;

  isSideNavOpen: boolean = true;

  menuItems: NavItem[] = [
    {
      title: 'dashboard',
      icon: 'bar_chart',
      color: 'accent'
    },
    {
      title: 'sales',
      icon: 'attach_money',
      color: 'warn'
    },
    {
      title: 'orders',
      icon: 'shopping_cart',
      color: 'accent'
    },
    {
      title: 'customers',
      icon: 'people',
      color: 'primary'
    },
    {
      title: 'products',
      icon: 'list',
      color: 'warn'
    }
  ];
  selectedNavMenuItem: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  constructor(private breakpointObserver: BreakpointObserver) {}

  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
    this.sidenav.toggle();
  }

}
