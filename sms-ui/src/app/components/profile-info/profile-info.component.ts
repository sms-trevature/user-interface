import { Component, OnInit, ɵConsole } from '@angular/core';
import { Address } from 'src/app/sms-client/dto/Address';
import { User } from 'src/app/sms-client/dto/User';
import { async } from '@angular/core/testing';
import { CognitoService } from 'src/app/services/cognito.service';
import { HomeComponent } from '../home/home.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { AddressObject } from 'src/app/sms-client/dto/AddressObj';
import { UserObj } from 'src/app/sms-client/dto/UserObj';
import { status } from 'src/app/sms-client/dto/Status';


@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.sass']
})
export class ProfileInfoComponent implements OnInit {
  currentAddress: Address;

  // user will somehow be retrieved through cognito session
  addressList;
  currentUser: User;
  UpdateUser: UserObj; 
  UserPersonalAddress: AddressObject;
  neverchangedTrainingAddress= true; 
 // currentUser: User; 

  constructor(private http: HttpClient, private nav: NavbarComponent, private cognitoService: CognitoService) {
    
    //this.currentUser = nav.user;\

    this.currentUser = JSON.parse(localStorage.getItem('user'));
  //  console.log(" constructor - undefined??? " + nav.user.lastName);
    console.log("salad and burgers: " + this.currentUser.personalAddress);
    if(this.currentUser.personalAddress == null){
      this.UserPersonalAddress = new AddressObject(0, 'No Alias', 'No Street', 'No Zip', 'No City', 'No State', 'No Country', false);
      
      this.currentUser.personalAddress =this.UserPersonalAddress;
      
      console.log(this.UserPersonalAddress.street );
    }
  }

  ngOnInit() {
    console.log(" this here huh :  " + this.currentUser.userStatus.generic_status);
    this.http.get('user-service/addresses/is-training-location/true').toPromise().then(data => {
      // alert(data);
      this.addressList = data;
      // alert(this.addressList[0].alias);
    })
    console.log(" ngOnInit - undefined??? " + this.nav.user.firstName);
    this.currentUser = this.nav.user;
    console.log('farts and cheese' + this.currentUser.firstName);
  }
  changeTrainingAddress() {
    this.neverchangedTrainingAddress=false; 
    const removeButtonFromHere = document.getElementById('trainWork') as HTMLDivElement;
    removeButtonFromHere.removeChild(removeButtonFromHere.firstChild);
    //remove the button for sure then.. 
    const select = document.createElement('select') as HTMLSelectElement;
    select.id = "trainingAddressChoice";
    removeButtonFromHere.style.marginRight = '-130px';
    removeButtonFromHere.style.position = "relative";
    removeButtonFromHere.style.left = '-160px';
    //css damaged here... needs fixing... 
    removeButtonFromHere.appendChild(select); 
    let trainIndex = 0;
    while (this.addressList[trainIndex].alias != null && this.addressList[trainIndex].alias != undefined) {
      console.log("address" + this.addressList[trainIndex].alias );
      let newTrainingOpt = document.createElement('option') as HTMLOptionElement;
      newTrainingOpt.innerHTML = this.addressList[trainIndex].alias;
      select.appendChild(newTrainingOpt);
      // let index = newSpot.selectedIndex;
      // let opt = newSpot.options[index];
      trainIndex++;
    }
    
  }
returnUserInfo(): User {
  return this.currentUser;
}
  someMethodToGrabAddressForUserViaUserPKGrabbedFromCognitoCurrentUserSession() {
    // retrieve user info
    // currentAddress[0] = service to retrieve address based on current user signed in
  }
  someMethodToUpdateAddressOrUserInfo() {
    let userChange = false;
    let addChange = false;
    // -----------------
    let trainaddress;
    let selectedTraining; 
    if (this.neverchangedTrainingAddress == false) {
      trainaddress = document.getElementById('trainingAddressChoice') as HTMLSelectElement;
     console.log("SELECTED " + trainaddress.options[trainaddress.selectedIndex].value);
      selectedTraining = trainaddress.options[trainaddress.selectedIndex].value;
     }
    const fnInput = document.getElementById('fName') as HTMLInputElement;
    const lnInput = document.getElementById('lName') as HTMLInputElement;
    const email = document.getElementById('email') as HTMLInputElement;
    const phoneN = document.getElementById('phoneN') as HTMLInputElement;
    if (fnInput.value !== this.currentUser.firstName
      || lnInput.value !== this.currentUser.lastName
      || email.value !== this.currentUser.email
      || phoneN.value !== this.currentUser.phoneNumber) {
      userChange = true;
      console.log('change is being made to user');


    }
    const addrs = document.getElementById('address') as HTMLInputElement;
    const cty = document.getElementById('city') as HTMLInputElement;
    const stt = document.getElementById('state') as HTMLInputElement;
    const cntry = document.getElementById('country') as HTMLInputElement;
    const zp = document.getElementById('zip') as HTMLInputElement;
    const als = document.getElementById('alias') as HTMLInputElement;
    if (addrs.value !== this.currentUser.personalAddress.street
      || cty.value !== this.currentUser.personalAddress.city
      || stt.value !== this.currentUser.personalAddress.state
      || cntry.value !== this.currentUser.personalAddress.country
      || zp.value !== this.currentUser.personalAddress.zip
      || als.value !== this.currentUser.personalAddress.alias) {
      console.log('change is being made to the address');
      addChange = true; 
    }
    let newPersonalAddress: AddressObject;
      if(addChange == true){
          newPersonalAddress = new AddressObject(0, als.value, stt.value, zp.value, cty.value, 
            stt.value, cntry.value, false); 
      }
      let determinedTrainingArea;
      this.currentUser.userStatus;
    //let keepStts: status = new status( );
    this.addressList.forEach(element => {
      console.log("looking through " + element.alias);
      if(element.alias == selectedTraining) {
            console.log("alias of array: "  +element.alias);
            console.log("vs");
            console.log("selected : " +selectedTraining);
             determinedTrainingArea = element; 
      }
    });
  
    this.UpdateUser = new UserObj(this.currentUser.userId, fnInput.value, lnInput.value, 
      email.value, phoneN.value, determinedTrainingArea, newPersonalAddress, this.currentUser.userStatus); 
      console.log("our new user object is: " +  this.UpdateUser);
      this.http.post('user-service/users',  this.UpdateUser).toPromise().then(data => {
        console.log("server side error - ^ - v - ");
      })
  }
}
