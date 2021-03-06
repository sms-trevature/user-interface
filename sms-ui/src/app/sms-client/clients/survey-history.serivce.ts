import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../dto/User';
import { Survey } from '../dto/Survey';
import { Observable } from 'rxjs';
import { SurveyQuestion } from '../dto/surveyQuestion';
import { SurveyHistory } from '../dto/SurveyHistory';

@Injectable({
  providedIn: 'root'
})
export class SurveyHistoryService {

  constructor(private http: HttpClient) { }

  private context = 'survey-service/history';

  findByEmail(email: string): Observable<SurveyHistory[]> {
    return this.http.post<SurveyHistory[]>(`${this.context}/email`, email);
  }
  // Observable to find every survey deployed under a particular id
  findBySurveyId(sId: number): Observable<SurveyHistory[]> {
    return this.http.get<SurveyHistory[]>(`${this.context}/survey/${sId}`);
  }
}
