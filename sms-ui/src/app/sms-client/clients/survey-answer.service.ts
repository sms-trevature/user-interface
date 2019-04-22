import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Answer } from '../dto/Answer';
@Injectable({
  providedIn: 'root'
})
export class SurveyAnswerService {

  constructor(private http: HttpClient) { }

  private context = 'survey-service/answers';


  findByQuestionId(qId: number): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.context}/question/${qId}`);
  }

}
