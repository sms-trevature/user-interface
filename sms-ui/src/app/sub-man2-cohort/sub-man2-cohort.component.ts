import { Component, OnInit } from '@angular/core';
import { FakeServiceComponent } from '../fake-service/fake-service.component';
import { Cohort } from '../sms-client/dto/Cohort';
import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sub-man2-cohort',
  templateUrl: './sub-man2-cohort.component.html',
  styleUrls: ['./sub-man2-cohort.component.scss']
})
export class SubMan2CohortComponent implements OnInit {
  _listFilter = '';
  closeResult: string;

  get listFilter(): string {
    return this._listFilter;
  }
  modalShow=false
  exportedCohort: Cohort;
  display='none'

  openModal(name: string) {
    for (let temp of this.filteredCohort) {
      if (temp['cohortName'] == name) {
        this.exportedCohort = temp;
        this.modalShow = true;
        this.display='block'
      }
    }
  }


  set listFilter(temp: string) {
    this._listFilter = temp;
    this.filteredCohort = this._listFilter ? this.performFilter(this._listFilter) : this.allCohorts;
  }
  wholeName = '';
  allCohorts: Cohort[] = [];
  filteredCohort;

  constructor(private _fakeService: FakeServiceComponent, private http: HttpClient, private modalService: NgbModal) {

    // this.filteredCohort =
    // this._fakeService.getCohorts();

    this.allCohorts = this.filteredCohort;
  }
  performFilter(filterBy: string): Cohort[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.allCohorts.filter((metaEmployee: Cohort) =>
      metaEmployee['cohortName'].toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  ngOnInit() {
    this.http.get('cohorts').toPromise().then(data => {
      this.filteredCohort = data;
      this.allCohorts = this.filteredCohort;
      this.exportedCohort=data[1];
    })
  }
  closeModal(){
    this.modalShow=false;
    this.display='none'
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  //getCohorts()


}
