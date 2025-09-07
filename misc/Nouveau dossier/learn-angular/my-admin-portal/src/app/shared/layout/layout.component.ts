import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav: MatSidenav;

  isShowSidebar: boolean;

  mode: string;

  constructor(private breakpointObserver: BreakpointObserver) { }


  ngOnInit() {

    // Create a responsive sidenav to small footprint devices
    this.breakpointObserver.observe('(max-width: 1024px)')
        .subscribe((state: BreakpointState) => {
          console.log(state);

          if (state.matches) {
            this.isShowSidebar = false;
            this.mode = 'over';
          } else {
            this.isShowSidebar = true;
            this.mode = 'side';
          }
        });

  }

  public ngOnDestroy(): void {
    this.sidenav.close();
  }

  toggle() {
    this.isShowSidebar = !this.isShowSidebar;
  }
}
