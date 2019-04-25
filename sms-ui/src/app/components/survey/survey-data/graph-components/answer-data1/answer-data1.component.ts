import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { SurveyDataService } from 'src/app/sms-client/clients/survey-data/survey-data.service';
import { SurveyResponses } from 'src/app/tables/survey-responses';

@Component({
  selector: 'app-answer-data1',
  templateUrl: './answer-data1.component.html',
  styleUrls: ['./answer-data1.component.css']
})
export class AnswerData1Component implements OnInit {
  surveyResponses: SurveyResponses[];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    }
  };
  public barChartLabels: Label[] = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6',
    'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12', 'Week 13', 'Week 14 or More'];
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

  public barChartData: ChartDataSets[] = [
    { data: [30, 20, 19, 18, 18, 18, 17, 16, 16, 16, 15, 15, 15], label: 'Number of Responses' }
  ];

  constructor(private surveyDataService: SurveyDataService) { }

  ngOnInit() {
    this.getResponses();
  }

  getResponses(): void {
    this.surveyDataService.getResponses().subscribe(
      surveyResponses => this.surveyResponses = surveyResponses);
  }


  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
