import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-answer-data5',
  templateUrl: './answer-data5.component.html',
  styleUrls: ['./answer-data5.component.css']
})
export class AnswerData5Component implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Strongly Disagree', 'Disagree', 'N/A', 'Agree', 'Strongly Agree'];
  public barChartType: ChartType = 'bar';
  public chartColors: Array<any> = [
    {
      backgroundColor: '#f3a760',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [3, 19, 12, 10, 5], label: 'Number of Reponses' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
