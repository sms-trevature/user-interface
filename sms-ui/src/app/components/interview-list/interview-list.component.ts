import { Component, OnInit } from '@angular/core';
import { InterviewService } from 'src/app/services/interview.service';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.scss']
})
export class InterviewListComponent implements OnInit {

  private interviewList;
  private filteredInterviewList;
  constructor(private interview: InterviewService) {
    this.interviewList = this.interview.getInterviews2();
    this.filteredInterviewList = this.interviewList;
    console.log(this.filteredInterviewList);
  }

  ngOnInit() {
  }

  buttonClicked() {
    /* this.interview.getInterviews().subscribe(
      data => {
        console.log(data);
      }
    ); */

    this.interviewList = this.interview.getInterviews2();
    this.filteredInterviewList = this.interviewList;
    console.log(this.filteredInterviewList);
  }

}
