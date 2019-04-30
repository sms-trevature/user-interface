import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SurveyService } from 'src/app/sms-client/clients/survey.service';
import { Survey } from 'src/app/sms-client/dto/Survey';
import { SurveyQuestionService } from 'src/app/sms-client/clients/surveyquestion.service';
import { SurveyQuestion, Question } from 'src/app/sms-client/dto/surveyQuestion';
import { Answer } from 'src/app/sms-client/dto/Answer';
import { SurveyAnswerService } from 'src/app/sms-client/clients/survey-answer.service';
import { Responses } from 'src/app/sms-client/dto/Response';
import { SurveyResponseService } from 'src/app/sms-client/clients/survey-response.service';
import { SurveyHistory } from 'src/app/sms-client/dto/SurveyHistory';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss']
})
export class SurveyListComponent implements OnInit {

  surveyId: number;
  respPressed: boolean;

  surveyTitle: string;
  listOfSurvey: Survey[];
  curTemplate: SurveyQuestion[];
  curTempAnswers: Array<Answer[]>;

  qList: Question[];
  ArrayOfResponseAnswerList: Array<string[]>;
  arrOfCounts: Array<number[]>;
  listFilterVar: string;
  filteredListOfSurvey: Survey[];
  constructor(
    private surveyService: SurveyService,
    private answerService: SurveyAnswerService,
    private sqService: SurveyQuestionService,
    private responseService: SurveyResponseService) { }

  ngOnInit() {
    this.surveyService.findAll().subscribe(
      data => {
        // data[i].dateCreated = new Date(data[i].dateCreated);
        // data[i].closingDate = new Date(data[i].closingDate);
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

  get listFilter(): string {
    return this.listFilterVar;
  }
  set listFilter(temp: string) {
    this.listFilterVar = temp;
    this.filteredListOfSurvey = (this.listFilterVar) ?
      this.performFilter(this.listFilterVar) : this.listOfSurvey;
  }

  performFilter(filterBy: string): Survey[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.listOfSurvey.filter((temp: Survey) =>
      (temp.title.toLocaleLowerCase().indexOf(filterBy) !== -1
        || temp.description.toLocaleLowerCase().indexOf(filterBy) !== -1
      )
    );
  }

  getGraph(surveyId: number, title: string) {
    this.surveyTitle = title;
    this.answerService.findAll().subscribe(
      ansList => {
        this.responseService.findBySurveyId(surveyId).subscribe(
          data => {
            this.sqService.getTemplate(surveyId).subscribe(
              sqList => {
                this.ArrayOfResponseAnswerList = new Array(sqList.length);
                this.arrOfCounts = new Array(sqList.length);
                this.qList = new Array(sqList.length);
                for (const sq of sqList) {
                  const tempAnsList = [];
                  const count = [];
                  if (sq.questionId.typeId === 5) {
                    for (const temp of ansList) {
                      if (temp.questionId === sq.questionId.questionId) {
                        tempAnsList.push(temp.answer);
                      }
                    }
                  } else {
                    for (const res of data) {
                      if (res.answerId.questionId === sq.questionId.questionId) {
                        if (tempAnsList.length === 0 || res.answerId.answer !== tempAnsList[tempAnsList.length - 1]) {
                          tempAnsList.push(res.answerId.answer);
                          count.push(1);
                        } else if (res.answerId.answer === tempAnsList[tempAnsList.length - 1]) {
                          count[count.length - 1]++;
                        }
                      }
                    }
                  }
                  this.qList[sq.questionOrder - 1] = sq.questionId;
                  this.ArrayOfResponseAnswerList[sq.questionOrder - 1] = tempAnsList;
                  this.arrOfCounts[sq.questionOrder - 1] = count;
                }
              }
            );
          }
        );
      }
    );
  }

  getRespondents(surveyId: number) {
    console.log('The current surveyId is: ' + surveyId);
    this.surveyId = surveyId;
    this.respPressed = true;
  }

}


