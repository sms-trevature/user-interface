import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { SomeAssociate } from '../sms-client/dto/Employees';
import { FakeServiceComponent } from '../fake-service/fake-service.component';
import { Button } from 'protractor';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
import { Alert } from 'selenium-webdriver';
import { CognitoService } from '../services/cognito.service';

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
  private http2: HttpClient;
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
  globalFart: string = ''; //jordan ponder wrote this variable and takes full responsibility for consequences related to it
  returnableDataVariable;
  ngswitchCase = '';
  silverSnakes;
  private returnableRoleValue = '';
  private lastCell: any;
  private returnableEmailValue = '';
  private returnableButton = document.createElement('button') as HTMLButtonElement;
  constructor(private router: Router, private http: HttpClient, private modalService: NgbModal) {

    this.http.get('users').toPromise().then(data => {

      let objIndex = 0;
      while (data[objIndex] != null || data[objIndex] != undefined) {
        this.filteredEmployees.push(data[objIndex]);
        objIndex++;
      }
    });
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
  changeRole() {

    const newSpot = document.getElementById('selectedRoleRow') as HTMLSelectElement;
    const emailIdentifier = newSpot.className;
    let index = newSpot.selectedIndex;
    let opt = newSpot.options[index];

    if (opt.value == 'Admin') {
      this.http.put('cognito/users/groups/', '{"email": "' + emailIdentifier + '", "groupName": "trainer"}').toPromise().then(status => {
       
      });
      this.addAAdmin(emailIdentifier);
    } else if (opt.value == 'Associate') {
      this.addATrainer(emailIdentifier);
    } else if (opt.value == 'Staging-Manager') {
      this.addSM(emailIdentifier);
    }
  }

  ngOnInit() {
    this.http.get('user-service/addresses/is-training-location/true').toPromise().then(data => {
      this.addressList = data;
    });
    this.http.get('user-service/status').toPromise().then(status => {
      let indexer = 0;
      this.silverSnakes = status[1];
      while (status[indexer] != undefined && status[indexer] != null) {
        this.statusstatus.push(status[indexer]);
        indexer++;
      }
    });
  }
  addATrainer(thisAddButton) {
    this.http.put('cognito/users/groups/', '{"email": "' + thisAddButton + '", "groupName": "trainer"}').toPromise().then(status => {
    });
  }
  addAAdmin(admin) {
    this.http.put('cognito/users/groups/', '{"email": "' + admin + '", "groupName": "admin"}').toPromise().then(status => {
    });
  }
  addSM(sm) {
    this.http.put('cognito/users/groups/', '{"email": "' + sm + '", "groupName": "staging-manager"}').toPromise().then(status => {
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

    const initialRole = document.getElementById('ChooseInitialRole') as HTMLSelectElement;
    const currentIndex = initialRole.options[initialRole.selectedIndex].value;
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
    let personalAddressEnforced: AddressObject = new AddressObject(0, '', '', '', '', '', '', false);
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

    let trainingLocationChoice;
    this.addressList.forEach(element => {
      let whicheverForNow = element;
      if (ltc.value == (whicheverForNow.alias)) {
        trainingLocationChoice = whicheverForNow;
      }
    });

    this.enterUser = new UserObj(0, first.value, last.value,
      email.value, phone.value, trainingLocationChoice, personalAddressEnforced, this.silverSnakes);

    this.http.post('users/insert', this.enterUser).toPromise().then(data => {
      const HeaderDic = {
        'Content-Type': 'application/json',
        'x-api-key': `pApHsxBeoe1U3znB36G0l3lCO5WPp6Zb3gtmDgIp`,
      };
      const requestOptions = {
        headers: new HttpHeaders(HeaderDic),
      };

      if (currentIndex == '1') {

      } else if (currentIndex == '2') {
        this.addSM(email.value);
      } else if (currentIndex == '3') {

        this.addAAdmin(email.value);
      } else if (currentIndex == '4') {

        this.addATrainer(email.value);
      }

     

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
    

    let working3 = document.getElementsByClassName('cantBelieveItsNotButton');
    let aroundVariable = working3.length;
    let meat = 0;
    while (meat < 55) {
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
    let int2 = 0;
    let array2 = document.getElementsByClassName('cantBelieveItsNotButton');
    while (array2[int2] != null && array2[int2] != undefined) {

      if (array2[int2].parentNode.firstChild.textContent.toLowerCase().length == 10) {
      
        int2++;
      } else {
        array2[int2].parentNode.removeChild(array2[int2]);

        int2++;
      }
    }
    //backup filteration resolution--------------
    const pullOutFilter = document.getElementById('filterByThisAssociate') as HTMLInputElement;
    pullOutFilter.style.display = "none";
    const turnOffSelectFilter = document.getElementById('selectElement') as HTMLSelectElement;
    turnOffSelectFilter.style.display = "none";
    //backup filteration resolution---------------
    const flipClari = document.getElementById('claricationDiv') as HTMLDivElement;
    flipClari.style.display = "none";
    //-----
    const childLock = document.getElementById('editButton') as HTMLButtonElement;
    childLock.style.display = "none";
    const returnButton = document.getElementById('standardizeB') as HTMLButtonElement;
    document.getElementById('legend').style.display = "block";
    document.getElementById('legendHead').style.display = "block";
    this.filteredEmployees.forEach(element => {
      let idCaseAdjust = element.email.toUpperCase() + "";
      let cast = document.getElementById(idCaseAdjust) as HTMLDataListElement;
      cast.style.display = "block"
      cast.style.margin = "6px";
    });

    returnButton.style.display = "block";
    this.stagingM;
    this.adminArray;
    this.trainerArray;
    let multiRoleUsers = new Array;
    this.trainerArray.forEach(element => {
      
      const roleSpot = document.getElementById(element) as HTMLDataListElement;
      
      if (roleSpot != null && roleSpot != undefined) {
        multiRoleUsers.push(element);

      }
      // roleSpot.removeChild(roleSpot.firstChild);//gets rid of that one button
      const trainDiv = document.createElement('div') as HTMLDivElement;
      const x = document.createElement('button') as HTMLButtonElement;
      x.innerText = 'x';
      trainDiv.id = element + '-trainer';
      x.style.height = '14px';
      x.style.cssFloat = 'right';
      trainDiv.className = "trainRoleIcon";
      x.style.borderRadius = '10px';
      x.className = 'AssociatesXitButton';//only reachable through global styles idk y
      //  x.style.backgroundImage = "url('../../assets/rev-logo.png')";
      x.style.marginLeft = "-65px";
      x.addEventListener('click', function () {
        trainDiv.innerHTML = '';
        //COGNITO HERE - remove from group - trainer
        // let httpDrop: HttpClient;
        // const requestOptions = {
        //   params: new HttpParams()
        // };
        //--------test stuff
        // new RequestOptions({
        //   headers: '',
        //   body: {
        //     "email":"blake.kruppa@revature.com",
        //     "groupName":"trainer"
        //   }
        // })
        //----test stuff
        //   console.log('FUNCTOIN ran.....');
        // requestOptions.params.set('email:blake.kruppa@revature.com','groupName:trainer');
        // httpDrop.delete('cognito/users/groups', requestOptions ).toPromise().then(change => {
        //   console.log('remove role attempting?');
        //   console.log(change); });

        //  console.log('remove role occurred?');
      });
      trainDiv.innerHTML = "T";
      trainDiv.appendChild(x);
      roleSpot.appendChild(trainDiv);
    });
    this.adminArray.forEach(element => {

      const roleSpotA = document.getElementById(element) as HTMLDataListElement;
      if (roleSpotA != null) {
        multiRoleUsers.forEach(alreadyRemovedButton => {
          if (alreadyRemovedButton == element) {

          } else {

          }

        });
        const adminDiv = document.createElement('div') as HTMLDivElement;
        const xx = document.createElement('button') as HTMLButtonElement;
        xx.innerText = 'x';
        adminDiv.id = element + '-admin';
        xx.style.height = '14px';
        xx.style.cssFloat = 'right';
        adminDiv.className = "adminRoleIcon";
        xx.style.borderRadius = '10px';
        xx.className = 'AssociatesXitButton';
        xx.addEventListener('click', function () {
          adminDiv.innerHTML = '';
        });
        adminDiv.innerHTML = "A";
        adminDiv.appendChild(xx);
        roleSpotA.appendChild(adminDiv);
      }
    });

    this.stagingM.forEach(element => {
      const roleSpotSM = document.getElementById(element) as HTMLDataListElement;
      if (roleSpotSM != null) {
        multiRoleUsers.forEach(alreadyRemovedButton => {
          if (alreadyRemovedButton == element) {

          } else {

          }
        });
        const smDiv = document.createElement('div') as HTMLDivElement;
        const xxx = document.createElement('button') as HTMLButtonElement;
        xxx.innerText = 'x';
        smDiv.id = element + '-admin';
        xxx.style.height = '14px';
        xxx.style.cssFloat = 'right';
        smDiv.className = "manstagRoleIcon";
        xxx.style.borderRadius = '10px';
        xxx.className = 'AssociatesXitButton';
        xxx.addEventListener('click', function () {
          smDiv.innerHTML = '';
        });
        smDiv.innerHTML = "SM";
        smDiv.appendChild(xxx);
        roleSpotSM.appendChild(smDiv);
      }
    });
  }
  removeRole() {

  }
  displaySelectChange(lastName, firstName) {
    if (this.nextMenuToRemove != null) {
      const roleOpt = document.getElementById(this.nextMenuToRemove) as HTMLDivElement;
      roleOpt.style.display = "none";
    }
    const roleOpt = document.getElementById(firstName + 'notAfunction(' + lastName + ')') as HTMLDivElement;
    roleOpt.style.display = "block";
    this.nextMenuToRemove = firstName + 'notAfunction(' + lastName + ')';
  }
  generalStatus() {
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

  }
  checkboxChecked() {
    if (this.virtualStatus == null || this.virtualStatus == false) {
      this.virtualStatus = true;

    } else {
      this.virtualStatus = false;

    }

  }
  closeMenu(last, first) {
    const divToClose = document.getElementById(last + 'notAfunction(' + first + ')') as HTMLDivElement;
    divToClose.style.display = "none";
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
    let opt = e.options[index];
    let value = opt.value;
    if (value !== 'All') {
      this.filteredEmployees = this.allAssociates.filter((metaEmployee: SomeAssociate) =>
        (document.getElementById(metaEmployee.email).innerText + 's') == value);
      //return e to index, All/ 0  
    } else {
      this.filteredEmployees = this.allAssociates;
    }
  }
  editRole(email) {
    let selectedInquiry = document.getElementById(this.returnableEmailValue) as HTMLDataListElement;
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

    let currentRole: string;
    const childButton = grabDataCell.firstChild as HTMLButtonElement;
    currentRole = childButton.innerText;

    this.returnableRoleValue = childButton.innerText;
    this.returnableEmailValue = email;
    while (grabDataCell.firstChild) {

      currentRole = grabDataCell.firstChild.textContent;
      grabDataCell.removeChild(grabDataCell.firstChild);
    }
    const NewRole = document.createElement('select') as HTMLSelectElement;
    NewRole.addEventListener('click', this.changeRole);//on change 
    NewRole.setAttribute('id', 'selectedRoleRow');
    NewRole.setAttribute('class', email);
    const optAdmin = document.createElement('option') as HTMLOptionElement;
    optAdmin.textContent = "Admin";
    const optStagingM = document.createElement('option') as HTMLOptionElement;
    optStagingM.textContent = "Staging-Manager";
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
      if (PossibleFirstOptionElement.innerText.length == childButton.innerText.length) {
        NewRole.appendChild(PossibleFirstOptionElement);//append the current one so that it shows first - 
      } else {
        ArrayOfNoneCurrentOptions.push(PossibleFirstOptionElement);
      }
    });
    ArrayOfNoneCurrentOptions.forEach(OptionElement => {
      NewRole.appendChild(OptionElement);
    });


    grabDataCell.appendChild(NewRole);
  } 

  inputNewRole() {


  }
  addAssociateByForm(form: NgForm) {
    let first = form.value['dp1'];
    let last = form.value['dp2'];
    let email = form.value['dp3'];
    let phone = form.value['dp4'];

    for (let temp of this.addressList) {
      if (temp.city == form.value['location']) {
        var tLoc= temp;
      }
    }
    this.http.get(`user-service/status/2`).toPromise().then(data=>{
      var status = data;
    })

    let body = {
      'userId':0,
      'firstName': first,
      'lastName': last,
      'email': email,
      'phoneNumber': phone,
      'trainingAddress': tLoc,
      'personalAddress': null,
      'userStatus':status,
      'cohorts':null
    }
    this.http.post('users', body).toPromise().then(data =>
      console.log(data))
  }



}

