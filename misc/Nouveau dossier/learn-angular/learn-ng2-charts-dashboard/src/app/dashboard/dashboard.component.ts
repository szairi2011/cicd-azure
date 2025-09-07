import { ScoreCardItem } from './../score-card/score.card.item';
import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row for a handset footprint */
  cardLayout$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    // tap((result) => console.log(result.breakpoints)),
    map(({ matches }) => {
      if (matches) {
        return {
          columns: 1,
          cards: { cols: 1, rows: 1 },
          charts: { cols: 1, rows: 2 },
          table: { cols: 1, rows: 4 }
        }
      }

      return {
        columns: 4,
        cards: { cols: 1, rows: 1 },
        charts: { cols: 2, rows: 2 },
        table: { cols: 4, rows: 4 }
      }
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) { }

  score_cards: ScoreCardItem[] = [
    {
      title: 'Total Sales',
      icon: 'money',
      isCurrency: true,
      value: 10567,
      color: 'primary',
      isIncrease: true,
      percentValue: 34.95,
      duration: 'since last month'
    },
    {
      title: 'Average Order Value',
      icon: 'attach_money',
      isCurrency: true,
      value: 452.87,
      color: 'warn',
      isIncrease: false,
      percentValue: 56.21,
      duration: 'since last month'
    },
    {
      title: 'Total Orders',
      icon: 'shopping_cart',
      isCurrency: false,
      value: 198,
      color: 'accent',
      isIncrease: true,
      percentValue: 21.59,
      duration: 'since last month'
    },
    {
      title: 'Returning Customers',
      icon: 'people',
      isCurrency: false,
      value: 27,
      color: 'primary',
      isIncrease: false,
      percentValue: 12.76,
      duration: 'since last month'
    }
  ]
}
