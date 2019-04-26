import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Survey } from 'src/app/sms-client/dto/Survey';
import { SurveyQuestion } from 'src/app/sms-client/dto/surveyQuestion';
import { Answer } from 'src/app/sms-client/dto/Answer';
import { SurveyService } from 'src/app/sms-client/clients/survey.service';
import { SurveyQuestionService } from 'src/app/sms-client/clients/surveyquestion.service';
import { SurveyAnswerService } from 'src/app/sms-client/clients/survey-answer.service';
import { SurveyResponseService } from 'src/app/sms-client/clients/survey-response.service';

=======
import { SurveyService } from 'src/app/sms-client/clients/survey.service';
import { UsersClientService } from 'src/app/sms-client/clients/users-client.service';
import { SurveyQuestionService } from 'src/app/sms-client/clients/surveyquestion.service';
import { Survey } from 'src/app/sms-client/dto/Survey';
import { User } from 'src/app/sms-client/dto/User';
>>>>>>> 82ddb5fd07cf977cb4e05c23dd19a7fcda845d6a




@Component({
  selector: 'app-assign-survey',
  templateUrl: './assign-survey.component.html',
  styleUrls: ['./assign-survey.component.scss']
})
export class AssignSurveyComponent implements OnInit {
<<<<<<< HEAD
  
  listOfSurvey: Survey[];
  curTemplate: SurveyQuestion[];
  curTempAnswers: Array<Answer[]>;
  ArrayOfResponseAnswerList: Array<string[]>;
  arrOfCounts: Array<number[]>;
  constructor(private surveyService: SurveyService,
              private sqService: SurveyQuestionService,
              private answerService: SurveyAnswerService,
              private responseService: SurveyResponseService) {}

  ngOnInit() {
    this.surveyService.findAll().subscribe(
      data => {
        // data[i].dateCreated = new Date(data[i].dateCreated);
        // data[i].closingDate = new Date(data[i].closingDate);
=======

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
>>>>>>> 82ddb5fd07cf977cb4e05c23dd19a7fcda845d6a
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
<<<<<<< HEAD
  }

  checkTemplate(surveyId: number) {
    this.ArrayOfResponseAnswerList = [];
    this.curTemplate = [];
    this.sqService.getTemplate(surveyId).subscribe(
      data => {
        this.curTemplate = data;
        this.curTempAnswers = new Array(data.length);
// tslint:disable-next-line: forin
        for (const i in data) {
          this.answerService.findByQuestionId(data[i].questionId.questionId).subscribe(
            curQuestionAnswerList => {
              this.curTempAnswers[i] = curQuestionAnswerList;
            }
          );
        }
      }
    );
  }

  getGraph(surveyId: number) {
    this.curTemplate = [];
    this.responseService.findBySurveyId(surveyId).subscribe(
      data => {
        let temp = [data[0].answerId.answer];
        let count = [1];
        for (let i = 0; i < data.length - 1; i++) {
          if (!data[i] || !data[i].answerId) { continue; }
          if (data[i].answerId.questionId === data[i + 1].answerId.questionId) {

            if (data[i].answerId.id !== data[i + 1].answerId.id) {
              temp.push(data[i + 1].answerId.answer);
              count.push(1);
            } else {
              count[count.length - 1]++;
            }
          } else {
            this.ArrayOfResponseAnswerList.push(temp);
            this.arrOfCounts.push(count);
            count = [1];
            temp = [data[i + 1].answerId.answer];
          }
        }
        console.log(this.ArrayOfResponseAnswerList);
        console.log(this.arrOfCounts);
      }
    );
=======
>>>>>>> 82ddb5fd07cf977cb4e05c23dd19a7fcda845d6a
  }

}
