import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-answer-data2',
  templateUrl: './answer-data2.component.html',
  styleUrls: ['./answer-data2.component.css']
})
export class AnswerData2Component implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['YES', 'NO'];
  public pieChartData: Array<any> = [20, 5];
  public pieChartType: ChartType = 'pie';
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#f3a760', 'light-gray'],
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() { }

  ngOnInit() {
  }

}
