import { Component, OnInit } from '@angular/core';
import { InterviewService } from 'src/app/services/interview.service';
import { Interview } from 'src/app/services/interview';

@Component({
  selector: 'app-interview-list',
  templateUrl: './interview-list.component.html',
  styleUrls: ['./interview-list.component.scss']
})
export class InterviewListComponent implements OnInit {

  private interviewList: Interview[] = [];
  private filteredInterviewList: Interview[] = [];
  private listFilterVar = '';
  private reviewFilterVar = 'both';
  // private pageTitle = 'All Interviews';

  get listFilter(): string {
    return this.listFilterVar;
  }
  set listFilter(temp: string) {
    this.listFilterVar = temp;
    this.filteredInterviewList = (this.listFilterVar || this.reviewFilterVar !== 'both')
      ? this.performFilter(this.listFilterVar) : this.interviewList;
  }

  get reviewFilter(): string {
    return this.reviewFilterVar;
  }
  set reviewFilter(temp: string) {
    this.reviewFilterVar = temp;
    this.filteredInterviewList = this.reviewFilterVar
     ? this.performFilter(this.listFilterVar) : this.interviewList;
  }

  constructor(private interview: InterviewService) {}

  ngOnInit() {
    this.interviewList = this.interview.getInterviews2();
    this.filteredInterviewList = this.interviewList;
    console.log(this.filteredInterviewList);
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

  performFilter(filterBy: string): Interview[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.interviewList.filter((temp: Interview) =>
      (temp.associateEmail.toLocaleLowerCase().indexOf(filterBy) !== -1
        || temp.managerEmail.toLocaleLowerCase().indexOf(filterBy) !== -1
        || temp.place.toLocaleLowerCase().indexOf(filterBy) !== -1
        || temp.client.clientName.toLocaleLowerCase().indexOf(filterBy) !== -1
      )
      && (this.reviewFilterVar === 'both'
        || (this.reviewFilterVar === 'reviewed' && temp.reviewed != null)
        || (this.reviewFilterVar === 'notreviewed' && temp.reviewed == null)
      )
    );
  }

}
