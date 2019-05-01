import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { SomeAssociate } from '../sms-client/dto/Employees';
import { FakeServiceComponent } from '../fake-service/fake-service.component';
import { Button } from 'protractor';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Address } from '../sms-client/dto/Address';
import { VirtualAction } from 'rxjs';
import { status } from '../sms-client/dto/Status';
import { stringify } from 'querystring';
import { Router } from '@angular/router';
import { UserObj } from '../sms-client/dto/UserObj';
import { AddressObject } from '../sms-client/dto/AddressObj';
import { stat } from 'fs';

@Component({
  selector: 'app-mngr-sub-associates',
  templateUrl: './mngr-sub-associates.component.html',
  styleUrls: ['./mngr-sub-associates.component.scss']
})

export class MngrSubAssociatesComponent implements OnInit {
  performFilter(_listFilter: string): SomeAssociate[] {
    throw new Error("Method not implemented.");
  }
  _listFilter = '';

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(temp: string) {
    this._listFilter = temp;
    this.filteredEmployees = this._listFilter ? this.performFilter(this._listFilter) : this.allAssociates;
  }

  statusstatus = new Array;
  enterUser: UserObj;
  stagingM = new Array;
  adminArray = new Array;
  trainerArray = new Array;
  virtualStatus;
  wholeName = '';
  nextMenuToRemove;
  addressList;
  closeResult: string;
  allAssociates: SomeAssociate[] = [];
  filteredEmployees: SomeAssociate[] = [];
  globalFart: string = '';
  returnableDataVariable;
  ngswitchCase = '';
  silverSnakes;
  private returnableRoleValue = '';
  private lastCell: any;
  private returnableEmailValue = '';
  private returnableButton = document.createElement('button') as HTMLButtonElement;
  constructor(private router: Router, private http: HttpClient, private modalService: NgbModal) {

    //----now retrieve all users in the actual DB 
    this.http.get('users').toPromise().then(data => {

      let objIndex = 0;
      while (data[objIndex] != null || data[objIndex] != undefined) {
        this.filteredEmployees.push(data[objIndex]);
        objIndex++;
      }
    });
    //===============================^
    this.http.get('cognito/users/groups/admin').toPromise().then(admins => {
      let index = 0;
      while (admins['Users'][index] != undefined) {
        if (admins['Users'][index].Attributes[1]['Value'] == true || admins['Users'][index].Attributes[1]['Value'] == 'true') {
          this.adminArray.push(admins['Users'][index].Attributes[2]['Value']);
        } else {
          this.adminArray.push(admins['Users'][index].Attributes[1]['Value']);
        }
        index++;
      }

    });
    this.http.get('cognito/users/groups/trainer').toPromise().then(trainer => {

      let index = 0;
      while (trainer['Users'][index] != undefined) {
        if (trainer['Users'][index].Attributes[1]['Value'] == true || trainer['Users'][index].Attributes[1]['Value'] == 'true') {
          this.trainerArray.push(trainer['Users'][index].Attributes[2]['Value']);
        } else {
          this.trainerArray.push(trainer['Users'][index].Attributes[1]['Value']);
        }
        index++;
      }

    });
    this.http.get('cognito/users/groups/staging-manager').toPromise().then(sm => {                                                                                                                                //Jordan was here
      let index = 0;
      while (sm['Users'][index] != undefined) {
        if (sm['Users'][index].Attributes[1]['Value'] == true || sm['Users'][index].Attributes[1]['Value'] == 'true') {
          this.stagingM.push(sm['Users'][index].Attributes[2]['Value']);
        } else {
          this.stagingM.push(sm['Users'][index].Attributes[1]['Value']);

        }
        index++;
      }

      this.stagingM.forEach(element => {
      
      });

    });
    this.allAssociates = this.filteredEmployees;
  }
  ngOnInit() {
    this.http.get('user-service/addresses/is-training-location/true').toPromise().then(data => {
      this.addressList = data;
    });
    this.http.get('user-service/status').toPromise().then(status => {
      console.log(" secretary: " + status[0]);
      let indexer = 0;
      this.silverSnakes = status[1];
      while (status[indexer] != undefined && status[indexer] != null) {
        // console.log("run...............");
        //    console.log(status[indexer].status_id);
        this.statusstatus.push(status[indexer]);
        indexer++;
      }
      // alert(status);
    });
  }
  addATrainer(thisAddButton) {
    // alert("add for : " +thisAddButton);
    //  {{context}}/cognito/users/groups/
    alert('about to run ');
    this.http.put('cognito/users/groups/', '{"email": "' + thisAddButton + '", "groupName": "trainer"}').toPromise().then(status => {
      alert(' check  ');
    });
    // this.http.delete('cognito/users/groups/', {"email": "dfeli014@fiu.edu", "groupName": "trainer"}).toPromise().then(status =>{
    // });
  }
  addAAdmin(admin) {
    alert('about to run ');
    this.http.put('cognito/users/groups/', '{"email": "' + admin + '", "groupName": "admin"}').toPromise().then(status => {
      alert(' check  ');
    });
  }
  addSM(sm) {
    alert('about to run ');
    this.http.put('cognito/users/groups/', '{"email": "' + sm + '", "groupName": "staging-manager"}').toPromise().then(status => {
      alert(' check  ');
    });
  }
  SendUser() {
    const first = document.getElementById('FName') as HTMLInputElement;
    const last = document.getElementById('LName') as HTMLInputElement;
    const email = document.getElementById('Email') as HTMLInputElement;
    const phone = document.getElementById('phone') as HTMLInputElement;
    const slct = document.getElementById('GeneralSelection') as HTMLSelectElement;
    const selectedTraining = slct.options[slct.selectedIndex].value;
    let specStatus;
    let specChoice;
    if (selectedTraining == "Training") {
      specStatus = document.getElementById('specStaging') as HTMLSelectElement;
      specChoice = specStatus.options[specStatus.selectedIndex].value;
    } else {
      specStatus = document.getElementById('specTraining') as HTMLSelectElement;
      specChoice = specStatus.options[specStatus.selectedIndex].value;
    }
    this.virtualStatus;
    const ltc = document.getElementById('locationTrainingChoice') as HTMLSelectElement;
    // const tc = ltc.options[ltc.selectedIndex].value;

    const initialRole = document.createElement('ChooseInitialRole') as HTMLSelectElement;
    const role = initialRole.value;
    //ignoring personal address for now.. 
    let id = 0;
    if (selectedTraining == 'Training') {
      if (specChoice == 'Dropped') {
        id = 1;
      } else if (specChoice == 'Training') {
        id = 2;
      } else if (specChoice == 'Complete') {
        id = 3;
      }
    } else if (selectedTraining == 'Staging' && this.virtualStatus == false) {
      if (specChoice == 'Staging') {
        id = 4;
      } else if (specChoice == 'Bench') {
        id = 5;
      } else if (specChoice == 'Waiting for Paperwork') {
        id = 6;
      } else if (specChoice == 'Confirmed') {
        id = 7;
      } else if (specChoice == 'Project Started') {
        id = 8;
      } else if (specChoice == 'Paused') {
        id = 9;
      } else if (specChoice == 'Panel') {
        id = 10;
      }

    } else if (selectedTraining == 'Staging' && this.virtualStatus == true) {
      if (specChoice == 'Training') {
        id = 11;
      } else if (specChoice == 'Bench') {
        id = 12;
      } else if (specChoice == 'Waiting for Paperwork') {
        id = 13;
      } else if (specChoice == 'Confirmed') {
        id = 14;
      } else if (specChoice == 'Project Started') {
        id = 15;
      } else if (specChoice == 'Paused') {
        id = 16;
      } else if (specChoice == 'Panel Pending') {
        id = 17;
      }
    }
    //-----personal stuff enforced-------
      const pstreet = document.getElementById('pstreet') as HTMLInputElement; 
      const pcity = document.getElementById('pcity') as HTMLInputElement; 
      const pstate = document.getElementById('pstate') as HTMLInputElement;
      const pzip = document.getElementById('pzip') as HTMLInputElement; 

//----------
    let whicheverForNow: AddressObject;
    let personalAddressEnforced: AddressObject  = new AddressObject(0, '','','','','','',false);
    personalAddressEnforced.street = pstreet.value; 
    personalAddressEnforced.city = pcity.value; 
    personalAddressEnforced.state = pstate.value; 
    personalAddressEnforced.zip = pzip.value;
    personalAddressEnforced.country = "United States";
    personalAddressEnforced.isTrainingLocation = false; 
    personalAddressEnforced.alias = "My Personal Address"; 
    this.http.get('user-service/addresses/is-training-location/true').toPromise().then(data => {
      this.addressList = data;
    });

    let trainingLocationChoice ;
    this.addressList.forEach(element => {
      let whicheverForNow = element; 
      if (ltc.value == (whicheverForNow.alias)) {
         trainingLocationChoice = whicheverForNow;
      }
    });
 
    this.enterUser = new UserObj(0, first.value, last.value,
      email.value, phone.value, trainingLocationChoice, personalAddressEnforced, this.silverSnakes);

    this.http.post('users/insert', this.enterUser).toPromise().then(data => {

      alert("Worked " + data);

    });
  }
  functionTest(email) {

    if (this.adminArray.indexOf(email) != -1) {
      return "Admin";
    } else
      if (this.trainerArray.indexOf(email) != -1) {
        return "Trainer";
      } else if (this.stagingM.indexOf(email) != -1) {
        return "Staging Manager";
      } else {
        return 'Associate';
      }
  }
  returnView() {
    const flipClari = document.getElementById('claricationDiv') as HTMLDivElement;
    flipClari.style.display = "block";
    const childLock = document.getElementById('editButton') as HTMLButtonElement;
    childLock.style.display = "block";
    const returnButton = document.getElementById('standardizeB') as HTMLButtonElement;
    returnButton.style.display = "none";
    //backup filteration resolution-----------
    const pullOutFilter = document.getElementById('filterByThisAssociate') as HTMLInputElement;
    pullOutFilter.style.display = "block";
    const turnOffSelectFilter = document.getElementById('selectElement') as HTMLSelectElement;
    turnOffSelectFilter.style.display = "block";
    //backup filteration resolution-----------
    this.router.navigateByUrl('/ManageRoute', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/ManageRoute', 'subMan1Internal']));

  }
  editAllRoles() {
    //cantBelieveItsNotButton

    let working3 = document.getElementsByClassName('cantBelieveItsNotButton');
    let aroundVariable = working3.length;
    let meat = 0;
    console.log("3. hould return something variable  " + working3.length);
    while (meat < 55) {
      console.log("THIS--- SHOULD --- RUN  " + document.getElementById('cantBelieveItsNotButton'));
      let int = 0;
      // let array = new Array; 
      let array = document.getElementsByClassName('cantBelieveItsNotButton');
      //&& array[int] != null
      while (array[int] != null) {

        //  array[int].parentNode.removeChild(array[int]);
        if (array[int].parentNode.firstChild.textContent.toLowerCase().length == 10) {

          int++;
        } else {
          array[int].parentNode.removeChild(array[int]);
          int++;
        }
      }
      aroundVariable = document.getElementsByClassName('cantBelieveItsNotButton').length;
      meat++;

    }
    //--
    let int2 = 0;
    let array2 = document.getElementsByClassName('cantBelieveItsNotButton');
    while (array2[int2] != null && array2[int2] != undefined) {

      //  array[int].parentNode.removeChild(array[int]);
      if (array2[int2].parentNode.firstChild.textContent.toLowerCase().length == 10) {
        console.log("bahahahahahhahaha");
      }
    }
  }
}