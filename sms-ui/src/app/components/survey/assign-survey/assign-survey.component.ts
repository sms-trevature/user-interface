import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/sms-client/clients/survey.service';
import { UsersClientService } from 'src/app/sms-client/clients/users-client.service';
import { SurveyQuestionService } from 'src/app/sms-client/clients/surveyquestion.service';
import { Survey } from 'src/app/sms-client/dto/Survey';
import { User } from 'src/app/sms-client/dto/User';




@Component({
  selector: 'app-assign-survey',
  templateUrl: './assign-survey.component.html',
  styleUrls: ['./assign-survey.component.scss']
})
export class AssignSurveyComponent implements OnInit {

  listOfSurvey: Survey[];
  surveyCreator: User;


  constructor(
    private surveyService: SurveyService,
    private userService: UsersClientService,
    private sqService: SurveyQuestionService
    ) { }

  ngOnInit() {
    this.userService.findByEmail('blake.kruppa@revature.com').subscribe(
      creator => {
        this.surveyCreator = creator;
      }
    );

    this.surveyService.findAll().subscribe(
      data => {
        this.listOfSurvey = data;
      }
    );
  }

  closeSurvey(index: number) {
    this.listOfSurvey[index].closingDate = new Date();
    this.surveyService.save(this.listOfSurvey[index]).subscribe(
      data => {
        this.listOfSurvey[index] = data;
        console.log(this.listOfSurvey[index]);
      }
    );
  }

}
