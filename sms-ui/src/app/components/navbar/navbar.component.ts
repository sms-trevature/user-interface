import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/sms-client/dto/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }
  
  public user: User;

  showSurveyPage() {
    this.router.navigateByUrl('/surveyList');
  }
  ngOnInit() {
    
  }

}
