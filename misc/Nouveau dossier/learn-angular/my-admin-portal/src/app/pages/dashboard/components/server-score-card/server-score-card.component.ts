import { colors } from 'src/app/consts';
import { ApexChartOptions, ServerChartData } from './../../models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-score-card',
  templateUrl: './server-score-card.component.html',
  styleUrls: ['./server-score-card.component.scss']
})
export class ServerScoreCardComponent implements OnInit {

  @Input() serverChartData: ServerChartData;

  apexCharts: Partial<ApexChartOptions>[];

  chartTitles: string[];

  constructor() { }

  // Transform server data to ng-apexcharts data to visualize
  ngOnInit(): void {

    this.apexCharts = [
      this.initChart(this.serverChartData.firstServerChartData, colors.BLUE),
      this.initChart(this.serverChartData.secondServerChartData, colors.PINK),
      this.initChart(this.serverChartData.thirdServerChartData, colors.YELLOW)
    ]

    this.chartTitles = [
      this.serverChartData.firstDataTitle,
      this.serverChartData.secondDataTitle,
      this.serverChartData.thirdDataTitle
    ]

  }

  initChart(data: number[], color: string): Partial<ApexChartOptions> {
    return {
      chart: {
        type: 'area',
        height: 80,
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        }
      },
      series: [
        {
          name: 'STOCK ABC',
          data: data
        }
      ],
      colors: [color],
      fill: {
        type: 'solid',
        opacity: 0.3
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      labels: this.serverChartData.dates,
      xaxis: {
        type: 'datetime',
        labels: {
          show: false
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        max: 50000,
        show: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false,
        padding: {
          bottom: 0,
          left: 0,
          right: 0,
          top: 0
        }
      },
      tooltip: {
        enabled: false
      }
    };
  }

}
