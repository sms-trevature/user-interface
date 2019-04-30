import { Component, OnInit } from '@angular/core';
import { SurveyService } from 'src/app/sms-client/clients/survey.service';
import { Survey } from 'src/app/sms-client/dto/Survey';
import { SurveyQuestionService } from 'src/app/sms-client/clients/surveyquestion.service';
import { SurveyQuestion, Question } from 'src/app/sms-client/dto/surveyQuestion';
import { Answer } from 'src/app/sms-client/dto/Answer';
import { SurveyAnswerService } from 'src/app/sms-client/clients/survey-answer.service';
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

  surveyTitle: string;
  listOfSurvey: Survey[];
  curTemplate: SurveyQuestion[];
  curTempAnswers: Array<Answer[]>;

  surveyId: number;
  cohorts: Cohort[];
  users: User[];
  statusCheckList: boolean[] = [];
  cohortCheckList: boolean[] = [];
  userCheckList: boolean[] = [];

  qList: Question[];
  ArrayOfResponseAnswerList: Array<string[]>;
  arrOfCounts: Array<number[]>;
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
          if (temp.published) {
            this.listOfSurvey.push(temp);
          }
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
    window.location.reload();
  }

  pushSurveyHistory(email, surveyId) {
    const surHistory = new SurveyHistory(null, surveyId, email, new Date(), null);
    this.surveyHistoryService.save(surHistory).subscribe(
      data => {console.log(data); }
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
            this.ArrayOfResponseAnswerList = new Array (sqList.length);
            this.arrOfCounts = new Array (sqList.length);
            this.qList = new Array (sqList.length);
            const tempArrOfAnsList = new Array (sqList.length);
            for (const ans of ansList) {
              // tslint:disable-next-line: forin
              for (const i in sqList) {
                this.qList[sqList[i].questionOrder - 1] = sqList[i].questionId;
              // tslint:disable-next-line: max-line-length
                if (ans.questionId === sqList[i].questionId.questionId && (!this.ArrayOfResponseAnswerList[i] || !this.ArrayOfResponseAnswerList[i].includes(ans.answer))) {
                  if (!this.ArrayOfResponseAnswerList[sqList[i].questionOrder - 1]) {
                    this.ArrayOfResponseAnswerList[sqList[i].questionOrder - 1] = [];
                    tempArrOfAnsList[sqList[i].questionOrder - 1] = [];
                  }
                  this.ArrayOfResponseAnswerList[sqList[i].questionOrder - 1].push(ans.answer);
                  tempArrOfAnsList[sqList[i].questionOrder - 1].push(ans.id);
                  }
              }
            }
            for (const res of data) {
              for (const index in this.ArrayOfResponseAnswerList) {
                if (tempArrOfAnsList[index].includes(res.answerId.id)) {
                  if (!this.arrOfCounts[index]) { this.arrOfCounts[index] = new Array (tempArrOfAnsList[index].length); }
                  const tempIndex = this.ArrayOfResponseAnswerList[index].indexOf(res.answerId.answer);
                  this.arrOfCounts[index][tempIndex] = this.arrOfCounts[index][tempIndex] ? this.arrOfCounts[index][tempIndex] + 1 : 1;
                }
              }
            }
          }
        );
      }
    );
  }
  );
  }


// this was the original code, i feel that neither of these are optimal tho...
  /*
getGraph(surveyId: number, title: string) {
this.surveyTitle = title;
this.answerService.findAll().subscribe(
ansList => {
this.responseService.findBySurveyId(surveyId).subscribe(
data => {
this.sqService.getTemplate(surveyId).subscribe(
sqList => {
this.ArrayOfResponseAnswerList = new Array (sqList.length);
this.arrOfCounts = new Array (sqList.length);
this.qList = new Array (sqList.length);
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
data.sort((a, b) => a.answerId.id - b.answerId.id);
for (const res of data) {
if (res.answerId.questionId === sq.questionId.questionId) {
if (tempAnsList.length === 0 || !tempAnsList.includes(res.answerId.answer)) {
tempAnsList.push(res.answerId.answer);
count.push(1);
} else if (tempAnsList.includes(res.answerId.answer)) {
count[tempAnsList.indexOf(res.answerId.answer)]++;
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
  */
}
