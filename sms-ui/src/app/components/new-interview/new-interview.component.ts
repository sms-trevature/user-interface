import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-interview',
  templateUrl: './new-interview.component.html',
  styleUrls: ['./new-interview.component.scss']
})
export class NewInterviewComponent implements OnInit {

  dateSelection:Date;
  minDate: Date;
  constructor() {
     this.minDate= new Date();
     this.minDate.setDate(this.minDate.getDate());
  }

  ngOnInit() {
  }

  try(){

    console.log(this.dateSelection);
  
  }
}
