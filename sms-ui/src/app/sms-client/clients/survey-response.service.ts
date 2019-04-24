import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Responses } from '../dto/Response';
@Injectable({
  providedIn: 'root'
})
export class SurveyResponseService {

  constructor(private http: HttpClient) { }

  private context = 'survey-service/responses';


  findBySurveyId(surveyId: number): Observable<Responses[]> {
    return this.http.get<Responses[]>(`${this.context}/surveyId/${surveyId}`);
  }

}
