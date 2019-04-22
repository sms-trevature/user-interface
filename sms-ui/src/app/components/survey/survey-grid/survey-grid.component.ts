import { Component, OnInit } from '@angular/core';
import { Isurvey } from './survey-grid';

@Component({
  selector: 'app-survey-grid',
  templateUrl: './survey-grid.component.html',
  styleUrls: ['./survey-grid.component.css']
})
export class SurveyGridComponent implements OnInit {
  Iservey: Isurvey[] = [];
  constructor() {

    this. Iservey = [
      {
          Title: 'Math Survey',
          Description: 'A survey for traning Feedback',
          DateCreated: 'thu FEB 28 2019',
      },
      {
        Title: 'Staging Manager Evalution',
        Description: 'A servey for associates in staging to evaluate the staging manager.',
        DateCreated: 'Thu March 11 2019',
    },
    {
      Title: 'Frozone',
      Description: 'this servey was hard',
      DateCreated: 'cold generation',
  },
    ];
}

  ngOnInit() {
  }

}
