import { Component, OnInit } from '@angular/core';
import { SurveyHistory } from 'src/app/sms-client/dto/SurveyHistory';
import { SurveyHistoryService } from 'src/app/sms-client/clients/survey-history.serivce';

@Component({
  selector: 'app-survey-respondents',
  templateUrl: './survey-respondents.component.html',
  styleUrls: ['./survey-respondents.component.scss']
})
export class SurveyRespondentsComponent implements OnInit {

  listOfSurvey: SurveyHistory[];
  constructor(private surveyHistoryService: SurveyHistoryService) { }

  ngOnInit() {
    this.surveyHistoryService.findBySurveyId(4).subscribe(
      data => {
        // data[i].dateCreated = new Date(data[i].dateCreated);
        // data[i].closingDate = new Date(data[i].closingDate);
        this.listOfSurvey = data;
      }
    );
  }

  getSurveys(sId: number) {
    this.surveyHistoryService.findBySurveyId(4).subscribe(
      data => {
        // data[i].dateCreated = new Date(data[i].dateCreated);
        // data[i].closingDate = new Date(data[i].closingDate);
        this.listOfSurvey = data;
      }
    );
  }

}
