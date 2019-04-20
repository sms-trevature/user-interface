import { Component, OnInit } from '@angular/core';
import { SomeAssociate } from '../sms-client/dto/Employees';
import { FakeServiceComponent } from '../fake-service/fake-service.component';


@Component({
  selector: 'app-mngr-sub-associates',
  templateUrl: './mngr-sub-associates.component.html',
  styleUrls: ['./mngr-sub-associates.component.scss']
})


export class MngrSubAssociatesComponent implements OnInit {
  _listFilter = '';

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(temp: string) {
    this._listFilter = temp;
    this.filteredEmployees = this._listFilter ? this.performFilter(this._listFilter) : this.allAssociates;
  }
  wholeName = '';
  allAssociates: SomeAssociate[] = [];
  filteredEmployees: SomeAssociate[] = [];
  globalFart: string = '';


  constructor(private _fakeService: FakeServiceComponent) {

    this.filteredEmployees =
      this._fakeService.getEmployees();

    this.allAssociates = this.filteredEmployees;
  }

  ngOnInit() {
  }

  performFilter(filterBy: string): SomeAssociate[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.allAssociates.filter((metaEmployee: SomeAssociate) =>
      (metaEmployee.firstName.toLocaleLowerCase().concat(metaEmployee.lastName.toLocaleLowerCase())).indexOf(filterBy) !== -1);
  }
  optionSelect() {
    let e = (document.getElementById('selectElement')) as HTMLSelectElement;
    let index = e.selectedIndex;
    // console.log('index: ' + index);//test
    let opt = e.options[index];
    let value = opt.value;
    if (value !== 'All') {
      console.log('VALUE: ' + value);//test
      this.filteredEmployees = this.allAssociates.filter((metaEmployee: SomeAssociate) =>
        metaEmployee.role == value);

    } else {
      this.filteredEmployees = this.allAssociates;
    }
  }
}

