import { Observable } from 'rxjs';
import { VisistsChartData } from '../../models/visits.chart.data';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services';
import { PerformanceChartData, RevenueChartData, ServerChartData } from '../../models';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { loadAllUsers } from 'src/app/store/actions';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  visitsChartData$: Observable<VisistsChartData>;
  performanceChartData$: Observable<PerformanceChartData>;
  serverChartData$: Observable<ServerChartData>;
  revenueChartData$: Observable<RevenueChartData>

  constructor(
    private dashboardService: DashboardService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.visitsChartData$ = this.dashboardService.loadVisitsChartData();
    this.performanceChartData$ = this.dashboardService.loadPerformanceChartData();
    this.serverChartData$ = this.dashboardService.loadServerChartData();
    this.revenueChartData$ = this.dashboardService.loadRevenueChartData();

    // Load users to bybass an issue with ngrx when loading from a different route
    this.store.dispatch(loadAllUsers());
  }

}
