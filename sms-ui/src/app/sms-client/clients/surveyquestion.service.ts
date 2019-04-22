import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SurveyQuestion } from '../dto/surveyQuestion';

@Injectable({
  providedIn: 'root'
})
export class SurveyQuestionService {

  constructor(private http: HttpClient) { }

  private context = 'survey-service/junction_survey_questions';

getTemplate(surveyId: number): Observable<SurveyQuestion[]> {
    return this.http.get<SurveyQuestion[]>(`${this.context}/surveyId/${surveyId}`);
  }
}
