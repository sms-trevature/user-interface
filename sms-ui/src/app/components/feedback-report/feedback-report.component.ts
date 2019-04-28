import { Component, OnInit } from '@angular/core';
import { DayNotice } from 'src/app/sms-client/dto/DayNotice';
import { DaynoticeService } from 'src/app/services/daynotice.service';

@Component({
  selector: 'app-feedback-report',
  templateUrl: './feedback-report.component.html',
  styleUrls: ['./feedback-report.component.scss']
})
export class FeedbackReportComponent implements OnInit {

  _id = 0;
  _associateEmail = '';
  _place = '';

  feedbackYesList: DayNotice[];
  feedbackNoList: DayNotice[];
 

  constructor(private dayNotice: DaynoticeService) { }

  get id(): number {
    return this._id;
  }

  set id(temp: number) {
    this._id = temp;
  }

  get associateEmail(): string {
    return this._associateEmail;
  }

  set associateEmail(temp: string) {
    this._associateEmail = temp;
  }

  get place(): string {
    return this._place;
  }

  set place(temp: string) {
    this._place = temp;
  }

  ngOnInit() {
   this.getAllInterviews();
  }

  getAllInterviews() {
    this.dayNotice.getAllInterviews().subscribe((data: DayNotice[]) => {
      this.feedbackYesList = data;
      this.feedbackNoList = data;
<<<<<<< HEAD
      this.feedbackYesList = this.filterByRequested();
=======
     // this.feedbackYesList = this.filterByRequested();
>>>>>>> 75a1661945d398017d5ed1bfefae1473d35ee418
      this.feedbackNoList = this.filterByNotRequested();

    });
  }

<<<<<<< HEAD
  filterByRequested(): DayNotice[] {
    console.log("inside of requested");
    return this.feedbackYesList.filter((randomV: DayNotice) => (randomV.feedback.feedbackRequested) == null);
  }
=======
 /*  filterByRequested(): DayNotice[] {
    console.log("inside of requested");
    return this.feedbackYesList.filter((randomV: DayNotice) => (randomV.feedback.feedbackRequested) == null);
  } */
>>>>>>> 75a1661945d398017d5ed1bfefae1473d35ee418

  filterByNotRequested(): DayNotice[] {
    console.log("inside of not requested");
    return this.feedbackNoList.filter((randomV: DayNotice) => (randomV.feedback) == null);
  }
}
