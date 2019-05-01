import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import { CognitoService } from './services/cognito.service';
import { Spinkit } from 'ng-http-loader';
import {LoadingLogoComponent} from './components/loading-logo/loading-logo.component';
export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public spinkit = LoadingLogoComponent;
  subscription: Subscription;
  title = 'sms-ui';
  constructor(private router: Router, private cognito: CognitoService) {
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
        
      }
    });
  }
}
