import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-new-interview',
  templateUrl: './new-interview.component.html',
  styleUrls: ['./new-interview.component.scss']
})
export class NewInterviewComponent implements OnInit {

  dateSelection:Date;
  minDate: Date;
  time: Date = new Date();
  showSpinners = false;
  private _values1 = ["1", "2", "3"];
  private _values2 = [];

  constructor() {
     this.minDate= new Date();
     this.minDate.setDate(this.minDate.getDate());
  
  }

  ngOnInit() {

  }

 
  try(){

    console.log(this.dateSelection);
  
  }

  firstDropDownChanged(val: any) {
    console.log(val);

    if (val == "1") {
      this._values2 = ["1.1", "1.2", "1.3"];
    }
    else if (val == "2") {
      this._values2 = ["2.1", "2.2", "2.3"];
    }
    else if (val == "3") {
      this._values2 = ["3.1", "3.2", "3.3"];
    }
    else {
      this._values2 = [];
    }
  }
}
