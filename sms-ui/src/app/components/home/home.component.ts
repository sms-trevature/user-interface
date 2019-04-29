import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersClientService } from 'src/app/sms-client/clients/users-client.service';
import { CognitoService } from 'src/app/services/cognito.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/sms-client/dto/User';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  private currentUserSubscription: Subscription;

  public user: User;

  constructor(private nav: NavbarComponent, private userClient: UsersClientService, private cognito: CognitoService) { }

  ngOnInit() {
    this.currentUserSubscription = this.cognito.currentUser$.subscribe(user => {
      this.userClient.findByEmail(user.email).subscribe(
        succResp => {
          console.log(succResp);
          user = succResp;
          console.log("we can pass this user: " + user.firstName);
          this.nav.user = user;
          console.log(user.trainingAddress );
          //trying to pass via the nav bar.. 
          this.user = succResp;
        },
        err => {
          console.log(err);
        }
      );
    });
  }
returnUserInfo(): User{
  console.log("something called finally "); 
  return this.user;
}
  ngOnDestroy() {
    // ensures that we don't try calling unsubscribe on undefined
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }

}
