import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-progress-chart',
  templateUrl: './progress-chart.component.html',
  styleUrls: ['./progress-chart.component.scss']
})
export class ProgressChartComponent implements OnInit {
  completionPercentage: number = 0;
  
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTaskData();
  }

  loadTaskData(): void {
    this.taskService.getTasks().subscribe(tasks => {
      const totalTasks = tasks.length;
      const completedTasks = tasks.filter(task => task.completed).length;
      
      this.completionPercentage = totalTasks > 0 
        ? (completedTasks / totalTasks) * 100 
        : 0;
        
      this.createChart(completedTasks, totalTasks - completedTasks);
    });
  }

  createChart(completed: number, remaining: number): void {
    const data = {
      datasets: [{
        data: [completed, remaining],
        backgroundColor: ['#FFC978', '#F0F0F0'],
        borderWidth: 0,
        cutout: '80%'
      }]
    };
    
    const config: ChartConfiguration = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    };
    
    new Chart('progressChart', config);
  }
}
