import { Component, Input, OnInit } from '@angular/core';
import { PerformanceChartData } from '../../models';

@Component({
  selector: 'app-performance-score-card',
  templateUrl: './performance-score-card.component.html',
  styleUrls: ['./performance-score-card.component.scss']
})
export class PerformanceScoreCardComponent implements OnInit {

  @Input() performanceChartData: PerformanceChartData;

  constructor() { }

  ngOnInit(): void {}

}
