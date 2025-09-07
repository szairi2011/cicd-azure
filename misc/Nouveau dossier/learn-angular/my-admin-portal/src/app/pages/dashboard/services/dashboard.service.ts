import { PerformanceChartData, RevenueChartData, ServerChartData, VisistsChartData } from './../models';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  loadVisitsChartData(): Observable<VisistsChartData> {
    // TODO: Include genuine call
    return of(
      {
        data: [7, 6, 3, 8, 10, 6, 7, 8, 3, 0, 7, 15, 2, 30, 4, 7, 3, 6, 2, 3, 8, 1, 0, 4, 9],
        registration: '860',
        signOut: '32',
        rate: '3.25',
        all: '12.678'
      }
    );
  }

  loadPerformanceChartData(): Observable<PerformanceChartData> {
    // TODO: wire up with backend call
    return of(
      {
        integration: 40,
        sdk: 75
      }
    )
  }

  loadServerChartData(): Observable<ServerChartData> {
    // TODO: Replace with real backend call
    return of({
      firstServerChartData: [
        18107.85,
        35000.0,
        38122.9,
        28965.5,
        49340.7
      ],
      firstDataTitle: '45% / 78°С / 78 Ghz',
      secondServerChartData: [
        18423.7,
        48423.5,
        28514.3,
        48481.85,
        18487.7
      ],
      secondDataTitle: '57% / 45°С / 54 Ghz',
      thirdServerChartData: [
        17114.25,
        27126.6,
        47116.95,
        37203.7,
        17233.75
      ],
      thirdDataTitle: '87% / 55°С / 76 Ghz',
      dates: [
        '13 Nov 2017',
        '14 Nov 2017',
        '15 Nov 2017',
        '16 Nov 2017',
        '17 Nov 2017'
      ]
    });
  }

  public loadRevenueChartData(): Observable<RevenueChartData> {
    //  TODO:
    return of({
      groupA: Math.round(Math.random() * 100),
      groupB: Math.round(Math.random() * 100),
      groupC: Math.round(Math.random() * 100),
      groupD: Math.round(Math.random() * 100)
    });
  }
}
