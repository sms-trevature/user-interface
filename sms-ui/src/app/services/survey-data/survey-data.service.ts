import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { SurveyResponses } from 'src/app/tables/survey-responses';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SurveyDataService {

  private responseUrl = 'survey-responses';
  constructor(
    private http: HttpClient,
  ) { }

getResponses(): Observable<SurveyResponses[]> {
  return this.http.get<SurveyResponses[]>(this.responseUrl)
  .pipe(
    catchError(this.handleError<SurveyResponses[]>('getResponses', [])));
}

private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.log(error);
    console.log('failed to retrieve responses from database');
    return of(result as T);
  };
}

}
