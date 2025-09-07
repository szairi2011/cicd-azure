import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <app-sidebar></app-sidebar>
      <app-dashboard></app-dashboard>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      height: 100vh;
      background-color: #f5f3f0;
    }
  `]
})
export class AppComponent { }