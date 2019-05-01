import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SurveyService } from 'src/app/sms-client/clients/survey.service';
import { Survey } from 'src/app/sms-client/dto/Survey';
import { SurveyQuestionService } from 'src/app/sms-client/clients/surveyquestion.service';
import { SurveyQuestion, Question } from 'src/app/sms-client/dto/surveyQuestion';
import { Answer } from 'src/app/sms-client/dto/Answer';
import { SurveyAnswerService } from 'src/app/sms-client/clients/survey-answer.service';
import { Responses } from 'src/app/sms-client/dto/Response';
import { SurveyResponseService } from 'src/app/sms-client/clients/survey-response.service';
import { QuestionOfSurveyService } from 'src/app/sms-client/clients/survey-question.service';
import { Cohort } from 'src/app/sms-client/dto/Cohort';
import { CohortService } from 'src/app/sms-client/clients/theCohort.service';
import { User } from 'src/app/sms-client/dto/User';
import { UsersClientService } from 'src/app/sms-client/clients/users-client.service';
import { SurveyHistoryService } from 'src/app/sms-client/clients/survey-history.service';
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

  cohorts: Cohort[];
  users: User[];
  statusCheckList: boolean[] = [];
  cohortCheckList: boolean[] = [];
  userCheckList: boolean[] = [];
  shownEmailList: string[] = [];

  qList: Question[];
  ArrayOfResponseAnswerList: Array<string[]>;
  arrOfCounts: Array<number[]>;
  listFilterVar: string;
  filteredListOfSurvey: Survey[];
  constructor(private surveyService: SurveyService,
              private answerService: SurveyAnswerService,
              private sqService: SurveyQuestionService,
              private responseService: SurveyResponseService,
              private cohortService: CohortService,
              private usersClientService: UsersClientService,
              private surveyHistoryService: SurveyHistoryService) {}
  ngOnInit() {
    this.listOfSurvey = [];
    this.surveyService.findAll().subscribe(
      data => {
        for (const temp of data) {
          if (!temp.template) {
            this.listOfSurvey.push(temp);
          }
        }
        this.filteredListOfSurvey = this.listOfSurvey;
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

  getCohort() {
    this.cohortService.findAllCohorts().subscribe(
      data => {
        this.cohorts = data;
      }
    );
  }

  getUser(surveyId: number) {
    this.usersClientService.findAll().subscribe(
      data => {
        this.users = data;
      }
    );
    this.surveyId = surveyId;
  }

  assignSurvey() {
    const userEmailList: string[] = [];
    for (const i in this.cohortCheckList) {
      if (this.cohortCheckList[i]) {
        this.usersClientService.findAllByCohortId(this.cohorts[i].cohortId).subscribe(data => {
          for (const user of data) {
            this.pushSurveyHistory(user.email, this.surveyId);
            userEmailList.push(user.email);
          }
        });
      }
    }
    // tslint:disable-next-line: forin
    for (const j in this.users) {
      const cur = this.users[j].userStatus.statusId;
      if ((this.userCheckList[j]) || (cur <= 3 && cur >= 1 && this.statusCheckList[0]) ||
      (cur <= 10 && cur >= 4 && this.statusCheckList[1]) ||
      (cur <= 17 && cur >= 11 && this.statusCheckList[2]) ||
      (cur <= 4 && cur >= 17 && this.statusCheckList[3])) {
        if (!userEmailList.includes(this.users[j].email)) {
          userEmailList.push(this.users[j].email);
        }
      }
    }
    console.log(userEmailList);
    for (const email of userEmailList) {
      this.pushSurveyHistory(email, this.surveyId);
    }
  }

  pushSurveyHistory(email, surveyId) {
    this.shownEmailList = [];
    const surHistory = new SurveyHistory(null, surveyId, email, new Date(), null);
    this.surveyHistoryService.save(surHistory).subscribe(
      data => {console.log(data);
               this.shownEmailList.push(data.userEmail);
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
    if (this.respPressed !== true) {
      console.log('The current surveyId is: ' + surveyId);
      this.surveyId = surveyId;
      this.respPressed = true;
    } else {
      this.respPressed = false;
    }
  }

  reload() {
    window.location.reload();
    this.shownEmailList = [];
  }
}


