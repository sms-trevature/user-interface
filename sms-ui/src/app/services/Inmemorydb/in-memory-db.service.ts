import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { SurveyResponses } from 'src/app/tables/survey-responses';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDatabaseService implements InMemoryDbService {

  createDb() {
    const responses = [
      {
        id: 8,
        userEmail: 'IssaEmail@AOl.com',
        surveyId: '8',
        answerId: '2'
      }
    ];
    return {responses};
  }

  constructor() { }
}
