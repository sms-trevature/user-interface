import { Component, OnInit, Input } from '@angular/core';
import { SurveyHistory } from 'src/app/sms-client/dto/SurveyHistory';
import { SurveyHistoryService } from 'src/app/sms-client/clients/survey-history.serivce';

@Component({
  selector: 'app-survey-respondents',
  templateUrl: './survey-respondents.component.html',
  //template: `<app-survey-list (surveyId)='getSurveys($event)'></app-survey-list>`,
  styleUrls: ['./survey-respondents.component.scss']
})
export class SurveyRespondentsComponent implements OnInit {

  @Input() surveyId: number;

  listOfResp: SurveyHistory[];
  constructor(private surveyHistoryService: SurveyHistoryService) { }

  ngOnInit() {
    //Hard coded example to make sure connection is Correct
    // Currently a placeholder because I can't get event emitters to work here...
    this.surveyHistoryService.findBySurveyId(6).subscribe(
      data => {
        this.listOfResp = data;
        //console.log(data);
      }
    );
  }

  getSurveys(sId: number) {
    console.log('in getSurveys in survey-respondents component');
    this.surveyHistoryService.findBySurveyId(sId).subscribe(
      data => {
        this.listOfResp = data;
      }
    );
  }

}
