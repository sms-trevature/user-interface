import { Component, OnInit, Inject } from '@angular/core';

import { NewInterviewService } from 'src/app/sms-client/clients/new-interview.service';
import { Cohort } from 'src/app/sms-client/dto/Cohort';

@Component({
  selector: 'app-new-interview',
  templateUrl: './new-interview.component.html',
  styleUrls: ['./new-interview.component.scss']
})
export class NewInterviewComponent implements OnInit {

  private dateSelection: Date;
  private minDate: Date;
  private time: Date = new Date();
  private showSpinners = false;
  private myCohorts: Cohort[];
  private cohortId: number;
  private dropdown2NotReady = true;


  private _values1 = [];
  private _values2 = [];

  constructor(private newInt: NewInterviewService) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());

  }

  ngOnInit() {
    this.newInt.findAllCohorts().subscribe(data => {
      this.myCohorts = data;
      console.log(this.myCohorts);
      for (let i = 0; i < this.myCohorts.length; i++) {
        this._values1.push(this.myCohorts[i].CName);
      }
    });
  }


  try() {

    console.log(this.dateSelection);

  }

  firstDropDownChanged(val: String): boolean {
    console.log(val);

    for (let j = 0; j < this.myCohorts.length; j++) {
      if (val == this.myCohorts[j].CName) {
        this.cohortId = this.myCohorts[j].cohortId;
        break;
      }
    }
    if (val == "Select Cohort") {
      this.dropdown2NotReady = true;
      this._values2.length = 0;
      return false;
    }
    this.newInt.findCohortUsers(this.cohortId).subscribe(userdata => {
      console.log(userdata);
      this._values2.length = 0;
      for (let k = 0; k < userdata.length; k++) {
        this._values2.push(`${userdata[k].firstName + " " + userdata[k].lastName}`);
      }
      this.dropdown2NotReady = false;

    })

    return true;
  }
}
