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

  constructor(private interview: DaynoticeService) { }

  ngOnInit() {
    this.getAllInterviews();

  }

  getAllInterviews() {
    this.interview.getAllInterviews().subscribe((data: DayNotice[]) => {
      this.descProvidedList = data;
    });
  }
}
