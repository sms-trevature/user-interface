import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Cohort } from 'src/app/sms-client/dto/Cohort';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/sms-client/dto/User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cohort-modal',
  templateUrl: './cohort-modal.component.html',
  styleUrls: ['./cohort-modal.component.scss']
})
export class CohortModalComponent implements OnInit {

  @Input() cohort: Cohort;
  userList;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAssociates(this.cohort.cohortId).toPromise().then(data => {
      this.userList = data;
    });

  }
  emailSubmit(associateEmail: NgForm) {
    this.http.post(`cohorts/token/${this.cohort['cohortToken']}`, {
      'email': associateEmail.value['cohortEmail'],
    }).toPromise().then(data => {
      console.log(data)
    })
  }

  removeUserFromCohort(email:string) {
    console.log(email)
    this.http.post(`cohorts/removeuser/${this.cohort['cohortToken']}`, {
      'email': email,
    }).toPromise().then(data => {
      console.log(data)
    })
  }

  getAssociates(id: number) {
    return this.http.get(`/users/cohorts/${id}`)
  }

}
