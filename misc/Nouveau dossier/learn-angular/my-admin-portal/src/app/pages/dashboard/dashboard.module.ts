import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './containers/dashboard-page';

import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardService } from './services';
import { TrendModule } from 'ngx-trend';
import { PerformanceScoreCardComponent, VisitsScoreCardComponent } from './components';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ServerScoreCardComponent } from './components/server-score-card/server-score-card.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { RevenuePieChartComponent } from './components/revenue-pie-chart/revenue-pie-chart.component';
import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
  declarations: [
    DashboardPageComponent,
    VisitsScoreCardComponent,
    PerformanceScoreCardComponent,
    ServerScoreCardComponent,
    RevenuePieChartComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    SharedModule,
    TrendModule,
    NgApexchartsModule,
    NgxEchartsModule.forRoot({
      /**
       * This will import all modules from echarts.
       * If you only need custom modules,
       * please refer to [Custom Build] section.
       */
       echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    })
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule { }
