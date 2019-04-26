import { Component, OnInit } from '@angular/core';
import { DaynoticeService } from 'src/app/services/daynotice.service';

@Component({
  selector: 'app-jobdesc-report',
  templateUrl: './jobdesc-report.component.html',
  styleUrls: ['./jobdesc-report.component.scss']
})
export class JobdescReportComponent implements OnInit {

  constructor(private interview: DaynoticeService) { }

  ngOnInit() {
  }

}
