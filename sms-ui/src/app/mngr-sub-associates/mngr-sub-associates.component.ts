import { Component, OnInit } from '@angular/core';
import { SomeAssociate } from '../sms-client/dto/Employees';
import { FakeServiceComponent } from '../fake-service/fake-service.component';
import { Button } from 'protractor';
import { HttpClient } from '@angular/common/http';


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
  returnableDataVariable; 

  private returnableRoleValue = '';
  private lastCell: any;  
  private returnableEmailValue = '';
  private returnableButton = document.createElement('button') as HTMLButtonElement;
  constructor(private _fakeService: FakeServiceComponent, private http: HttpClient) {

    this.filteredEmployees =
    this._fakeService.getEmployees();

    this.allAssociates = this.filteredEmployees;
  }

  ngOnInit() {
  this.http.get('users').toPromise().then(data => {
    this.returnableDataVariable = data; 
    this.filteredEmployees = this.returnableDataVariable;
    console.log("any role show up yet?  " +data[5].userStatus.generalStatus);
    
  });

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
    }else{
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
    console.log("role has been changed to " + opt.value +" for:" +emailIdentifier);//onChange test -
  }

  inputNewRole() {
    //how to enter on 'enter' key
    //myInputElement.addEventListener('keyup', this.inputNewRole);
    console.log("enterkey pressed");

  }
}

