import { Component, OnInit } from '@angular/core';
import { DayNotice } from 'src/app/sms-client/dto/DayNotice';
import { DaynoticeService } from 'src/app/services/daynotice.service';

@Component({
  selector: 'app-feedback-report',
  templateUrl: './feedback-report.component.html',
  styleUrls: ['./feedback-report.component.scss']
})
export class FeedbackReportComponent implements OnInit {

  feedbackList: DayNotice[];
  feedbackListFilter: DayNotice[];
  listFilterVar = '';
 

  constructor(private dayNotice: DaynoticeService) { }

  get listFilter(): string {
    return this.listFilterVar;
  }
  set listFilter(temp: string) {
    this.listFilterVar = temp;
    this.feedbackListFilter = (this.listFilterVar) ?
      this.performFilter(this.listFilterVar) : this.feedbackList;
  }

  ngOnInit() {
   this.getAllInterviews();
  }

  getAllInterviews() {
    this.dayNotice.getAllInterviews().subscribe((data: DayNotice[]) => {
      this.feedbackList = data;
      this.feedbackListFilter = data;

    });
  }

  performFilter(filterBy: string): DayNotice[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.feedbackList.filter((temp: DayNotice) =>
      (temp.associateEmail.toLocaleLowerCase().indexOf(filterBy) !== -1
        || temp.place.toLocaleLowerCase().indexOf(filterBy) !== -1
      )
    ); 
  }

  
}
