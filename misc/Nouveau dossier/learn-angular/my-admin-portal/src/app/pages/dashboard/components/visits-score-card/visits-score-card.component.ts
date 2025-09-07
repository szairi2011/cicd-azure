
import { Component, Input, OnInit } from '@angular/core';
import { colors } from 'src/app/consts';
import { VisistsChartData } from '../../models';

@Component({
  selector: 'app-visits-score-card',
  templateUrl: './visits-score-card.component.html',
  styleUrls: ['./visits-score-card.component.scss']
})
export class VisitsScoreCardComponent implements OnInit {

  @Input() visitsChartData: VisistsChartData;

  colors = colors;

  constructor() { }

  ngOnInit(): void {
  }

}
