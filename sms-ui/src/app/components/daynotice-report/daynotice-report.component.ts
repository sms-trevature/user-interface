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

  constructor(private dayNotice: DaynoticeService) { }

  get listFilter(): string {
    return this.listFilterVar;
  }
  set listFilter(temp: string) {
    this.listFilterVar = temp;
    this.dayNoticeListFilter = (this.listFilterVar) ?
      this.performFilter(this.listFilterVar) : this.dayNoticeList;
  }

  ngOnInit() {
   this.get24Hr();
  }

  get24Hr() {
    this.dayNotice.get24HrNotice().subscribe((data: ActualDayNotice[]) => {
      this.dayNoticeList = data;
      this.dayNoticeList = this.filterByTrue();
    });
  }


  filterByTrue(): ActualDayNotice[] {
    return this.dayNoticeList.filter((randomV: ActualDayNotice) => (randomV.twentyFourAssoc) == false);

  }
    // {
    //   if (randomV.associateInput.dayNotice == null) {
    //     document.getElementById('Notice').innerHTML = 'N/A';
    //   } else {
    //     randomV.associateInput.dayNotice == true;
    //   }
    // }
    // )};


  performFilter(filterBy: string): ActualDayNotice[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.dayNoticeList.filter((temp: ActualDayNotice) =>
      (temp.assocEmail.toLocaleLowerCase().indexOf(filterBy) !== -1
        || temp.assocName.toLocaleLowerCase().indexOf(filterBy) !== -1
      )
    );
  }
}

