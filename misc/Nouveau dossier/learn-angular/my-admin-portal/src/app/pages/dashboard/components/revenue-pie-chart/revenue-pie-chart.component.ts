import { colors } from 'src/app/consts';
import { Component, Input, OnInit } from '@angular/core';
import { RevenueChartData } from '../../models';

@Component({
  selector: 'app-revenue-pie-chart',
  templateUrl: './revenue-pie-chart.component.html',
  styleUrls: ['./revenue-pie-chart.component.scss']
})
export class RevenuePieChartComponent implements OnInit {

  @Input() revenueChartData: RevenueChartData;

  revenueChart: any;

  constructor() { }

  public ngOnInit(): void {
    this.initChart();
  }

  public initChart(): void {
    this.revenueChart = {
      color: [colors.GREEN, colors.PINK, colors.YELLOW, colors.BLUE],
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: 'center',
        right: 'right',
        data: ['Group A', 'Group B', 'Group C', 'Group D'],
        textStyle: {
          color: '#6E6E6E'
        }
      },
      series: [{
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['24%', '50%'],
        label: {
          show: false
        },
        labelLine: {
          normal: {
            show: false
          }
        },
        hoverAnimation: false,
        avoidLabelOverlap: false,
        data: [
          {
            name: 'Group A',
            value: this.revenueChartData.groupA
          },
          {
            name: 'Group B',
            value: this.revenueChartData.groupB
          },
          {
            name: 'Group C',
            value: this.revenueChartData.groupC
          },
          {
            name: 'Group D',
            value: this.revenueChartData.groupD
          },
        ]
      }]
    };
  }
}

