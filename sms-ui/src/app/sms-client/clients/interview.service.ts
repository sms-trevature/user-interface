import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Interview } from '../dto/Interview';
import { AssociateInterviewCount } from '../dto/AssociateInterviewCount';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  private urlVar = 'interview-service/interview';

  constructor(private httpCli: HttpClient) { }

  getInterviews(): Observable<Interview[]> {
    return this.httpCli.get<Interview[]>(`${this.urlVar}`);
  }

  getInterviewCounts(): Observable<AssociateInterviewCount[]> {
    return this.httpCli.get<AssociateInterviewCount[]>(`${this.urlVar}/reports/InterviewsPerAssociate`);
  }
}
