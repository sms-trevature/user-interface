import { Component, OnInit } from '@angular/core';
import { SurveyHistory } from 'src/app/sms-client/dto/SurveyHistory';

@Component({
  selector: 'app-survey-respondents',
  templateUrl: './survey-respondents.component.html',
  styleUrls: ['./survey-respondents.component.scss']
})
export class SurveyRespondentsComponent implements OnInit {

  listOfSurvey: SurveyHistory[];
  constructor() { }

  ngOnInit() {
  }

}
