import { Component, OnInit, Input } from '@angular/core';
import { Label, SingleDataSet } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-daynotice-graph',
  templateUrl: './daynotice-graph.component.html',
  styleUrls: ['./daynotice-graph.component.scss']
})
export class DaynoticeGraphComponent implements OnInit {
  @Input() inputAnswers: string[];
  @Input() inputCounts: number[];



  public doughnutChartLabels: Label[];
  public doughnutChartData: SingleDataSet;
  public doughnutChartType = 'doughnut';

  constructor() { }

  ngOnInit() {

    this.doughnutChartLabels= this.inputAnswers;
    this.doughnutChartData = this.inputCounts;
  }

}
