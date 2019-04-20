import { Component, OnInit } from '@angular/core';
import { FakeServiceComponent } from '../fake-service/fake-service.component';
import { Cohort } from '../sms-client/dto/Cohort';

@Component({
  selector: 'app-sub-man2-cohort',
  templateUrl: './sub-man2-cohort.component.html',
  styleUrls: ['./sub-man2-cohort.component.scss']
})
export class SubMan2CohortComponent implements OnInit {
  _listFilter = '';

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(temp: string) {
    this._listFilter = temp;
    this.filteredCohort = this._listFilter ? this.performFilter(this._listFilter) : this.allCohorts;
  }
  wholeName = '';
  allCohorts: Cohort[] = [];
  filteredCohort: Cohort[] = [];

  constructor(private _fakeService: FakeServiceComponent) {

    this.filteredCohort =
      this._fakeService.getCohorts();

    this.allCohorts = this.filteredCohort;
  }
  performFilter(filterBy: string): Cohort[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.allCohorts.filter((metaEmployee: Cohort) =>
      metaEmployee.CName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  ngOnInit() {
  }
  //getCohorts()


}
