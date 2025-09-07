import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexStroke, ApexTitleSubtitle, ApexXAxis, ApexYAxis } from "ng-apexcharts";

export interface ApexChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
  grid: ApexGrid;
  tooltip: any;
  colors: string[];
  fill: ApexFill;

}
