import { Component, OnInit } from '@angular/core';
import { Survey } from 'src/app/sms-client/dto/Survey';
import { SurveyQuestion } from 'src/app/sms-client/dto/surveyQuestion';
import { Answer } from 'src/app/sms-client/dto/Answer';
import { SurveyService } from 'src/app/sms-client/clients/survey.service';
import { SurveyQuestionService } from 'src/app/sms-client/clients/surveyquestion.service';
import { SurveyAnswerService } from 'src/app/sms-client/clients/survey-answer.service';

@Component({
  selector: 'app-survey-grid',
  templateUrl: './survey-grid.component.html',
  styleUrls: ['./survey-grid.component.scss']
})
export class SurveyGridComponent implements OnInit {
  listOfSurvey: Survey[];
  curTemplate: SurveyQuestion[];
  curTempAnswers: Array<Answer[]>;
  constructor(private surveyService: SurveyService,
              private sqService: SurveyQuestionService,
              private answerService: SurveyAnswerService) {}

  ngOnInit() {
    this.listOfSurvey = [];
    this.surveyService.findAll().subscribe(
      data => {
        // data[i].dateCreated = new Date(data[i].dateCreated);
        // data[i].closingDate = new Date(data[i].closingDate);
        for (const temp of data) {
          if (temp.template) {
            this.listOfSurvey.push(temp);
          }
        }
     }
    );
  }

  closeSurvey(index: number) {
    this.listOfSurvey[index].closingDate = new Date();
    this.surveyService.closeSurvey(this.listOfSurvey[index]).subscribe(
      data => {
        this.listOfSurvey[index] = data;
      }
    );
  }

  checkTemplate(surveyId: number) {
    this.curTemplate = [];
    this.curTempAnswers = [];
    this.sqService.getTemplate(surveyId).subscribe(
      data => {
        this.curTemplate = data;
// tslint:disable-next-line: forin
        for (const i in data) {
          this.answerService.findByQuestionId(data[i].questionId.questionId).subscribe(
            curQuestionAnswerList => {
              this.curTempAnswers[i] = curQuestionAnswerList;
              console.log(curQuestionAnswerList);
            }
          );
        }
      }
    );
  }
}