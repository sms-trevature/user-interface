import { Component, OnInit } from '@angular/core';
import { DaynoticeService } from 'src/app/services/daynotice.service';
import { Router } from '@angular/router';
import { DayNotice, ActualDayNotice } from 'src/app/sms-client/dto/DayNotice';

@Component({
  selector: 'app-daynotice-report',
  templateUrl: './daynotice-report.component.html',
  styleUrls: ['./daynotice-report.component.scss']
})
export class DaynoticeReportComponent implements OnInit {

  dayNoticeList: ActualDayNotice[];
  listFilterVar = '';
  dayNoticeListFilter: ActualDayNotice[];
  boolFilterVar = 'all';

  constructor(private dayNotice: DaynoticeService) { }

  get listFilter(): string {
    return this.listFilterVar;
  }
  set listFilter(temp: string) {
    this.listFilterVar = temp;
    this.dayNoticeListFilter = (this.listFilterVar) ?
      this.performFilter(this.listFilterVar) : this.dayNoticeList;
  }

  get reviewFilter(): string {
    return this.boolFilterVar;
  }
  set reviewFilter(temp: string) {
    this.boolFilterVar = temp;
    this.dayNoticeListFilter = this.boolFilterVar ?
      this.performFilter(this.listFilterVar) : this.dayNoticeList;
  }

  ngOnInit() {
   this.get24Hr();
  }

  get24Hr() {
    this.dayNotice.get24HrNotice().subscribe((data: ActualDayNotice[]) => {
      this.dayNoticeList = data;
     // this.dayNoticeList = this.filterByTrue();
      this.dayNoticeListFilter = data;
    });
  }


  filterByTrue(): ActualDayNotice[] {
    return this.dayNoticeList.filter((randomV: ActualDayNotice) => (randomV.twentyFourAssoc) == false);

  }

  performFilter(filterBy: string): ActualDayNotice[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.dayNoticeList.filter((temp: ActualDayNotice) =>
      (temp.assocEmail.toLocaleLowerCase().indexOf(filterBy) !== -1
        || temp.assocName.toLocaleLowerCase().indexOf(filterBy) !== -1) &&
         (this.boolFilterVar === 'all'
        || (this.boolFilterVar === 'true' && temp.twentyFourAssoc == true)
        || (this.boolFilterVar === 'false' && temp.twentyFourAssoc == false)
      )
    ); 
  }
}

