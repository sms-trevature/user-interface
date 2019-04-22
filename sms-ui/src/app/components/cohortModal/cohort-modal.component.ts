import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Cohort } from 'src/app/sms-client/dto/Cohort';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/sms-client/dto/User';

@Component({
  selector: 'app-cohort-modal',
  templateUrl: './cohort-modal.component.html',
  styleUrls: ['./cohort-modal.component.scss']
})
export class CohortModalComponent implements OnInit{
 

  @Input() cohort: Cohort;
  userList;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAssociates(this.cohort.cohortId).toPromise().then(data => {
      this.userList = data;
    });

  }

  getAssociates(id: number) {
    return this.http.get(`/users/cohorts/${id}`)
  }

}
