import { Component, OnInit } from '@angular/core';
import { SomeAssociate } from '../sms-client/dto/Employees';
import { FakeServiceComponent } from '../fake-service/fake-service.component';
import { Button } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Address } from '../sms-client/dto/Address';
import { VirtualAction } from 'rxjs';
import { status } from '../sms-client/dto/Status';


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

  virtualStatus;
  wholeName = '';
  addressList;
  closeResult: string;
  allAssociates: SomeAssociate[] = [];
  filteredEmployees: SomeAssociate[] = [];
  globalFart: string = '';
  returnableDataVariable;
  ngswitchCase = '';
  private returnableRoleValue = '';
  private lastCell: any;
  private returnableEmailValue = '';
  private returnableButton = document.createElement('button') as HTMLButtonElement;
  constructor(private _fakeService: FakeServiceComponent, private http: HttpClient, private modalService: NgbModal) {
    this.http.get('users').toPromise().then(data => {

      let objIndex = 0;
      while (data[objIndex] != null || data[objIndex] != undefined) {
        console.log("any shit happening here? ");
        this.filteredEmployees.push(data[objIndex]);

        objIndex++;
      }
      // this.filteredEmployees = this.returnableDataVariable;
      // console.log(' TEST MC TEST ;  ' + data[1].firstName);

    });

    this.allAssociates = this.filteredEmployees;
    //    console.log("filtered employees even " + this.filteredEmployees[1] + "- variable of object: " + this.filteredEmployees[1].firstName );
    // console.log("inside all associates: " + this.allAssociates[1]+"- first namne: " + this.allAssociates[1].firstName); 
  }

  ngOnInit() {

    this.http.get('user-service/addresses/is-training-location/true').toPromise().then(data => {
      this.addressList = data;
    })

  }
  
  generalStatus() {
    console.log("general status change");
    const controlFlow = document.getElementById('GeneralSelection') as HTMLSelectElement;
    let index = controlFlow.selectedIndex;
    let opt = controlFlow.options[index];
    const specst2 = document.getElementById('specificStatusElmnt2') as HTMLDivElement;
    const specst1 = document.getElementById('specificStatusElmnt1') as HTMLDivElement;

    if (opt.value == 'Training') {
      specst1.style.display = "block";
      specst2.style.display = "none";
    } else {

      specst1.style.display = "none";
      specst2.style.display = "block";
    }
  }
  specStatus() {
    console.log("change");

  }
  checkboxChecked() {
    console.log("virtual status toggled");
    if (this.virtualStatus == null || this.virtualStatus == false) {
      this.virtualStatus = true;

    } else {
      this.virtualStatus = false;

    }

  }
  dispalyPAddress() {
    const personalAdd = document.getElementById('pAddress') as HTMLDivElement;
    personalAdd.style.display = "block";
    const hidePadd = document.getElementById('hideBut') as HTMLButtonElement;
    hidePadd.style.display = "block";
    const showAd = document.getElementById('showP') as HTMLButtonElement;
    showAd.style.display = "none";

  }
  hidePAddress() {
    const personalAdd = document.getElementById('pAddress') as HTMLDivElement;
    personalAdd.style.display = "none";
    const hidePadd = document.getElementById('hideBut') as HTMLButtonElement;
    hidePadd.style.display = "none";
    const showAd = document.getElementById('showP') as HTMLButtonElement;
    showAd.style.display = "block";
  }
  open(content) {
    this.ngswitchCase = 'addAssociate'
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.ngOnInit();
    });
  }
  addAssociate(associate: NgForm) {
    console.log("value test: " + associate.value['dp1']);
    const fName = associate.value['dp1'];
    const lName = associate.value['dp2'];
    const email = associate.value['dp3'];
    const phone = associate.value['dp4'];
    const TrainLocation = associate.value['location'];
    const GeStatus = associate.value['status'];
    const Spstatus = associate.value['SpecStatus'];
    const check = this.virtualStatus;
    const role = associate.value['Role'];
    let id = 0;
    if (GeStatus == 'Training') {
      if (Spstatus == 'Dropped') {
        id = 1;
      } else if (Spstatus == 'Training') {
        id = 2;
      } else if (Spstatus == 'Complete') {
        id = 3;
      }
    } else if (GeStatus == 'Staging' && check == false) {
      if (Spstatus == 'Staging') {
        id = 4;
      } else if (Spstatus == 'Bench') {
        id = 5;
      } else if (Spstatus == 'Waiting for Paperwork') {
        id = 6;
      } else if (Spstatus == 'Confirmed') {
        id = 7;
      } else if (Spstatus == 'Project Started') {
        id = 8;
      } else if (Spstatus == 'Paused') {
        id = 9;
      } else if (Spstatus == 'Panel') {
        id = 10;
      }

    } else if (GeStatus == 'Staging' && check == true) {
      if (Spstatus == 'Training') {
        id = 11;
      } else if (Spstatus == 'Bench') {
        id = 12;
      } else if (Spstatus == 'Waiting for Paperwork') {
        id = 13;
      } else if (Spstatus == 'Confirmed') {
        id = 14;
      } else if (Spstatus == 'Project Started') {
        id = 15;
      } else if (Spstatus == 'Paused') {
        id = 16;
      } else if (Spstatus == 'Panel Pending') {
        id = 17;
      }

    }

    let body = {
      'userId': 0,
      'firstName': fName,
      'lastName': lName,
      'email': email,
      'phoneNumber': phone,
      'trainingAddress': TrainLocation,
      'personalAddress': '',
      'userStatus': '' + id
    }
    // this.http.post(`cohorts/cohort/trainer/${associate.value['trainer']}`, body).toPromise().then(data => {
    // })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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
  editRole(email) {
    let selectedInquiry = document.getElementById(this.returnableEmailValue) as HTMLDataListElement;
    console.log("when nothign is slectec: " + selectedInquiry); //test-
    const grabDataCell = document.getElementById(email) as HTMLDataListElement;

    if (selectedInquiry !== null) {
      selectedInquiry.appendChild(this.returnableButton);
      while (selectedInquiry.firstChild) {

        selectedInquiry.removeChild(selectedInquiry.firstChild);
      }
      selectedInquiry.appendChild(this.returnableButton);
      this.returnableButton = grabDataCell.firstChild as HTMLButtonElement;
    } else {
      this.returnableButton = grabDataCell.firstChild as HTMLButtonElement;
    }


    console.log("email of user: " + email);
    //  const grabDataCell = document.getElementById(email) as HTMLDataListElement;
    let currentRole: string;
    const childButton = grabDataCell.firstChild as HTMLButtonElement;
    currentRole = childButton.innerText;
    //--This value is used later to return the previous role when a new selection is made - 
    this.returnableRoleValue = childButton.innerText;
    //this keeps track of the last selection - 
    this.returnableEmailValue = email;
    //--
    console.log("the button currently holds: " + childButton.innerHTML);
    while (grabDataCell.firstChild) {
      currentRole = grabDataCell.firstChild.textContent;
      grabDataCell.removeChild(grabDataCell.firstChild);
    }
    const NewRole = document.createElement('select') as HTMLSelectElement;
    NewRole.onchange = this.changeRole;
    NewRole.setAttribute('id', 'selectedRoleRow');
    NewRole.setAttribute('class', email);
    const optAdmin = document.createElement('option') as HTMLOptionElement;
    optAdmin.textContent = "Admin";
    const optStagingM = document.createElement('option') as HTMLOptionElement;
    optStagingM.textContent = "Staging Managers";
    const optAssociate = document.createElement('option') as HTMLOptionElement
    optAssociate.textContent = "Associate";
    const optTrainer = document.createElement('option') as HTMLOptionElement;
    optTrainer.textContent = "Trainer";
    //cycle until we find the current role and make that one first - 
    let ArrayOfOptions = [optAdmin, optStagingM, optAssociate, optTrainer];
    let ArrayOfNoneCurrentOptions = new Array;
    ArrayOfOptions.forEach(PossibleFirstOptionElement => {
      //too short
      PossibleFirstOptionElement.innerText = PossibleFirstOptionElement.innerText + " ";
      console.log("inside foreach: " + PossibleFirstOptionElement.textContent.length);
      console.log('against..');
      console.log(" - " + currentRole.length);
      if (PossibleFirstOptionElement.innerText.length == childButton.innerText.length) {
        console.log("current option should be " + PossibleFirstOptionElement.textContent);
        NewRole.appendChild(PossibleFirstOptionElement);//append the current one so that it shows first - 
      } else {
        ArrayOfNoneCurrentOptions.push(PossibleFirstOptionElement);
        //should result in three that we have not appendd yet - 
      }
    });
    ArrayOfNoneCurrentOptions.forEach(OptionElement => {
      NewRole.appendChild(OptionElement);
    });


    grabDataCell.appendChild(NewRole);
    // a service is needed to update user info by the email assocaited with their row - 
  }
  changeRole() {

    const newSpot = document.getElementById('selectedRoleRow') as HTMLSelectElement;
    const emailIdentifier = newSpot.className;
    let index = newSpot.selectedIndex;
    let opt = newSpot.options[index];
    //this values will be used to update the user's role per their email as the identifier.. 
    console.log("role has been changed to " + opt.value + " for:" + emailIdentifier);//onChange test -
  }

  inputNewRole() {
    //how to enter on 'enter' key
    //myInputElement.addEventListener('keyup', this.inputNewRole);
    console.log("enterkey pressed");

  }
}

