import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/sms-client/dto/Address';
import { User } from 'src/app/sms-client/dto/User';
import { async } from '@angular/core/testing';
import { CognitoService } from 'src/app/services/cognito.service';
import { HomeComponent } from '../home/home.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Subscription } from 'rxjs';
import { UsersClientService } from 'src/app/sms-client/clients/users-client.service';


@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.sass']
})
export class ProfileInfoComponent implements OnInit {
  currentAddress: Address;

  // user will somehow be retrieved through cognito session
  private currentUserSubscription: Subscription;

  currentUser: User; 

  constructor(private nav: NavbarComponent, private cognito: CognitoService, private userClient: UsersClientService) { 
  }

  ngOnInit() {
    this.currentUserSubscription = this.cognito.currentUser$.subscribe(user => {
      this.userClient.findByEmail(user.email).subscribe(
        succResp => {
          this.currentUser = succResp;
          localStorage.setItem('userEmail', this.currentUser.email);
          console.log(localStorage.getItem('userEmail'));
        },
        err => {
        }
      );
    });
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
    if (addrs.value !== this.currentAddress.street
      || cty.value !== this.currentAddress.city
      || stt.value !== this.currentAddress.state
      || cntry.value !== this.currentAddress.country
      || zp.value !== this.currentAddress.zip
      || als.value !== this.currentAddress.alias) {
      console.log('change is being made to the address');
      addChange = true;
    }
  }
  // example from login.. of NOT using the service..
  // async submitNewPassword() {
  //   try {
  //     await this.cognitoService.setNewPassword(this.newPassword);
  //   } catch (err) {
  //     console.log(err);
  //     if (err.message === 'NEW_PASSWORD_REQUIRED') {
  //       this.newPasswordRequired = true;
  //     }
  //   }
  // }
}
