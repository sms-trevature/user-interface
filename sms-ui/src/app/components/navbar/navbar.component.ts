import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/sms-client/dto/User';
import { CognitoService } from 'src/app/services/cognito.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  email: string;

  constructor(private router: Router, private cognito:CognitoService) { }
  
  public user: User;

  showSurveyPage() {
    this.router.navigateByUrl('/surveyList');
  }
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.email = localStorage.getItem('userEmail');

  }
  logout(){
    this.cognito.logout().then(data=>{
      console.log(data)
    })
  }
}
