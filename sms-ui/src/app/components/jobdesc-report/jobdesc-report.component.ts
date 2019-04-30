import { Component, OnInit } from '@angular/core';
import { DaynoticeService } from 'src/app/services/daynotice.service';
import { DaynoticeReportComponent } from '../daynotice-report/daynotice-report.component';
import { DayNotice } from 'src/app/sms-client/dto/DayNotice';


@Component({
  selector: 'app-jobdesc-report',
  templateUrl: './jobdesc-report.component.html',
  styleUrls: ['./jobdesc-report.component.scss']
})
export class JobdescReportComponent implements OnInit {

  descProvidedList: DayNotice[];
  listFilterVar = '';
  descProvidedListFilter: DayNotice[];

  constructor(private interview: DaynoticeService) { }

  get listFilter(): string {
    return this.listFilterVar;
  }
  set listFilter(temp: string) {
    this.listFilterVar = temp;
    this.descProvidedListFilter = (this.listFilterVar) ?
      this.performFilter(this.listFilterVar) : this.descProvidedList;
  }
  ngOnInit() {
    this.getAllInterviews();

  }

  getAllInterviews() {
    this.interview.getAllInterviews().subscribe((data: DayNotice[]) => {
      this.descProvidedList = data;
      this.descProvidedListFilter = data;
    });
  }

  performFilter(filterBy: string): DayNotice[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.descProvidedList.filter((temp: DayNotice) =>
      (temp.associateEmail.toLocaleLowerCase().indexOf(filterBy) !== -1
        || temp.place.toLocaleLowerCase().indexOf(filterBy) !== -1
      )
    ); 
  }
}
