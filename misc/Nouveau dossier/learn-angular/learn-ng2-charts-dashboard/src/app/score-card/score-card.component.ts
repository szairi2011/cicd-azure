import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.scss']
})
export class ScoreCardComponent implements OnInit {

  @Input() title: string;
  @Input() icon: string;
  @Input() isCurrency: boolean;
  @Input() value: number;
  @Input() color: string;
  @Input() isIncrease: boolean;
  @Input() percentValue: number;
  @Input() duration: string;


  constructor() { }

  ngOnInit(): void {
  }

}
