import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cohort } from '../dto/Cohort';
import { Observable } from 'rxjs';
import { User } from '../dto/User';

@Injectable({
  providedIn: 'root'
})
export class NewInterviewService {

  constructor(private http:HttpClient) { 
    
  }
  private context = 'cohorts';

  findAllCohorts():  Observable<Cohort[]>{
    return this.http.get<Cohort[]>(`${this.context}`);
  }
  findCohortUsers(cId:number): Observable<User[]>{
    return this.http.get<User[]>(`users/${this.context}/${cId}`) ;
  }

}
